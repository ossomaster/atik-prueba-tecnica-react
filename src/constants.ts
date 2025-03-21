import { TEmpleado, THora } from "./types"

export const EMPLEADOS: TEmpleado[] = [
	{ id: "1", nombre: "Ana María Santos", area: "Recepción", cargo: "Recepcionista" },
	{ id: "2", nombre: "Carlos Rodríguez", area: "Cocina", cargo: "Chef" },
	{ id: "3", nombre: "Diana Martínez", area: "Limpieza", cargo: "Supervisora" },
	{ id: "4", nombre: "Eduardo López", area: "Mantenimiento", cargo: "Técnico" },
	{ id: "5", nombre: "Fernando García", area: "Seguridad", cargo: "Guardia" },
]

export const EVENTO_COLORES = [
	"#4F46E5", // Indigo
	"#7C3AED", // Purple
	"#EC4899", // Pink
	"#F59E0B", // Amber
	"#10B981", // Emerald
]

export const HORAS: THora[] = Array.from({ length: 16 }, (_, i) => {
	const hora = i + 5 // Comenzando desde las 5 AM
	return {
		hora: `${hora.toString().padStart(2, "0")}:00`,
		etiqueta: `${hora}:00${hora < 12 ? "am" : "pm"}`,
	}
})
