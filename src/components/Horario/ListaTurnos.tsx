import { TTurno } from "@/types"

interface Props {
	turnos: TTurno[]
}

export default function ListaTurnos({ turnos }: Props) {
	return (
		<div className="p-4 bg-white rounded-lg shadow-lg mt-4 flex items-center gap-2">
			<h3 className="text-sm">Turnos de trabajo:</h3>
			<ul className="flex gap-2">
				{turnos.map((turno) => (
					<li key={turno.id}>
						<span
							className="text-xs font-medium px-2 py-1 rounded text-white"
							style={{
								backgroundColor: turno.color,
							}}
						>
							{turno.nombre}
						</span>
					</li>
				))}
			</ul>
		</div>
	)
}
