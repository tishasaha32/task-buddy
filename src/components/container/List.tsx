import TaskTable from "../container/TaskTable";
import { useEffect, useState } from "react";
import { Separator } from "@/components/ui/separator";
import { useTaskStore } from "@/store/taskStore";
import Filter from "../common/Filter";
import Search from "../common/Search";
import AddTaskButton from "../common/AddTaskButton";
import AddTaskButtonMobile from "../common/AddTaskButtonMobile";

const List = () => {
    const { tasks, getTasks } = useTaskStore((state) => state);

    const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);

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
                <Filter setFilteredTasks={setFilteredTasks} selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
                <div className="flex items-center gap-3">
                    <Search setFilteredTasks={setFilteredTasks} />
                    <AddTaskButton />
                </div>
            </div>
            <Separator className="mt-5 mb-1 hidden md:block" />
            <TaskTable tasks={filteredTasks} />
        </>
    );
};

export default List;
