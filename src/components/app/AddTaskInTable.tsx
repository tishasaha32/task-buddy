import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { TableCell, TableRow } from "@/components/ui/table"
import { CalendarIcon, CornerDownLeft } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

const AddTaskInTable = ({ setAddTaskClicked }: { setAddTaskClicked: React.Dispatch<React.SetStateAction<boolean>> }) => {
    return (
        <>
            <TableRow className="hidden sm:table-row border-b-0">
                <TableCell></TableCell>
                <TableCell>
                    <Input type="text" placeholder="Task Title" className="border-none" />
                </TableCell>
                <TableCell>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                variant={"outline"}
                                className={cn(
                                    "justify-between rounded-3xl bg-[#F1F1F1]",
                                )}
                            >
                                <CalendarIcon className=" text-gray-500" />
                                <span className="text-gray-500">Add Date</span>
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                            <Calendar
                                mode="single"
                                initialFocus
                            />
                        </PopoverContent>
                    </Popover>
                </TableCell>
                <TableCell>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button variant="outline" className="rounded-full bg-[#F1F1F1] text-lg">+</Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-32 text-xs cursor-pointer">
                            <p>TODO</p>
                            <p>IN PROGRESS</p>
                            <p>COMPLETED</p>
                        </PopoverContent>
                    </Popover>
                </TableCell>
                <TableCell>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button variant="outline" className="rounded-full bg-[#F1F1F1] text-lg">+</Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-32 text-xs cursor-pointer">
                            <p>WORK</p>
                            <p>PERSONAL</p>
                        </PopoverContent>
                    </Popover>
                </TableCell>
                <TableCell></TableCell>
            </TableRow>
            <TableRow className="hidden sm:table-row">
                <TableCell></TableCell>
                <TableCell className="flex items-center gap-2 pt-0">
                    <Button className="rounded-3xl flex items-center" size="sm">Add <CornerDownLeft /></Button>
                    <Button variant="ghost" className="font-bold" size="sm" onClick={() => setAddTaskClicked(false)}>Cancel</Button>
                </TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
            </TableRow>
        </>
    )
}

export default AddTaskInTable