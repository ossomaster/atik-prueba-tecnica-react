import { useEffect, useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { TEmpleado, THora } from "@/types"
import { toast } from "@/hooks/use-toast"

interface Props {
	isOpen: boolean
	onClose: () => void
	onAdd: (employeeId: string, title: string, startTime: string, endTime: string) => void
	timeSlots: THora[]
	employees: TEmpleado[]
	defaultEmployee?: TEmpleado | null
}

export function AgregarEventoModal({ isOpen, onClose, onAdd, timeSlots, employees, defaultEmployee = null }: Props) {
	const [title, setTitle] = useState("")
	const [startTime, setStartTime] = useState(timeSlots[0]?.hora)
	const [endTime, setEndTime] = useState(timeSlots[1]?.hora)
	const [selectedEmployeeId, setSelectedEmployeeId] = useState(defaultEmployee?.id || "")

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		if (!selectedEmployeeId) {
			toast({
				title: "Error",
				description: "Debe seleccionar un empleado.",
				variant: "destructive",
			})
			return
		}
		if (endTime <= startTime) {
			toast({
				title: "Error",
				description: "La hora de fin debe ser mayor a la hora de inicio.",
				variant: "destructive",
			})
			return
		}
		onAdd(selectedEmployeeId, title, startTime, endTime)
		setTitle("")
		setSelectedEmployeeId("")
		onClose()
	}

	useEffect(() => {
		if (defaultEmployee) {
			setSelectedEmployeeId(defaultEmployee.id)
		}
	}, [defaultEmployee])

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent className="sm:max-w-sm">
				<DialogHeader>
					<DialogTitle>Agregar Evento</DialogTitle>
				</DialogHeader>
				<form onSubmit={handleSubmit} className="space-y-4">
					<div className="space-y-2">
						<Label htmlFor="employee">Empleado</Label>
						<Select value={selectedEmployeeId} onValueChange={setSelectedEmployeeId} required>
							<SelectTrigger>
								<SelectValue placeholder="Seleccione un empleado" />
							</SelectTrigger>
							<SelectContent>
								{employees.map((employee) => (
									<SelectItem key={employee.id} value={employee.id}>
										{employee.nombre} - {employee.area}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>
					<div className="space-y-2">
						<Label htmlFor="title">Título del Evento</Label>
						<Input
							id="title"
							value={title}
							onChange={(e) => setTitle(e.target.value)}
							placeholder="Ingrese el título del evento"
							required
						/>
					</div>
					<div className="grid grid-cols-2 gap-4">
						<div className="space-y-2">
							<Label>Hora de Inicio</Label>
							<Select value={startTime} onValueChange={setStartTime}>
								<SelectTrigger>
									<SelectValue placeholder="Seleccione la hora de inicio" />
								</SelectTrigger>
								<SelectContent>
									{timeSlots.map((slot) => (
										<SelectItem key={slot.hora} value={slot.hora}>
											{slot.etiqueta}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</div>
						<div className="space-y-2">
							<Label>Hora de Fin</Label>
							<Select value={endTime} onValueChange={setEndTime}>
								<SelectTrigger>
									<SelectValue placeholder="Seleccione la hora de fin" />
								</SelectTrigger>
								<SelectContent>
									{timeSlots
										.filter((slot) => slot.hora > startTime)
										.map((slot) => (
											<SelectItem key={slot.hora} value={slot.hora}>
												{slot.etiqueta}
											</SelectItem>
										))}
								</SelectContent>
							</Select>
						</div>
					</div>
					<DialogFooter>
						<Button type="button" variant="outline" onClick={onClose}>
							Cancelar
						</Button>
						<Button type="submit">Agregar Evento</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	)
}
