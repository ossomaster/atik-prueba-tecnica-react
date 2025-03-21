import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

const Buscador = () => {
	return (
		<div className="p-4 bg-white rounded-lg shadow-lg w-full">
			<div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-7 gap-4">
				{/* Código */}
				<div className="space-y-2">
					<Label htmlFor="codigo" className="text-gray-500 text-xs">
						Código:
					</Label>
					<p className="font-medium">2001</p>
				</div>

				{/* Fecha de Inicio */}
				<div className="space-y-2">
					<Label className="text-gray-500 text-xs">Fecha de Inicio:</Label>
					<Input id="fechaInicio" type="date" readOnly />
				</div>

				{/* Fecha de Fin */}
				<div className="space-y-2">
					<Label className="text-gray-500 text-xs">Fecha de Fin:</Label>
					<Input id="fechaFin" type="date" readOnly />
				</div>

				{/* Sede */}
				<div className="space-y-2">
					<Label htmlFor="sede" className="text-gray-500 text-xs">
						Sede:
					</Label>
					<p className="truncate font-medium">Hodelpa Gran Almirante</p>
				</div>

				{/* Departamento */}
				<div className="space-y-2">
					<Label htmlFor="departamento" className="text-gray-500 text-xs">
						Departamento:
					</Label>
					<p className="truncate font-medium">Alimentos y Bebidas</p>
				</div>

				{/* Cargo */}
				<div className="space-y-2">
					<Label htmlFor="cargo" className="text-gray-500 text-xs">
						Cargo:
					</Label>
					<p className="truncate font-medium">Asistente de Cocina</p>
				</div>

				{/* Tipo De Contrato */}
				<div className="space-y-2">
					<Label htmlFor="tipoContrato" className="text-gray-500 text-xs">
						Tipo De Contrato:
					</Label>
					<p className="truncate font-medium">Indefinido</p>
				</div>
			</div>
		</div>
	)
}

export default Buscador
