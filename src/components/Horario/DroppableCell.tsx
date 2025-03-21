import { useDroppable } from "@dnd-kit/core"
import React from "react"

export default function DroppableCell({
	empleadoId,
	hora,
	children,
}: {
	empleadoId: string
	hora: string
	children: React.ReactNode
}) {
	const { setNodeRef } = useDroppable({
		id: `${empleadoId}-${hora}`,
		data: {
			empleadoId,
			hora,
		},
	})

	return (
		<div ref={setNodeRef} className="absolute inset-0">
			{children}
		</div>
	)
}
