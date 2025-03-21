import { HORAS } from "./constants"

type TCalcularNuevoRangoHorasParams = {
	horaInicio: string
	horaFin: string
	nuevaHoraInicio: string
}
export const calcularNuevoRangoHoras = ({ horaInicio, horaFin, nuevaHoraInicio }: TCalcularNuevoRangoHorasParams) => {
	const limitHoraInicio = parseInt(HORAS.at(-1)!.hora.split(":")[0])
	const draggedhoraInicio = parseInt(horaInicio.split(":")[0])
	const draggedhoraFin = parseInt(horaFin.split(":")[0])
	const range = draggedhoraFin - draggedhoraInicio
	const nextIntHoraInicio = parseInt(nuevaHoraInicio.split(":")[0])
	let nextIntHoraFin = nextIntHoraInicio + range

	if (nextIntHoraFin > limitHoraInicio) {
		nextIntHoraFin = limitHoraInicio
	}

	const nextHoraInicio = `${String(nextIntHoraInicio).padStart(2, "0")}:00`
	const nextHoraFin = `${String(nextIntHoraFin).padStart(2, "0")}:00`

	return { nextHoraInicio, nextHoraFin }
}
