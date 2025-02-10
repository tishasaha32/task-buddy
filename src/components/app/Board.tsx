import TaskBoard from "./TaskBoard"
import { db } from "@/firebase/config"
import AddDialog from "./AddTaskDialog"
import { useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import { DatePicker } from "../ui/date-picker"
import { Button } from "@/components/ui/button"
import { ChevronDown, Search } from "lucide-react"
import { collection, getDocs } from "firebase/firestore"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const Board = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [category, setCategory] = useState<string>("");
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [openDialog, setOpenDialog] = useState<boolean>(false);
    const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);

    const getTasks = async (): Promise<Task[]> => {
        try {
            const tasksCollection = collection(db, "tasks");
            const tasksSnapshot = await getDocs(tasksCollection);
            const tasksList: Task[] = tasksSnapshot.docs.map((doc) => {
                const data = doc.data();
                return {
                    id: doc.id,
                    title: data.title || "",
                    description: data.description || "",
                    category: data.category as "Work" | "Personal",
                    dueDate: data.dueDate ? new Date(data.dueDate.toDate()) : new Date(),
                    status: data.status as "TODO" | "IN_PROGRESS" | "COMPLETED",
                    attachments: data.attachments,
                    createdAt: data.createdAt ? new Date(data.createdAt) : new Date(),
                    updatedAt: data.updatedAt ? new Date(data.updatedAt) : undefined,
                    fileUpdatedAt: data.fileUpdatedAt ? new Date(data.fileUpdatedAt) : undefined,
                    userUid: data.userUid || "",
                };
            });
            return tasksList as Task[];
        } catch (error) {
            console.error("Error fetching tasks:", error);
            return [] as Task[];
        }
    };

    useEffect(() => {
        const fetchTasks = async () => {
            const tasksData = await getTasks();
            setTasks(tasksData);
            setFilteredTasks(tasksData);
        };
        fetchTasks();
    }, []);

    const handleCategorySelect = (category: string) => {
        setCategory(category);
        const tasksFiltered = tasks.filter((task) => task?.category === category);
        setFilteredTasks(tasksFiltered);
    }

    const handleDateSelect = (date: Date | undefined) => {
        setSelectedDate(date);
        const tasksFiltered = tasks.filter((task) => task?.dueDate?.toString().slice(4, 15) === date?.toString().slice(4, 15));
        setFilteredTasks(tasksFiltered);
    }

    const handleSearch = (searchTerm: string) => {
        setSearchTerm(searchTerm);
        const tasksFiltered = tasks.filter((task) => task?.title?.toLowerCase().includes(searchTerm.toLowerCase()));
        setFilteredTasks(tasksFiltered);
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
                                <SelectItem value="Work">Work</SelectItem>
                                <SelectItem value="Personal">Personal</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    <DatePicker endContent={<ChevronDown size={20} />} placeholder="Due Date" className="w-[120px] rounded-3xl" onChange={(date) => handleDateSelect(date)} />
                </div>
                <div className="flex items-center gap-3">
                    <Input placeholder="Search" className="w-[250px] rounded-3xl" startContent={<Search size={20} />} onChange={(e) => handleSearch(e.target.value)} />
                    <Button className="rounded-3xl" onClick={() => setOpenDialog(true)}>Add Task</Button>
                </div>
            </div>
            <TaskBoard tasks={filteredTasks} searchTerm={searchTerm} selectedDate={selectedDate} category={category} />
        </>
    )
}

export default Board