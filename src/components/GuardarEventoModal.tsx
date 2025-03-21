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
	onEditar: (evento: TEvento) => void
	horas: THora[]
	empleados: TEmpleado[]
	licenciasPermisos: TLicenciaPermiso[]
	defaultEmpleado?: TEmpleado | null
	eventoAEditar?: TEvento | null
}

export function GuardarEventoModal({
	isOpen,
	onClose,
	onAgregar,
	onEditar,
	horas,
	empleados,
	licenciasPermisos,
	defaultEmpleado = null,
	eventoAEditar = null,
}: Props) {
	const [empleadoId, setEmpleadoId] = useState(eventoAEditar?.empleado.id || defaultEmpleado?.id || "")
	const [licenciaPermisoId, setLicenciaPermisoId] = useState(eventoAEditar?.licenciaPermiso?.id || "")
	const [nombre, setNombre] = useState(eventoAEditar?.nombre || "")
	const [horaInicio, setHoraInicio] = useState(eventoAEditar?.hora_inicio || horas[0]?.hora)
	const [horaFin, setHoraFin] = useState(eventoAEditar?.hora_fin || horas[1]?.hora)

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
			id: eventoAEditar?.id || crypto.randomUUID(),
			empleado: empleados.find((empleado) => empleado.id === empleadoId)!,
			hora_inicio: horaInicio,
			hora_fin: horaFin,
			nombre,
			licenciaPermiso: licenciasPermisos.find((licenciaPermiso) => licenciaPermiso.id === licenciaPermisoId)!,
		}

		if (eventoAEditar) {
			onEditar(nextEvento)
		} else {
			onAgregar(nextEvento)
		}

		if (!eventoAEditar) {
			setEmpleadoId("")
			setLicenciaPermisoId("")
			setNombre("")
			setHoraInicio(horas[0].hora)
			setHoraFin(horas[1].hora)
		}

		onClose()
	}

	useEffect(() => {
		if (eventoAEditar) {
			setEmpleadoId(eventoAEditar.empleado.id)
			setLicenciaPermisoId(eventoAEditar.licenciaPermiso?.id || "")
			setNombre(eventoAEditar.nombre)
			setHoraInicio(eventoAEditar.hora_inicio)
			setHoraFin(eventoAEditar.hora_fin)
		} else if (defaultEmpleado) {
			setEmpleadoId(defaultEmpleado.id)
		}
	}, [eventoAEditar, defaultEmpleado])

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent className="sm:max-w-sm">
				<DialogHeader>
					<DialogTitle>{eventoAEditar ? "Editar Evento" : "Agregar Evento"}</DialogTitle>
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
						<Button type="submit">{eventoAEditar ? "Guardar Cambios" : "Agregar Evento"}</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	)
}
