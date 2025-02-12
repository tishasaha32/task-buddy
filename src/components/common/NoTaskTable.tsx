import { TableRow, TableCell } from "@/components/ui/table"
const NoTaskTable = ({ status }: { status: string }) => {
    return (
        <TableRow>
            <TableCell colSpan={6} className="text-center">
                No tasks {status.split("_").join(" ")}
            </TableCell>
        </TableRow>
    )
}

export default NoTaskTable