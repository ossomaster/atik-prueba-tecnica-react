import { useState } from "react"
import { DndContext, DragEndEvent } from "@dnd-kit/core"
import { EmployeeList } from "./components/EmployeeList"
import { ScheduleGrid } from "./components/ScheduleGrid"
import { EMPLEADOS, EVENTO_COLORES, HORAS } from "./constants"
import { TEmpleado, TEvento } from "./types"

function App() {
	const [selectedEmployees, setSelectedEmployees] = useState<TEmpleado[]>([])
	const [events, setEvents] = useState<TEvento[]>([])

	const handleEmployeeSelect = (employee: TEmpleado) => {
		setSelectedEmployees((prev) =>
			prev.some((e) => e.id === employee.id) ? prev.filter((e) => e.id !== employee.id) : [...prev, employee]
		)
	}

	const handleAddEvent = (empleado_id: string, hora_inicio: string, hora_fin: string, nombre: string) => {
		const newEvent: TEvento = {
			id: crypto.randomUUID(),
			empleado: EMPLEADOS.find((e) => e.id === empleado_id)!,
			hora_inicio,
			hora_fin,
			nombre,
			color: EVENTO_COLORES[events.length % EVENTO_COLORES.length],
		}
		setEvents((prev) => [...prev, newEvent])
	}

	const handleDragEnd = (event: DragEndEvent) => {
		const { active, over } = event

		if (over && active.data.current) {
			const [newEmployeeId] = (over.id as string).split("-")
			const draggedEvent = active.data.current as TEvento

			if (draggedEvent.empleado.id !== newEmployeeId) {
				setEvents((prev) =>
					prev.map((e) =>
						e.id === draggedEvent.id ? { ...e, empleado: EMPLEADOS.find((e) => e.id === newEmployeeId)! } : e
					)
				)
			}
		}
	}

	return (
		<DndContext onDragEnd={handleDragEnd}>
			<div className="min-h-screen bg-gray-100 p-8">
				<div className="flex gap-8">
					<EmployeeList empleados={EMPLEADOS} empleadosSeleccionados={selectedEmployees} onSelect={handleEmployeeSelect} />
					<div className="flex-1">
						<ScheduleGrid
							selectedEmployees={selectedEmployees}
							events={events}
							timeSlots={HORAS}
							onAddEvent={handleAddEvent}
							onEventDrop={(eventId, newEmployeeId) => {
								setEvents((prev) =>
									prev.map((e) =>
										e.id === eventId ? { ...e, empleado: EMPLEADOS.find((e) => e.id === newEmployeeId)! } : e
									)
								)
							}}
						/>
					</div>
				</div>
			</div>
		</DndContext>
	)
}

export default App
