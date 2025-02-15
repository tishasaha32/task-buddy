import { useRef } from "react";
import TaskCard from "./TaskCard";
import { useDrop } from "react-dnd";
import { motion } from "framer-motion";
import { ItemType } from "@/types/dndType";

interface ColumnProps {
    status: string;
    tasks: Task[];
    moveTaskWithinColumn: (dragIndex: number, hoverIndex: number, status: string) => void;
    moveTaskBetweenCols: (id: number | string, newStatus: string) => void;
}

const BoardColumn = ({ status, tasks, moveTaskWithinColumn, moveTaskBetweenCols }: ColumnProps) => {
    const [{ isOver }, drop] = useDrop({
        accept: ItemType,
        drop: (item: { id: number | string; status: string }) =>
            moveTaskBetweenCols(item.id, status),
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        }),
    });

    const dropRef = useRef<HTMLDivElement | null>(null);
    drop(dropRef);

    return (
        <motion.div
            ref={dropRef}
            className={`p-4 border rounded-lg ${isOver ? "bg-gray-200" : "bg-gray-100"}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
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
                        index={index}
                        moveTaskWithinColumn={moveTaskWithinColumn}
                        status={status}
                    />
                ))}
        </motion.div>
    );
};

export default BoardColumn;
