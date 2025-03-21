import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Employee, TimeSlot } from "@/types"

interface AddEventModalProps {
	isOpen: boolean
	onClose: () => void
	onAdd: (employeeId: string, title: string, startTime: string, endTime: string) => void
	timeSlots: TimeSlot[]
	employees: Employee[]
}

export function AddEventModal({ isOpen, onClose, onAdd, timeSlots, employees }: AddEventModalProps) {
	const [title, setTitle] = useState("")
	const [startTime, setStartTime] = useState(timeSlots[0]?.time)
	const [endTime, setEndTime] = useState(timeSlots[1]?.time)
	const [selectedEmployeeId, setSelectedEmployeeId] = useState("")

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		if (!selectedEmployeeId) return
		onAdd(selectedEmployeeId, title, startTime, endTime)
		setTitle("")
		setSelectedEmployeeId("")
		onClose()
	}

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Add New Event</DialogTitle>
				</DialogHeader>
				<form onSubmit={handleSubmit} className="space-y-4">
					<div className="space-y-2">
						<Label htmlFor="employee">Employee</Label>
						<Select value={selectedEmployeeId} onValueChange={setSelectedEmployeeId} required>
							<SelectTrigger>
								<SelectValue placeholder="Select employee" />
							</SelectTrigger>
							<SelectContent>
								{employees.map((employee) => (
									<SelectItem key={employee.id} value={employee.id}>
										{employee.name} - {employee.area}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>
					<div className="space-y-2">
						<Label htmlFor="title">Event Title</Label>
						<Input
							id="title"
							value={title}
							onChange={(e) => setTitle(e.target.value)}
							placeholder="Enter event title"
							required
						/>
					</div>
					<div className="grid grid-cols-2 gap-4">
						<div className="space-y-2">
							<Label>Start Time</Label>
							<Select value={startTime} onValueChange={setStartTime}>
								<SelectTrigger>
									<SelectValue placeholder="Select start time" />
								</SelectTrigger>
								<SelectContent>
									{timeSlots.map((slot) => (
										<SelectItem key={slot.time} value={slot.time}>
											{slot.label}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</div>
						<div className="space-y-2">
							<Label>End Time</Label>
							<Select value={endTime} onValueChange={setEndTime}>
								<SelectTrigger>
									<SelectValue placeholder="Select end time" />
								</SelectTrigger>
								<SelectContent>
									{timeSlots
										.filter((slot) => slot.time > startTime)
										.map((slot) => (
											<SelectItem key={slot.time} value={slot.time}>
												{slot.label}
											</SelectItem>
										))}
								</SelectContent>
							</Select>
						</div>
					</div>
					<DialogFooter>
						<Button type="button" variant="outline" onClick={onClose}>
							Cancel
						</Button>
						<Button type="submit" disabled={!selectedEmployeeId}>
							Add Event
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	)
}
