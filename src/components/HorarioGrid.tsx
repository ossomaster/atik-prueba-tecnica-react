import { useState } from "react"
import { useDraggable, useDroppable } from "@dnd-kit/core"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { AddEventModal } from "./AddEventModal"
import { TEmpleado, TEvento, THora } from "@/types"
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table"

interface Props {
	selectedEmployees: TEmpleado[]
	events: TEvento[]
	timeSlots: THora[]
	onAddEvent: (employeeId: string, startTime: string, endTime: string, title: string) => void
	onEventDrop: (eventId: string, newEmployeeId: string) => void
}

export function HorarioGrid({ selectedEmployees, events, timeSlots, onAddEvent }: Props) {
	const [modalOpen, setModalOpen] = useState(false)
	const [defaultEmployee, setDefaultEmployee] = useState<TEmpleado | null>(null)

	const handleContextMenu = (e: React.MouseEvent, employee: TEmpleado) => {
		e.preventDefault()
		setDefaultEmployee(employee)
		setModalOpen(true)
	}

	const handleAddEvent = (employeeId: string, title: string, startTime: string, endTime: string) => {
		onAddEvent(employeeId, startTime, endTime, title)
	}

	return (
		<div className="bg-white rounded-lg shadow-lg w-full">
			<div className="overflow-x-auto">
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead className="min-w-[150px] bg-gray-100 text-xs">Empleados</TableHead>
							{timeSlots.map((slot) => (
								<TableHead key={slot.hora} className="min-w-[90px] text-center text-xs">
									{slot.etiqueta}
								</TableHead>
							))}
						</TableRow>
					</TableHeader>
					<TableBody>
						{selectedEmployees.map((employee) => (
							<TableRow key={employee.id}>
								<TableCell className="bg-gray-100 text-xs">
									<p className="font-medium">{employee.nombre}</p>
									<p className="text-gray-500">{employee.area}</p>
								</TableCell>
								{timeSlots.map((slot) => (
									<TableCell
										key={`${employee.id}-${slot.hora}`}
										className="relative"
										onContextMenu={(e) => handleContextMenu(e, employee)}
									>
										<DroppableCell employeeId={employee.id} timeSlot={slot.hora}>
											<div className="absolute inset-0 flex flex-col gap-1">
												{events
													.filter(
														(event) => event.empleado.id === employee.id && event.hora_inicio === slot.hora
													)
													.map((event, eventIndex) => (
														<EventBar
															key={event.id}
															event={event}
															timeSlots={timeSlots}
															index={eventIndex}
															totalEvents={
																events.filter(
																	(e) => e.empleado.id === employee.id && e.hora_inicio === slot.hora
																).length
															}
														/>
													))}
											</div>
										</DroppableCell>
									</TableCell>
								))}
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>
			<div className="p-4 border-b text-end">
				<Button size="sm" onClick={() => setModalOpen(true)} disabled={selectedEmployees.length === 0}>
					<Plus className="h-4 w-4 mr-2" />
					Agregar Evento
				</Button>
			</div>
			<AddEventModal
				isOpen={modalOpen}
				onClose={() => {
					setModalOpen(false)
					setDefaultEmployee(null)
				}}
				onAdd={handleAddEvent}
				timeSlots={timeSlots}
				employees={selectedEmployees}
				defaultEmployee={defaultEmployee}
			/>
		</div>
	)
}

function DroppableCell({ employeeId, timeSlot, children }: { employeeId: string; timeSlot: string; children: React.ReactNode }) {
	const { setNodeRef } = useDroppable({
		id: `${employeeId}-${timeSlot}`,
		data: {
			employeeId,
			timeSlot,
		},
	})

	return (
		<div ref={setNodeRef} className="absolute inset-0">
			{children}
		</div>
	)
}

function EventBar({
	event,
	timeSlots,
	index,
	totalEvents,
}: {
	event: TEvento
	timeSlots: THora[]
	index: number
	totalEvents: number
}) {
	const startIndex = timeSlots.findIndex((slot) => slot.hora === event.hora_inicio)
	const endIndex = timeSlots.findIndex((slot) => slot.hora === event.hora_fin)
	const width = `${(endIndex - startIndex) * 100}%`
	const height = `${100 / totalEvents}%`
	const top = `${index * (100 / totalEvents)}%`

	const { attributes, listeners, setNodeRef, transform } = useDraggable({
		id: event.id,
		data: event,
	})

	const style = transform
		? {
				transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
				width,
				height,
				top,
				backgroundColor: event.color,
		  }
		: {
				width,
				height,
				top,
				backgroundColor: event.color,
		  }

	return (
		<div
			ref={setNodeRef}
			style={style}
			className={cn("absolute left-0 cursor-move rounded shadow-md", "opacity-90 hover:opacity-100 transition-opacity")}
			{...listeners}
			{...attributes}
		>
			<div className="p-2 text-xs text-white truncate">
				<div className="font-medium truncate">{event.nombre}</div>
				<div className="truncate">
					{event.hora_inicio} - {event.hora_fin}
				</div>
			</div>
		</div>
	)
}
