import { TLicenciaPermiso } from "@/types"

interface Props {
	licenciasPermisos: TLicenciaPermiso[]
}

export default function ListaLicenciasPermisos({ licenciasPermisos }: Props) {
	return (
		<div className="p-4 bg-white rounded-lg shadow-lg mt-4 flex items-center gap-2">
			<h3 className="text-sm">Licencias y permisos:</h3>
			<ul className="flex gap-2">
				{licenciasPermisos.map((licenciaPermiso) => (
					<li key={licenciaPermiso.id}>
						<span
							className="text-xs font-medium px-2 py-1 rounded"
							style={{
								color: licenciaPermiso.color,
								backgroundColor: licenciaPermiso.color + "30",
							}}
						>
							{licenciaPermiso.nombre}
						</span>
					</li>
				))}
			</ul>
		</div>
	)
}
