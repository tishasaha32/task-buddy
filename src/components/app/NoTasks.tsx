import { TableRow, TableCell } from "@/components/ui/table"
const NoTasks = ({ status }: { status: string }) => {
    return (
        <TableRow>
            <TableCell colSpan={6} className="text-center">
                No tasks in {status}
            </TableCell>
        </TableRow>
    )
}

export default NoTasks