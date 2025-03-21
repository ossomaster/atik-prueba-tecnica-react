import { DndContext, DragEndEvent } from "@dnd-kit/core"
import { useState } from "react"
import Header from "./components/Header"
import { Horario } from "./components/Horario/Horario"
import { ListaEmpleados } from "./components/ListaEmpleados"
import { EMPLEADOS, ESTADOS, HORAS, LICENCIAS_PERMISOS, TURNOS } from "./constants"
import { TEmpleado, TEvento } from "./types"
import { calcularNuevoRangoHoras } from "./helpers"
import { toast } from "./hooks/use-toast"

function App() {
	const [empleadosSeleccionados, setEmpleadosSeleccionados] = useState<TEmpleado[]>([])
	const [eventos, setEventos] = useState<TEvento[]>([])

	const handleSeleccionarEmpleado = (employee: TEmpleado) => {
		setEmpleadosSeleccionados((prev) =>
			prev.some((prevEmpleado) => prevEmpleado.id === employee.id)
				? prev.filter((e) => e.id !== employee.id)
				: [...prev, employee]
		)
	}

	const handleAgregarEvento = (evento: TEvento) => {
		setEventos((prev) => [...prev, evento])
	}

	const handleDragEnd = (event: DragEndEvent) => {
		const { active, over } = event

		if (over && active.data.current) {
			const [nextEmpleadoId, nextHora] = (over.id as string).split("-")
			const draggedEvent = active.data.current as TEvento

			if (draggedEvent.empleado.id !== nextEmpleadoId) {
				setEventos((prev) =>
					prev.map((prevEvento) =>
						prevEvento.id === draggedEvent.id
							? { ...prevEvento, empleado: EMPLEADOS.find((empleado) => empleado.id === nextEmpleadoId)! }
							: prevEvento
					)
				)
			} else {
				const { nextHoraInicio, nextHoraFin } = calcularNuevoRangoHoras({
					horaInicio: draggedEvent.hora_inicio,
					horaFin: draggedEvent.hora_fin,
					nuevaHoraInicio: nextHora,
				})

				if (nextHoraInicio == nextHoraFin) {
					return toast({
						title: "Error",
						description: "No puedes mover el evento a la misma hora",
						variant: "destructive",
					})
				}

				setEventos((prev) =>
					prev.map((prevEvento) =>
						prevEvento.id === draggedEvent.id
							? { ...prevEvento, hora_inicio: nextHoraInicio, hora_fin: nextHoraFin }
							: prevEvento
					)
				)
			}
		}
	}

	return (
		<div className="h-screen container mx-auto p-4">
			<div className="grid grid-rows-[auto_1fr] grid-cols-1 gap-8 h-full">
				<Header />
				<main className="grid grid-cols-[300px_1fr] grid-rows-1 gap-8 min-h-0">
					<ListaEmpleados
						empleados={EMPLEADOS}
						empleadosSeleccionados={empleadosSeleccionados}
						onSelect={handleSeleccionarEmpleado}
					/>
					<div className="min-w-0">
						<DndContext onDragEnd={handleDragEnd}>
							<Horario
								empleadosSeleccionados={empleadosSeleccionados}
								eventos={eventos}
								horas={HORAS}
								licenciasPermisos={LICENCIAS_PERMISOS}
								turnos={TURNOS}
								estados={ESTADOS}
								onAgregarEvento={handleAgregarEvento}
							/>
						</DndContext>
					</div>
				</main>
			</div>
		</div>
	)
}

export default App
