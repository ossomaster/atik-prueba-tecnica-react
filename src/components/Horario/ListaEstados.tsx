import { TEstado } from "@/types"

interface Props {
	estados: TEstado[]
}

export default function ListaEstados({ estados }: Props) {
	return (
		<div className="p-4 bg-white rounded-lg shadow-lg mt-4 flex items-center gap-2">
			<h3 className="text-sm">Estados de marcajes:</h3>
			<ul className="flex gap-4">
				{estados.map((estado) => (
					<li key={estado.id} className="flex items-center gap-1 text-xs">
						<span
							className="size-4 rounded-full inline-block"
							style={{
								backgroundColor: estado.color,
							}}
						></span>
						{estado.nombre}
					</li>
				))}
			</ul>
		</div>
	)
}
