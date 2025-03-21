export type TEmpleado = {
	id: string
	nombre: string
	area: string
	cargo: string
}

export type TEvento = {
	id: string
	hora_inicio: string
	hora_fin: string
	nombre: string
	color: string
	empleado: TEmpleado
}

export type THora = {
	hora: string
	etiqueta: string
}
