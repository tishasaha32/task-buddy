import TaskTable from "./TaskTable";
import { db } from "@/firebase/config";
import { useEffect, useState } from "react";
import AddTaskDialog from "./AddTaskDialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ChevronDown, Search } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import AddTaskDrawerMobile from "./AddTaskDrawerMobile";
import { DatePicker } from "@/components/ui/date-picker";
import { collection, getDocs } from "firebase/firestore";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const List = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
    const [openAddTaskDialog, setOpenAddTaskDialog] = useState<boolean>(false);
    const [openAddTaskDrawerMobile, setOpenAddTaskDrawerMobile] = useState<boolean>(false);

    const getTasks = async (): Promise<Task[]> => {
        try {
            const tasksCollection = collection(db, "tasks");
            const tasksSnapshot = await getDocs(tasksCollection);
            const tasksList: Task[] = tasksSnapshot.docs.map((doc) => {
                const data = doc.data();
                return {
                    id: doc.id,
                    title: data?.title || "",
                    description: data?.description || "",
                    category: data?.category as "Work" | "Personal",
                    dueDate: data?.dueDate ? new Date(data?.dueDate.toDate()) : new Date(),
                    status: data?.status as "TODO" | "IN_PROGRESS" | "COMPLETED",
                    attachments: data?.attachments || [],
                    createdAt: data?.createdAt ? new Date(data?.createdAt.toDate()) : new Date(),
                    updatedAt: data?.updatedAt ? new Date(data?.updatedAt.toDate()) : undefined,
                    fileUpdatedAt: data?.fileUpdatedAt ? new Date(data?.fileUpdatedAt.toDate()) : undefined,
                    userUid: data?.userUid || "",
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

    const handleDateSelect = (date: Date | undefined) => {
        const tasksFiltered = tasks.filter((task) => task?.dueDate?.toString().slice(4, 15) === date?.toString().slice(4, 15));
        setFilteredTasks(tasksFiltered);
    }
    const handleCategorySelect = (category: string) => {
        const tasksFiltered = tasks.filter((task) => task?.category === category);
        setFilteredTasks(tasksFiltered);
    }

    const handleSearch = (searchTerm: string) => {
        const tasksFiltered = tasks.filter((task) => task?.title?.toLowerCase().includes(searchTerm.toLowerCase()));
        setFilteredTasks(tasksFiltered);
    }

    return (
        <>
            {openAddTaskDialog && (
                <AddTaskDialog
                    openDialog={openAddTaskDialog}
                    setOpenDialog={setOpenAddTaskDialog}
                />
            )}
            {openAddTaskDrawerMobile && (
                <AddTaskDrawerMobile
                    openDialog={openAddTaskDrawerMobile}
                    setOpenDialog={setOpenAddTaskDrawerMobile}
                />
            )}
            <div className="flex justify-end pr-4 md:p-0">
                <Button className="md:hidden block rounded-3xl w-32" onClick={() => setOpenAddTaskDrawerMobile(true)}>Add Task</Button>
            </div>
            <div className="p-4 md:p-0 flex flex-col md:flex-row md:justify-between md:items-center gap-5">
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
                        <DatePicker endContent={<ChevronDown size={20} />} placeholder="Due Date" className="w-[120px] rounded-3xl" onChange={(date) => handleDateSelect(date)} />
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <Input
                        placeholder="Search"
                        className="md:w-[250px] rounded-3xl"
                        startContent={<Search size={20} />}
                        onChange={(e) => handleSearch(e.target.value)}
                    />
                    <Button
                        className="hidden md:block rounded-3xl"
                        onClick={() => setOpenAddTaskDialog(true)}
                    >
                        Add Task
                    </Button>
                </div>
            </div>
            <Separator className="mt-5 mb-1 hidden md:block" />
            <TaskTable tasks={filteredTasks} />
        </>
    );
};

export default List;
