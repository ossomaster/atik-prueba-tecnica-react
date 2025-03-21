import { useState } from "react"
import { DndContext, DragEndEvent } from "@dnd-kit/core"
import { Employee, ScheduleEvent, timeSlots } from "./types"
import { EmployeeList } from "./components/EmployeeList"
import { ScheduleGrid } from "./components/ScheduleGrid"

// Sample data
const mockEmployees: Employee[] = [
	{ id: "1", name: "Ana María Santos", area: "Front Desk", position: "Receptionist" },
	{ id: "2", name: "Carlos Rodríguez", area: "Kitchen", position: "Chef" },
	{ id: "3", name: "Diana Martínez", area: "Housekeeping", position: "Supervisor" },
	{ id: "4", name: "Eduardo López", area: "Maintenance", position: "Technician" },
	{ id: "5", name: "Fernando García", area: "Security", position: "Guard" },
]

const eventColors = [
	"#4F46E5", // Indigo
	"#7C3AED", // Purple
	"#EC4899", // Pink
	"#F59E0B", // Amber
	"#10B981", // Emerald
]

function App() {
	const [selectedEmployees, setSelectedEmployees] = useState<Employee[]>([])
	const [events, setEvents] = useState<ScheduleEvent[]>([])

	const handleEmployeeSelect = (employee: Employee) => {
		setSelectedEmployees((prev) =>
			prev.some((e) => e.id === employee.id) ? prev.filter((e) => e.id !== employee.id) : [...prev, employee]
		)
	}

	const handleAddEvent = (employeeId: string, startTime: string, endTime: string, title: string) => {
		const newEvent: ScheduleEvent = {
			id: crypto.randomUUID(),
			employeeId,
			startTime,
			endTime,
			title,
			color: eventColors[events.length % eventColors.length],
		}
		setEvents((prev) => [...prev, newEvent])
	}

	const handleDragEnd = (event: DragEndEvent) => {
		const { active, over } = event

		if (over && active.data.current) {
			const [newEmployeeId] = (over.id as string).split("-")
			const draggedEvent = active.data.current as ScheduleEvent

			if (draggedEvent.employeeId !== newEmployeeId) {
				setEvents((prev) => prev.map((e) => (e.id === draggedEvent.id ? { ...e, employeeId: newEmployeeId } : e)))
			}
		}
	}

	return (
		<DndContext onDragEnd={handleDragEnd}>
			<div className="min-h-screen bg-gray-100 p-8">
				<div className="flex gap-8">
					<EmployeeList
						employees={mockEmployees}
						selectedEmployees={selectedEmployees}
						onEmployeeSelect={handleEmployeeSelect}
					/>
					<div className="flex-1">
						<ScheduleGrid
							selectedEmployees={selectedEmployees}
							events={events}
							timeSlots={timeSlots}
							onAddEvent={handleAddEvent}
							onEventDrop={(eventId, newEmployeeId) => {
								setEvents((prev) => prev.map((e) => (e.id === eventId ? { ...e, employeeId: newEmployeeId } : e)))
							}}
						/>
					</div>
				</div>
			</div>
		</DndContext>
	)
}

export default App
