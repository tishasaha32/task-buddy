import TaskBoard from "./TaskBoard"
import { useEffect, useState } from "react";
import { useTaskStore } from "@/store/taskStore";
import { Separator } from "@/components/ui/separator";
import { Filter, Search, AddTaskButton, AddTaskButtonMobile } from "../common"

const Board = () => {
    const { tasks, getTasks } = useTaskStore((state) => state);

    const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
    const [category, setCategory] = useState<string>("");

    useEffect(() => {
        getTasks();
    }, []);

    useEffect(() => {
        setFilteredTasks(tasks);
    }, [tasks]);

    return (
        <>
            <AddTaskButtonMobile />
            <div className="p-4 md:p-0 flex flex-col md:flex-row md:justify-between md:items-center gap-5">
                <Filter setFilteredTasks={setFilteredTasks} selectedDate={selectedDate} setSelectedDate={setSelectedDate} setCategory={setCategory} />
                <div className="flex items-center gap-3">
                    <Search setFilteredTasks={setFilteredTasks} setSearchTerm={setSearchTerm} />
                    <AddTaskButton />
                </div>
            </div>
            <Separator className="mt-5 mb-1 hidden md:block" />

            <TaskBoard tasks={filteredTasks} searchTerm={searchTerm} selectedDate={selectedDate} category={category} />
        </>
    )
}

export default Board