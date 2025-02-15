import { db } from "@/firebase/config";
import { useEffect, useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { BoardColumn, NoTaskBoard } from "../common";

type TaskBoardProps = {
    tasks: Task[];
    searchTerm: string;
    selectedDate: Date | undefined;
    category: string;
};

const TaskBoard = ({
    tasks,
    searchTerm,
    selectedDate,
    category,
}: TaskBoardProps) => {
    const [tasksData, setTasksData] = useState(tasks);

    useEffect(() => {
        setTasksData(tasks);
    }, [tasks]);

    const moveTaskBetweenCols = async (id: number | string, newStatus: string) => {
        setTasksData((prev) =>
            prev.map((task): Task =>
                task.id === id ? { ...task, status: newStatus as "TODO" | "IN_PROGRESS" | "COMPLETED" } : task
            )
        );
        // updates in firebase
        const taskRef = doc(db, "tasks", id.toString());
        await updateDoc(taskRef, { status: newStatus });
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
    };

    if (tasksData.length === 0 && (searchTerm || selectedDate || category)) {
        return <NoTaskBoard />;
    }

    return (
        <div className="grid grid-cols-3 lg:grid-cols-4 gap-5 mt-5">
            {["TODO", "IN_PROGRESS", "COMPLETED"].map((status) => (
                <BoardColumn
                    key={status}
                    status={status}
                    tasks={tasksData}
                    moveTaskWithinColumn={moveTaskWithinColumn}
                    moveTaskBetweenCols={moveTaskBetweenCols}
                />
            ))}
        </div>
    );
};

export default TaskBoard;