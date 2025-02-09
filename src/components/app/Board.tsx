import { tasks } from "@/data"
import { useState } from "react"
import TaskBoard from "./TaskBoard"
import AddDialog from "./AddTaskDialog"
import { Input } from "@/components/ui/input"
import { DatePicker } from "../ui/date-picker"
import { Button } from "@/components/ui/button"
import { ChevronDown, Search } from "lucide-react"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const Board = () => {
    const [tasksData, setTasksData] = useState(tasks);
    const [openDialog, setOpenDialog] = useState<boolean>(false);
    const handleCategorySelect = (category: string) => {
        const tasksFiltered = tasks.filter((task) => task?.category === category.toUpperCase());
        setTasksData(tasksFiltered);
    }
    return (
        <>
            {openDialog && (
                <AddDialog
                    openDialog={openDialog}
                    setOpenDialog={setOpenDialog}
                />
            )}
            <div className="flex justify-between items-center gap-5">
                <div className="flex items-center gap-3">
                    <p className="text-gray-500 text-sm">Filter By: </p>
                    <Select onValueChange={(value) => handleCategorySelect(value)}>
                        <SelectTrigger className="w-28 rounded-3xl">
                            <SelectValue placeholder="Category" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="work">Work</SelectItem>
                                <SelectItem value="personal">Personal</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    <DatePicker endContent={<ChevronDown size={20} />} placeholder="Due Date" className="w-[120px] rounded-3xl" onChange={(date) => console.log(date)} />
                </div>
                <div className="flex items-center gap-3">
                    <Input placeholder="Search" className="w-[250px] rounded-3xl" startContent={<Search size={20} />} />
                    <Button className="rounded-3xl" onClick={() => setOpenDialog(true)}>Add Task</Button>
                </div>
            </div>
            <TaskBoard tasks={tasksData} />
        </>
    )
}

export default Board