import { cn } from "@/lib/utils"
import { TEmpleado } from "@/types"
import { CheckIcon } from "lucide-react"

interface Props {
	empleados: TEmpleado[]
	empleadosSeleccionados: TEmpleado[]
	onSelect: (employee: TEmpleado) => void
}

export function ListaEmpleados({ empleados, empleadosSeleccionados, onSelect }: Props) {
	return (
		<div className="bg-white rounded-lg shadow-lg flex flex-col">
			<div className="px-4 py-2 bg-primary text-white rounded-t-lg">
				<h2 className="text-center font-medium">Empleados</h2>
			</div>
			<div className="flex-grow overflow-y-auto">
				<div className="divide-y divide-gray-200 overflow-y-auto">
					{empleados.map((empleado) => {
						const isSelected = empleadosSeleccionados.some((e) => e.id === empleado.id)
						return (
							<div
								key={empleado.id}
								className={cn(
									"p-2 flex items-center gap-3 cursor-pointer hover:bg-gray-50 transition-colors",
									isSelected && "bg-primary/5"
								)}
								onClick={() => onSelect(empleado)}
							>
								<div className="flex-1">
									<div
										className={cn("border-l-4 border-transparent pl-2", {
											"border-primary": isSelected,
										})}
									>
										<h3 className="font-medium text-sm">{empleado.nombre}</h3>
										<p className="text-xs text-gray-500 flex items-center gap-1">
											{empleado.area} • {empleado.cargo}
										</p>
									</div>
								</div>
								<div
									className={cn(
										"size-5 rounded-full border flex items-center justify-center",
										isSelected && "bg-primary border-primary"
									)}
								>
									{isSelected && <CheckIcon className="size-3 text-white" />}
								</div>
							</div>
						)
					})}
				</div>
			</div>
			<p className="px-4 py-2 text-center text-xs text-gray-500 bg-gray-100">
				Seleccionado: {empleadosSeleccionados.length} de {empleados.length} empleados
			</p>
		</div>
	)
}
