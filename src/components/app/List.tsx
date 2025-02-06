import { useState } from "react"
import { cn } from "@/lib/utils"
import TaskTable from "./TaskTable"
import AddDialog from "./AddDialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ChevronDown, Search } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { Separator } from "@/components/ui/separator"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const List = () => {

    const [openAddDialog, setOpenAddDialog] = useState<boolean>(false);
    return (
        <>
            {openAddDialog && (<AddDialog openDialog={openAddDialog} setOpenDialog={setOpenAddDialog} />)}
            <div className="flex flex-col md:flex-row justify-between items-center gap-5">
                <Button className="md:hidden block rounded-3xl">Add Task</Button>
                <div className="flex items-center gap-3">
                    <p className="text-gray-500 text-sm">Filter By: </p>
                    <Select>
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

                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                variant={"outline"}
                                className={cn(
                                    "w-28 rounded-3xl text-gray-500",
                                )}
                            >
                                <span>Due Date</span>
                                <ChevronDown size={20} />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                            <Calendar
                                mode="single"
                                initialFocus
                            />
                        </PopoverContent>
                    </Popover>
                </div>
                <div className="flex items-center gap-3">
                    <Input placeholder="Search" className="w-[250px] rounded-3xl" startContent={<Search size={20} />} />
                    <Button className="hidden md:block rounded-3xl" onClick={() => setOpenAddDialog(true)}>Add Task</Button>
                </div>
            </div>
            <Separator className="mt-5 mb-1" />
            <TaskTable />
        </>
    )
}

export default List