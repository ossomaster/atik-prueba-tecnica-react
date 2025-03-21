import { TEmpleado, THora, TLicenciaPermiso, TTurno, TEstado } from "./types"

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

export const TURNOS: TTurno[] = [
	{ id: "1", nombre: "A", color: "#8B5CF6" }, // Morado
	{ id: "2", nombre: "M", color: "#F59E0B" }, // Mostaza
	{ id: "3", nombre: "N", color: "#6366F1" }, // Indigo
	{ id: "4", nombre: "S", color: "#7C3AED" }, // Violeta
	{ id: "5", nombre: "T", color: "#10B981" }, // Verde
]

export const LICENCIAS_PERMISOS: TLicenciaPermiso[] = [
	{ id: "1", nombre: "DESCANSO", color: "#EF4444" },
	{ id: "2", nombre: "LICENCIA POR MATERNIDAD", color: "#F59E0B" },
	{ id: "3", nombre: "LICENCIA POR TRAMITE ESPECIAL", color: "#3B82F6" },
	{ id: "4", nombre: "ESTUDIOS", color: "#8B5CF6" },
	{ id: "5", nombre: "TRÁMITE LEGAL", color: "#333333" },
	{ id: "6", nombre: "NACIMIENTO DE UN HIJO", color: "#EF4444" },
]

export const ESTADOS: TEstado[] = [
	{ id: "1", nombre: "A tiempo", color: "#10B981" }, // Verde
	{ id: "2", nombre: "Tardanza", color: "#F97316" }, // Naranja
	{ id: "3", nombre: "Salida anticipada", color: "#F59E0B" }, // Mostaza
	{ id: "4", nombre: "Ausencia", color: "#EF4444" }, // Rojo
	{ id: "5", nombre: "Marcaje de entrada", color: "#84CC16" }, // Verde limón
	{ id: "6", nombre: "Marcaje de salida", color: "#6366F1" }, // Indigo
]

export const HORAS: THora[] = Array.from({ length: 16 }, (_, i) => {
	const hora = i + 5 // Comenzando desde las 5 AM
	return {
		hora: `${hora.toString().padStart(2, "0")}:00`,
		etiqueta: `${hora}:00${hora < 12 ? "am" : "pm"}`,
	}
})
