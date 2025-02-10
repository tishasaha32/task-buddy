import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { DatePicker } from "@/components/ui/date-picker"
import { TableCell, TableRow } from "@/components/ui/table"
import { CalendarDays, CornerDownLeft } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

const AddTaskInTable = ({ setAddTaskClicked }: { setAddTaskClicked: React.Dispatch<React.SetStateAction<boolean>> }) => {
    const [taskTitle, setTaskTitle] = useState<string>("");
    const [taskStatus, setTaskStatus] = useState<string>("");
    const [taskCategory, setTaskCategory] = useState<string>("");
    const [taskDate, setTaskDate] = useState<Date | undefined>();

    console.log(taskTitle, taskStatus, taskCategory, taskDate);

    return (
        <>
            <TableRow className="hidden sm:table-row border-b-0">
                <TableCell></TableCell>
                <TableCell>
                    <Input type="text" placeholder="Task Title" onChange={(e) => setTaskTitle(e.target.value)} className="border-none" />
                </TableCell>
                <TableCell>
                    <DatePicker startContent={<CalendarDays />} value={taskDate} onChange={(date) => setTaskDate(date)} placeholder="Add Date" className={taskDate ? "bg-[#F1F1F1] w-[150px] rounded-3xl" : "bg-[#F1F1F1] w-[120px] rounded-3xl"} />
                </TableCell>
                <TableCell>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button variant="outline" className="rounded-full bg-[#F1F1F1] text-lg">+</Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-32 text-xs flex flex-col gap-2 font-semibold cursor-pointer">
                            <p onClick={() => setTaskStatus("TODO")}>TODO</p>
                            <p onClick={() => setTaskStatus("IN PROGRESS")}>IN PROGRESS</p>
                            <p onClick={() => setTaskStatus("COMPLETED")}>COMPLETED</p>
                        </PopoverContent>
                    </Popover>
                </TableCell>
                <TableCell>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button variant="outline" className="rounded-full bg-[#F1F1F1] text-lg">+</Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-32 text-xs flex flex-col gap-2 font-semibold cursor-pointer">
                            <p onClick={() => setTaskCategory("WORK")}>WORK</p>
                            <p onClick={() => setTaskCategory("PERSONAL")}>PERSONAL</p>
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