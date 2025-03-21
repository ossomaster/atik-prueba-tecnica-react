import { CSSProperties, useState } from "react"
import { useDraggable, useDroppable } from "@dnd-kit/core"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { InfoIcon, Plus } from "lucide-react"
import { AgregarEventoModal } from "./AgregarEventoModal"
import { TEmpleado, TEvento, THora, TLicenciaPermiso, TTurno, TEstado } from "@/types"
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table"

interface Props {
	empleadosSeleccionados: TEmpleado[]
	eventos: TEvento[]
	horas: THora[]
	licenciasPermisos: TLicenciaPermiso[]
	turnos: TTurno[]
	estados: TEstado[]
	onAgregarEvento: (evento: TEvento) => void
}

export function HorarioGrid({ empleadosSeleccionados, eventos, horas, licenciasPermisos, turnos, estados, onAgregarEvento }: Props) {
	const [modalOpen, setModalOpen] = useState(false)
	const [defaultEmployee, setDefaultEmployee] = useState<TEmpleado | null>(null)

	const handleContextMenu = (e: React.MouseEvent, employee: TEmpleado) => {
		e.preventDefault()
		setDefaultEmployee(employee)
		setModalOpen(true)
	}

	const handleAgregarEvento = (evento: TEvento) => {
		onAgregarEvento(evento)
	}

	return (
		<section>
			{/* Horario */}
			<div className="bg-white rounded-lg shadow-lg w-full">
				<div className="px-4 py-2 border-b text-end">
					<Button size="sm" onClick={() => setModalOpen(true)} disabled={empleadosSeleccionados.length === 0}>
						<Plus className="h-4 w-4 mr-2" />
						Agregar Evento
					</Button>
				</div>
				<div className="overflow-x-auto">
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead className="min-w-[150px] bg-gray-100 text-xs">Empleados</TableHead>
								{horas.map((horaItem) => (
									<TableHead key={horaItem.hora} className="min-w-[90px] text-center text-xs border">
										{horaItem.etiqueta}
									</TableHead>
								))}
							</TableRow>
						</TableHeader>
						<TableBody>
							{empleadosSeleccionados.length === 0 && (
								<TableRow>
									<TableCell colSpan={horas.length + 1} className="text-gray-500">
										<InfoIcon className="inline-block" /> Seleccione empleados para comenzar
									</TableCell>
								</TableRow>
							)}
							{empleadosSeleccionados.map((empleado) => (
								<TableRow key={empleado.id}>
									<TableCell className="bg-gray-100 text-xs">
										<p className="font-medium">{empleado.nombre}</p>
										<p className="text-gray-500">{empleado.area}</p>
									</TableCell>
									{horas.map((horaItem) => (
										<TableCell
											key={`${empleado.id}-${horaItem.hora}`}
											className="relative border"
											onContextMenu={(e) => handleContextMenu(e, empleado)}
										>
											<DroppableCell empleadoId={empleado.id} hora={horaItem.hora}>
												<div className="absolute inset-0 flex flex-col gap-1">
													{eventos
														.filter(
															(evento) =>
																evento.empleado.id === empleado.id &&
																evento.hora_inicio === horaItem.hora
														)
														.map((evento, eventIndex) => (
															<EventBar
																key={evento.id}
																evento={evento}
																horas={horas}
																index={eventIndex}
																totalEventos={
																	eventos.filter(
																		(eventoTotal) =>
																			eventoTotal.empleado.id === empleado.id &&
																			eventoTotal.hora_inicio === horaItem.hora
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
			</div>
			{/* Turnos */}
			<div className="p-4 bg-white rounded-lg shadow-lg mt-4 flex items-center gap-2">
				<h3 className="text-sm">Turnos de trabajo:</h3>
				<ul className="flex gap-2">
					{turnos.map((turno) => (
						<li key={turno.id}>
							<span
								className="text-xs font-medium px-2 py-1 rounded text-white"
								style={{
									backgroundColor: turno.color,
								}}
							>
								{turno.nombre}
							</span>
						</li>
					))}
				</ul>
			</div>
			{/* Licencias y permisos */}
			<div className="p-4 bg-white rounded-lg shadow-lg mt-4 flex items-center gap-2">
				<h3 className="text-sm">Licencias y permisos:</h3>
				<ul className="flex gap-2">
					{licenciasPermisos.map((licenciaPermiso) => (
						<li key={licenciaPermiso.id}>
							<span
								className="text-xs font-medium px-2 py-1 rounded"
								style={{
									color: licenciaPermiso.color,
									backgroundColor: licenciaPermiso.color + "30",
								}}
							>
								{licenciaPermiso.nombre}
							</span>
						</li>
					))}
				</ul>
			</div>
			{/* Estados */}
			<div className="p-4 bg-white rounded-lg shadow-lg mt-4 flex items-center gap-2">
				<h3 className="text-sm">Estados de marcajes:</h3>
				<ul className="flex gap-4">
					{estados.map((estado) => (
						<li key={estado.id} className="flex items-center gap-1 text-xs">
							<span
								className="size-4 rounded-full inline-block"
								style={{
									backgroundColor: estado.color,
								}}
							></span>
							{estado.nombre}
						</li>
					))}
				</ul>
			</div>
			<AgregarEventoModal
				isOpen={modalOpen}
				onClose={() => {
					setModalOpen(false)
					setDefaultEmployee(null)
				}}
				onAgregar={handleAgregarEvento}
				horas={horas}
				empleados={empleadosSeleccionados}
				licenciasPermisos={licenciasPermisos}
				defaultEmpleado={defaultEmployee}
			/>
		</section>
	)
}

function DroppableCell({ empleadoId, hora, children }: { empleadoId: string; hora: string; children: React.ReactNode }) {
	const { setNodeRef } = useDroppable({
		id: `${empleadoId}-${hora}`,
		data: {
			empleadoId,
			hora,
		},
	})

	return (
		<div ref={setNodeRef} className="absolute inset-0">
			{children}
		</div>
	)
}

function EventBar({ evento, horas, index, totalEventos }: { evento: TEvento; horas: THora[]; index: number; totalEventos: number }) {
	const startIndex = horas.findIndex((slot) => slot.hora === evento.hora_inicio)
	const endIndex = horas.findIndex((slot) => slot.hora === evento.hora_fin)
	const width = `${(endIndex - startIndex) * 100}%`
	const height = `${100 / totalEventos}%`
	const top = `${index * (100 / totalEventos)}%`

	const { attributes, listeners, setNodeRef, transform } = useDraggable({
		id: evento.id,
		data: evento,
	})

	const style: CSSProperties = transform
		? {
				transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
				width,
				height,
				top,
				backgroundColor: evento.licenciaPermiso.color + "40",
		  }
		: {
				width,
				height,
				top,
				backgroundColor: evento.licenciaPermiso.color + "30",
		  }

	return (
		<div
			ref={setNodeRef}
			style={style}
			className={cn("absolute left-0 cursor-move rounded shadow-md", "opacity-90 hover:opacity-100 transition-opacity")}
			{...listeners}
			{...attributes}
		>
			<div
				className="p-2 text-xs truncate"
				style={{
					color: evento.licenciaPermiso.color,
				}}
			>
				<h3 className="inline-block font-medium truncate">{evento.nombre}</h3>
				<p className="inline-block truncate ml-2">
					{evento.hora_inicio} - {evento.hora_fin}
				</p>
			</div>
		</div>
	)
}
