import React, { useMemo } from "react"
import { TableCell } from "../ui/table"
import { TEmpleado, TEvento, THora } from "@/types"
import DroppableCell from "./DroppableCell"
import EventoBar from "./EventoBar"

type Props = {
	empleado: TEmpleado
	horaItem: THora
	eventos: TEvento[]
	horas: THora[]
	handleContextMenu: (e: React.MouseEvent, empleado: TEmpleado) => void
	handleEditarEvento: (evento: TEvento) => void
	handleEliminarEvento: (evento: TEvento) => void
}

const CELL_HEIGHT = 50

const EmpleadoHoraCell = ({
	empleado,
	horaItem,
	eventos,
	horas,
	handleContextMenu,
	handleEditarEvento,
	handleEliminarEvento,
}: Props) => {
	const eventosFiltrados = useMemo(() => {
		return eventos.filter((evento) => evento.empleado.id === empleado.id && evento.hora_inicio === horaItem.hora)
	}, [eventos, empleado.id, horaItem.hora])

	return (
		<TableCell
			key={`${empleado.id}-${horaItem.hora}`}
			className="relative border"
			onContextMenu={(e) => handleContextMenu(e, empleado)}
			style={{
				height: eventosFiltrados.length * CELL_HEIGHT,
			}}
		>
			<DroppableCell empleadoId={empleado.id} hora={horaItem.hora}>
				<div className="absolute inset-0 flex flex-col gap-2">
					{eventosFiltrados.map((evento, eventIndex) => (
						<EventoBar
							key={evento.id}
							evento={evento}
							horas={horas}
							index={eventIndex}
							totalEventos={
								eventos.filter(
									(eventoTotal) =>
										eventoTotal.empleado.id === empleado.id && eventoTotal.hora_inicio === horaItem.hora
								).length
							}
							onEditar={handleEditarEvento}
							onEliminar={handleEliminarEvento}
						/>
					))}
				</div>
			</DroppableCell>
		</TableCell>
	)
}

export default EmpleadoHoraCell
