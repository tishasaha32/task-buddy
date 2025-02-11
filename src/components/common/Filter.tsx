import { ChevronDown } from "lucide-react"
import { useTaskStore } from "@/store/taskStore";
import { DatePicker } from "@/components/ui/date-picker"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../ui/select"

type FilterProps = {
    setFilteredTasks: React.Dispatch<React.SetStateAction<Task[]>>
    selectedDate: Date | undefined
    setSelectedDate: React.Dispatch<React.SetStateAction<Date | undefined>>
    setCategory?: React.Dispatch<React.SetStateAction<string>>
}

const Filter = ({ setFilteredTasks, selectedDate, setSelectedDate, setCategory }: FilterProps) => {
    const { tasks } = useTaskStore((state) => state);


    const handleDateSelect = (date: Date | undefined) => {
        setSelectedDate?.(date);
        const tasksFiltered = tasks.filter((task) => task?.dueDate?.toString().slice(4, 15) === date?.toString().slice(4, 15));
        setFilteredTasks(tasksFiltered);
    }
    const handleCategorySelect = (category: string) => {
        setCategory?.(category);
        const tasksFiltered = tasks.filter((task) => task?.category === category);
        setFilteredTasks(tasksFiltered);
    }
    return (
        <div className="flex flex-col md:flex-row md:items-center gap-3">
            <p className="text-gray-500 text-sm">Filter By: </p>
            <div className="flex gap-2">
                <Select onValueChange={(value) => handleCategorySelect(value)}>
                    <SelectTrigger className="w-28 rounded-3xl">
                        <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectItem value="Work">Work</SelectItem>
                            <SelectItem value="Personal">Personal</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
                <DatePicker endContent={<ChevronDown size={20} />} value={selectedDate} placeholder="Due Date" className="w-[140px] rounded-3xl" onChange={(date) => handleDateSelect(date)} />
            </div>
        </div>
    )
}

export default Filter