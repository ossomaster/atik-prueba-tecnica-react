import { TEmpleado, THora, TLicenciaPermiso } from "./types"

export const EMPLEADOS: TEmpleado[] = [
	{ id: "1", nombre: "Ana María Santos", area: "Recepción", cargo: "Recepcionista" },
	{ id: "2", nombre: "Carlos Rodríguez", area: "Cocina", cargo: "Chef" },
	{ id: "3", nombre: "Diana Martínez", area: "Limpieza", cargo: "Supervisora" },
	{ id: "4", nombre: "Eduardo López", area: "Mantenimiento", cargo: "Técnico" },
	{ id: "5", nombre: "Fernando García", area: "Seguridad", cargo: "Guardia" },
	{ id: "6", nombre: "Gabriela Torres", area: "Administración", cargo: "Gerente" },
	{ id: "7", nombre: "Héctor Ramírez", area: "Cocina", cargo: "Ayudante de cocina" },
	{ id: "8", nombre: "Isabel Fernández", area: "Recepción", cargo: "Asistente" },
	{ id: "9", nombre: "Jorge Pérez", area: "Mantenimiento", cargo: "Electricista" },
	{ id: "10", nombre: "Karen Morales", area: "Limpieza", cargo: "Auxiliar" },
	{ id: "11", nombre: "Luis Gómez", area: "Seguridad", cargo: "Supervisor" },
	{ id: "12", nombre: "María Hernández", area: "Administración", cargo: "Contadora" },
]

export const LICENCIAS_PERMISOS: TLicenciaPermiso[] = [
	{ id: "1", nombre: "DESCANSO", color: "#EF4444" },
	{ id: "2", nombre: "LICENCIA POR MATERNIDAD", color: "#F59E0B" },
	{ id: "3", nombre: "LICENCIA POR TRAMITE ESPECIAL", color: "#3B82F6" },
	{ id: "4", nombre: "ESTUDIOS", color: "#8B5CF6" },
	{ id: "5", nombre: "TRÁMITE LEGAL", color: "#333333" },
	{ id: "6", nombre: "NACIMIENTO DE UN HIJO", color: "#EF4444" },
]

export const HORAS: THora[] = Array.from({ length: 16 }, (_, i) => {
	const hora = i + 5 // Comenzando desde las 5 AM
	return {
		hora: `${hora.toString().padStart(2, "0")}:00`,
		etiqueta: `${hora}:00${hora < 12 ? "am" : "pm"}`,
	}
})
