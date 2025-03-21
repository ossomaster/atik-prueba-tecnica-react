import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { TEmpleado, TEstado, TEvento, THora, TLicenciaPermiso, TTurno } from "@/types"
import { InfoIcon, Plus } from "lucide-react"
import { useState } from "react"
import { GuardarEventoModal } from "../GuardarEventoModal"
import Buscador from "./Buscador"
import EmpleadoHoraCell from "./EmpleadoHoraCell"
import ListaEstados from "./ListaEstados"
import ListaLicenciasPermisos from "./ListaLicenciasPermisos"
import ListaTurnos from "./ListaTurnos"

interface Props {
	empleadosSeleccionados: TEmpleado[]
	eventos: TEvento[]
	horas: THora[]
	licenciasPermisos: TLicenciaPermiso[]
	turnos: TTurno[]
	estados: TEstado[]
	onAgregarEvento: (evento: TEvento) => void
	onEditarEvento: (evento: TEvento) => void
	onEliminarEvento: (evento: TEvento) => void
}

export function Horario({
	empleadosSeleccionados,
	eventos,
	horas,
	licenciasPermisos,
	turnos,
	estados,
	onAgregarEvento,
	onEditarEvento,
	onEliminarEvento,
}: Props) {
	const [showGuardarEventoModal, setShowGuardarEventoModal] = useState(false)
	const [defaultEmpleado, setDefaultEmpleado] = useState<TEmpleado | null>(null)
	const [eventoAEditar, setEventoAEditar] = useState<TEvento | null>(null)

	const handleContextMenu = (e: React.MouseEvent, employee: TEmpleado) => {
		e.preventDefault()
		setDefaultEmpleado(employee)
		setEventoAEditar(null)
		setShowGuardarEventoModal(true)
	}

	const handleEditarEvento = (evento: TEvento) => {
		setEventoAEditar(evento)
		setShowGuardarEventoModal(true)
	}

	const handleEliminarEvento = (evento: TEvento) => {
		onEliminarEvento(evento)
	}

	return (
		<section>
			{/* Buscador */}
			<Buscador />
			{/* Horario */}
			<div className="bg-white rounded-lg shadow-lg w-full mt-4">
				<div className="px-4 py-2 border-b text-end">
					<Button size="sm" onClick={() => setShowGuardarEventoModal(true)} disabled={empleadosSeleccionados.length === 0}>
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
										<EmpleadoHoraCell
											key={`${empleado.id}-${horaItem.hora}`}
											empleado={empleado}
											horaItem={horaItem}
											eventos={eventos}
											horas={horas}
											handleContextMenu={handleContextMenu}
											handleEditarEvento={handleEditarEvento}
											handleEliminarEvento={handleEliminarEvento}
										/>
									))}
								</TableRow>
							))}
						</TableBody>
					</Table>
				</div>
			</div>
			{/* Turnos */}
			<ListaTurnos turnos={turnos} />
			{/* Licencias y permisos */}
			<ListaLicenciasPermisos licenciasPermisos={licenciasPermisos} />
			{/* Estados */}
			<ListaEstados estados={estados} />
			{showGuardarEventoModal && (
				<GuardarEventoModal
					isOpen={showGuardarEventoModal}
					onClose={() => {
						setShowGuardarEventoModal(false)
						setDefaultEmpleado(null)
						setEventoAEditar(null)
					}}
					onAgregar={onAgregarEvento}
					onEditar={onEditarEvento}
					horas={horas}
					empleados={empleadosSeleccionados}
					licenciasPermisos={licenciasPermisos}
					defaultEmpleado={defaultEmpleado}
					eventoAEditar={eventoAEditar}
				/>
			)}
		</section>
	)
}
