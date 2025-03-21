import { ChevronDownIcon, SearchIcon } from "lucide-react"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"

const Header = () => {
	return (
		<header className="p-4 bg-white rounded-lg shadow-lg">
			<div className="flex flex-col md:flex-row gap-3 items-start md:items-center">
				{/* Search Bar */}
				<div className="relative flex-1 min-w-0">
					<div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
						<SearchIcon className="h-4 w-4 text-gray-400" />
					</div>
					<Input
						type="text"
						placeholder="Buscar por código, Cédula, Género, Tipo de Trabajo"
						className="pl-10 pr-32  rounded-md"
					/>
					<div className="absolute inset-y-0 right-3 flex items-center">
						<Button variant="ghost" className="text-primary h-6 px-1 text-sm font-medium flex items-center gap-1">
							Búsqueda avanzada
							<ChevronDownIcon className="h-3 w-3" />
						</Button>
					</div>
				</div>

				{/* Period Selector */}
				<div className="flex items-center gap-2">
					<span className="text-sm text-gray-500">Periodo</span>
					<Select defaultValue="diario" disabled>
						<SelectTrigger className="w-32 ">
							<SelectValue placeholder="Seleccionar" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="diario">Diario</SelectItem>
							<SelectItem value="semanal">Semanal</SelectItem>
							<SelectItem value="mensual">Mensual</SelectItem>
						</SelectContent>
					</Select>
				</div>

				{/* Date Picker */}
				<div className="flex items-center gap-2">
					<span className="text-sm text-gray-500">Fecha</span>
					<div className="flex items-center gap-2">
						<Input type="date" />
						<Button className="bg-primary hover:bg-primary/90 text-white">Hoy</Button>
					</div>
				</div>

				{/* Filter Buttons */}
				<div className="flex items-center gap-2">
					<Button variant="outline">Turnos de trabajo</Button>
					<Button variant="outline">Licencias y permisos</Button>
				</div>
			</div>
		</header>
	)
}

export default Header
