import { Check, Briefcase, User } from "lucide-react"
import { Employee } from "@/types"
import { cn } from "@/lib/utils"

interface EmployeeListProps {
	employees: Employee[]
	selectedEmployees: Employee[]
	onEmployeeSelect: (employee: Employee) => void
}

export function EmployeeList({ employees, selectedEmployees, onEmployeeSelect }: EmployeeListProps) {
	return (
		<div className="w-80 bg-white rounded-lg shadow-lg overflow-hidden">
			<div className="p-4 bg-primary text-primary-foreground">
				<h2 className="text-lg font-semibold flex items-center gap-2">
					<User className="h-5 w-5" />
					Employees
				</h2>
			</div>
			<div className="divide-y divide-gray-100 max-h-[calc(100vh-200px)] overflow-y-auto">
				{employees.map((employee) => {
					const isSelected = selectedEmployees.some((e) => e.id === employee.id)
					return (
						<div
							key={employee.id}
							className={cn(
								"p-3 flex items-center gap-3 cursor-pointer hover:bg-gray-50 transition-colors",
								isSelected && "bg-primary/5"
							)}
							onClick={() => onEmployeeSelect(employee)}
						>
							<div
								className={cn(
									"w-5 h-5 rounded-full border flex items-center justify-center",
									isSelected && "bg-primary border-primary"
								)}
							>
								{isSelected && <Check className="h-3 w-3 text-primary-foreground" />}
							</div>
							<div>
								<p className="font-medium">{employee.name}</p>
								<p className="text-sm text-gray-500 flex items-center gap-1">
									<Briefcase className="h-3 w-3" />
									{employee.area} • {employee.position}
								</p>
							</div>
						</div>
					)
				})}
			</div>
		</div>
	)
}
