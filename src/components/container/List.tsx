import { useEffect, useState } from "react";
import TaskTable from "../container/TaskTable";
import { useTaskStore } from "@/store/taskStore";
import { Separator } from "@/components/ui/separator";
import { Filter, Search, AddTaskButton, AddTaskButtonMobile, Loading } from "../common"
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/config";

const List = () => {
    const [user] = useAuthState(auth)
    const { tasks, getTasks, loading } = useTaskStore((state) => state);

    const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);

    useEffect(() => {
        getTasks({ user });
    }, []);

    useEffect(() => {
        setFilteredTasks(tasks);
    }, [tasks]);

    if (loading) {
        return <Loading />;
    }

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
