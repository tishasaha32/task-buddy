import TaskCard from "./TaskCard";
import { useEffect, useRef, useState } from "react";
import SearchNotFound from "@/assets/SearchNotFound.png";
import { useDrop } from "react-dnd";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/firebase/config";

type TaskBoardProps = {
    tasks: Task[];
    searchTerm: string;
    selectedDate: Date | undefined;
    category: string;
};

interface ColumnProps {
    status: string;
    tasks: Task[];
    moveTaskWithinColumn: (dragIndex: number, hoverIndex: number, status: string) => void;
    moveTask: (id: number | string, newStatus: string) => void;
}

const ItemType = "task";

const TaskBoard = ({
    tasks,
    searchTerm,
    selectedDate,
    category,
}: TaskBoardProps) => {
    const [tasksData, setTasksData] = useState(tasks);

    useEffect(() => {
        console.log(tasks)
        setTasksData(tasks);
    }, [tasks]);

    const moveTask = (id: number | string, newStatus: string) => {
        setTasksData((prev) =>
            prev.map((task): Task =>
                task.id === id ? { ...task, status: newStatus as "TODO" | "IN_PROGRESS" | "COMPLETED" } : task
            )
        );
    };

    const moveTaskWithinColumn = async (
        dragIndex: number,
        hoverIndex: number,
        status: string
    ) => {
        const filteredTasks = tasksData.filter((task) => task.status === status);
        const draggedTask = filteredTasks[dragIndex];
        filteredTasks.splice(dragIndex, 1);
        filteredTasks.splice(hoverIndex, 0, draggedTask);
        const finalTasks = [...tasksData.filter((task) => (task.status !== status)), ...filteredTasks]

        setTasksData(finalTasks);
        console.log(finalTasks)
        try {
            const tasksRef = doc(db, "tasks");
            await setDoc(tasksRef, { tasks: finalTasks }, { merge: true });
        }
        catch (error) {
            console.log(error)
        }

    };

    // No results
    if (tasksData.length === 0 && (searchTerm || selectedDate || category)) {
        return (
            <div className="flex flex-col gap-3 justify-center h-[60vh] items-center">
                <img
                    src={SearchNotFound}
                    alt="empty"
                    width={250}
                    height={250}
                    className="opacity-50"
                />
                <h1 className="font-semibold text-lg text-center">
                    It looks like we can't find any results <br />
                    that match.
                </h1>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-3 lg:grid-cols-4 gap-5 mt-5">
            {["TODO", "IN_PROGRESS", "COMPLETED"].map((status) => (
                <Column
                    key={status}
                    status={status}
                    tasks={tasksData}
                    moveTaskWithinColumn={moveTaskWithinColumn}
                    moveTask={moveTask}
                />
            ))}
        </div>
    );
};


const Column = ({ status, tasks, moveTaskWithinColumn, moveTask }: ColumnProps) => {
    const [{ isOver }, drop] = useDrop({
        accept: ItemType,
        drop: (item: { id: number | string; status: string }) =>
            moveTask(item.id, status),
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        }),
    });

    const dropRef = useRef<HTMLDivElement | null>(null);
    drop(dropRef);

    return (
        <div
            ref={dropRef}
            className={`p-4 border ${isOver ? "bg-gray-200" : "bg-gray-100"}`}
        >
            <h1
                className={
                    status === "TODO"
                        ? "px-2 rounded-md w-16 text-center text-sm mb-4 bg-[#FAC3FF]"
                        : status === "IN_PROGRESS"
                            ? "px-2 rounded-md w-28 mb-4 text-center text-sm bg-[#85D9F1]"
                            : "px-2 rounded-md w-24 text-center text-sm mb-4 bg-[#A2D6A0]"
                }
            >
                {status.split("_").join(" ")}
            </h1>
            {tasks
                ?.filter((task: Task) => task.status === status)
                .map((task: Task, index: number) => (
                    <TaskCard
                        task={task}
                        key={task.id}
                        index={index}
                        moveTaskWithinColumn={moveTaskWithinColumn}
                        status={status}
                    />
                ))}
        </div>
    );
};

export default TaskBoard;