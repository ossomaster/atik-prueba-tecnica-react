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
	empleado: TEmpleado
	licenciaPermiso: TLicenciaPermiso
}

export type THora = {
	hora: string
	etiqueta: string
}

export type TLicenciaPermiso = {
	id: string
	nombre: string
	color: string
}
