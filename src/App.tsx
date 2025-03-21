import { useState } from "react"
import { DndContext, DragEndEvent } from "@dnd-kit/core"
import { ListaEmpleados } from "./components/ListaEmpleados"
import { HorarioGrid } from "./components/HorarioGrid"
import { EMPLEADOS, HORAS, LICENCIAS_PERMISOS } from "./constants"
import { TEmpleado, TEvento } from "./types"

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
			const [newEmployeeId] = (over.id as string).split("-")
			const draggedEvent = active.data.current as TEvento

			if (draggedEvent.empleado.id !== newEmployeeId) {
				setEventos((prev) =>
					prev.map((prevEvento) =>
						prevEvento.id === draggedEvent.id
							? { ...prevEvento, empleado: EMPLEADOS.find((e) => e.id === newEmployeeId)! }
							: prevEvento
					)
				)
			}
		}
	}

	return (
		<div className="h-screen container mx-auto p-4">
			<div className="grid grid-cols-[300px_1fr] grid-rows-1 gap-8 h-full">
				<ListaEmpleados
					empleados={EMPLEADOS}
					empleadosSeleccionados={empleadosSeleccionados}
					onSelect={handleSeleccionarEmpleado}
				/>
				<div className="min-w-0">
					<DndContext onDragEnd={handleDragEnd}>
						<HorarioGrid
							empleadosSeleccionados={empleadosSeleccionados}
							eventos={eventos}
							horas={HORAS}
							licenciasPermisos={LICENCIAS_PERMISOS}
							onAgregarEvento={handleAgregarEvento}
						/>
					</DndContext>
				</div>
			</div>
		</div>
	)
}

export default App
