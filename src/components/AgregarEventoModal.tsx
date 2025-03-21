import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"
import { TEmpleado, TEvento, THora, TLicenciaPermiso } from "@/types"
import { useEffect, useState } from "react"

interface Props {
	isOpen: boolean
	onClose: () => void
	onAgregar: (evento: TEvento) => void
	horas: THora[]
	empleados: TEmpleado[]
	licenciasPermisos: TLicenciaPermiso[]
	defaultEmpleado?: TEmpleado | null
}

export function AgregarEventoModal({
	isOpen,
	onClose,
	onAgregar,
	horas,
	empleados,
	licenciasPermisos,
	defaultEmpleado = null,
}: Props) {
	const [empleadoId, setEmpleadoId] = useState(defaultEmpleado?.id || "")
	const [licenciaPermisoId, setLicenciaPermisoId] = useState("")
	const [nombre, setNombre] = useState("")
	const [horaInicio, setHoraInicio] = useState(horas[0]?.hora)
	const [horaFin, setHoraFin] = useState(horas[1]?.hora)

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		if (!empleadoId) {
			toast({
				title: "Error",
				description: "Debe seleccionar un empleado.",
				variant: "destructive",
			})
			return
		}
		if (horaFin <= horaInicio) {
			toast({
				title: "Error",
				description: "La hora de fin debe ser mayor a la hora de inicio.",
				variant: "destructive",
			})
			return
		}

		const nextEvento: TEvento = {
			id: crypto.randomUUID(),
			empleado: empleados.find((empleado) => empleado.id === empleadoId)!,
			hora_inicio: horaInicio,
			hora_fin: horaFin,
			nombre,
			licenciaPermiso: licenciasPermisos.find((licenciaPermiso) => licenciaPermiso.id === licenciaPermisoId)!,
		}

		onAgregar(nextEvento)

		setEmpleadoId("")
		setLicenciaPermisoId("")
		setNombre("")
		setHoraInicio(horas[0].hora)
		setHoraFin(horas[1].hora)

		onClose()
	}

	useEffect(() => {
		if (defaultEmpleado) {
			setEmpleadoId(defaultEmpleado.id)
		}
	}, [defaultEmpleado])

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent className="sm:max-w-sm">
				<DialogHeader>
					<DialogTitle>Agregar Evento</DialogTitle>
				</DialogHeader>
				<form onSubmit={handleSubmit} className="space-y-4">
					<div className="space-y-2">
						<Label htmlFor="employee">Empleado</Label>
						<Select value={empleadoId} onValueChange={setEmpleadoId} required>
							<SelectTrigger>
								<SelectValue placeholder="Seleccione un empleado" />
							</SelectTrigger>
							<SelectContent>
								{empleados.map((empleado) => (
									<SelectItem key={empleado.id} value={empleado.id}>
										{empleado.nombre} - {empleado.area}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>
					<div className="space-y-2">
						<Label htmlFor="licencia-permiso">Licencia o Permiso</Label>
						<ul>
							{licenciasPermisos.map((licenciaPermiso) => (
								<li
									key={licenciaPermiso.id}
									className={cn(
										"flex items-center gap-2 text-xs p-2 rounded hover:bg-gray-100 cursor-pointer border border-transparent",
										{
											"bg-primary/10 border-primary": licenciaPermiso.id === licenciaPermisoId,
										}
									)}
									onClick={() => setLicenciaPermisoId(licenciaPermiso.id)}
								>
									<span
										className="size-4 inline-block rounded-full"
										style={{ backgroundColor: licenciaPermiso.color + "30" }}
									></span>{" "}
									{licenciaPermiso.nombre}
								</li>
							))}
						</ul>
					</div>
					<div className="space-y-2">
						<Label htmlFor="name">Nombre del Evento</Label>
						<Input
							id="name"
							value={nombre}
							onChange={(e) => setNombre(e.target.value)}
							placeholder="Ingrese el título del evento"
							required
						/>
					</div>
					<div className="grid grid-cols-2 gap-4">
						<div className="space-y-2">
							<Label>Hora de Inicio</Label>
							<Select value={horaInicio} onValueChange={setHoraInicio}>
								<SelectTrigger>
									<SelectValue placeholder="Seleccione la hora de inicio" />
								</SelectTrigger>
								<SelectContent>
									{horas.map((slot) => (
										<SelectItem key={slot.hora} value={slot.hora}>
											{slot.etiqueta}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</div>
						<div className="space-y-2">
							<Label>Hora de Fin</Label>
							<Select value={horaFin} onValueChange={setHoraFin}>
								<SelectTrigger>
									<SelectValue placeholder="Seleccione la hora de fin" />
								</SelectTrigger>
								<SelectContent>
									{horas
										.filter((slot) => slot.hora > horaInicio)
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
