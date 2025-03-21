import { cn } from "@/lib/utils"
import { TEvento, THora } from "@/types"
import { useDraggable } from "@dnd-kit/core"
import { MoveIcon } from "lucide-react"
import { CSSProperties } from "react"

export default function EventoBar({
	evento,
	horas,
	index,
	totalEventos,
}: {
	evento: TEvento
	horas: THora[]
	index: number
	totalEventos: number
}) {
	const startIndex = horas.findIndex((slot) => slot.hora === evento.hora_inicio)
	const endIndex = horas.findIndex((slot) => slot.hora === evento.hora_fin)
	const width = `${(endIndex - startIndex) * 100}%`
	const height = `${80 / totalEventos}%`
	const top = `${index * (100 / totalEventos)}%`

	const { attributes, listeners, setNodeRef, transform } = useDraggable({
		id: evento.id,
		data: evento,
	})

	const style: CSSProperties = transform
		? {
				transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
				width,
				height,
				top,
				backgroundColor: evento.licenciaPermiso.color + "40",
		  }
		: {
				width,
				height,
				top,
				backgroundColor: evento.licenciaPermiso.color + "30",
		  }

	return (
		<div
			style={style}
			className={cn(
				"absolute left-0 rounded shadow-md cursor-pointer flex items-center",
				"opacity-90 hover:opacity-100 transition-opacity"
			)}
		>
			<button
				className="flex-shrink-0 flex items-center justify-center size-6 p-1 cursor-move"
				ref={setNodeRef}
				{...listeners}
				{...attributes}
			>
				<MoveIcon className="size-3 opacity-50" />
			</button>
			<div
				className="p-2 text-xs truncate"
				style={{
					color: evento.licenciaPermiso.color,
				}}
			>
				<h3 className="inline-block font-medium truncate">{evento.nombre}</h3>
				<p className="inline-block truncate ml-2">
					{evento.hora_inicio} - {evento.hora_fin}
				</p>
			</div>
		</div>
	)
}
