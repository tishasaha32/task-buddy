import { useState } from "react";
import TaskCard from "./TaskCard";
import { tasks as initialTasks } from "@/data/tasks";
import { DndContext, closestCorners } from "@dnd-kit/core";
import { arrayMove, SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";

const TaskBoard = () => {
    const [tasks, setTasks] = useState(initialTasks);

    // Group tasks by status
    const groupedTasks = {
        TODO: tasks.filter((task) => task.status === "TODO"),
        IN_PROGRESS: tasks.filter((task) => task.status === "IN_PROGRESS"),
        COMPLETED: tasks.filter((task) => task.status === "COMPLETED"),
    };

    // Handle drag end
    const handleDragEnd = (event: any) => {
        const { active, over } = event;
        if (!over || active.id === over.id) return;

        setTasks((prevTasks) => {
            const oldIndex = prevTasks.findIndex((t) => t.uuid === active.id);
            const newIndex = prevTasks.findIndex((t) => t.uuid === over.id);
            return arrayMove(prevTasks, oldIndex, newIndex);
        });
    };

    return (
        <DndContext collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
            <div className="grid grid-cols-3 lg:grid-cols-4 gap-5 mt-5">
                {Object.entries(groupedTasks).map(([status, tasks]) => (
                    <div key={status} className="flex flex-col bg-[#F1F1F1] min-h-[70vh] p-2 rounded-3xl">
                        <h1 className={status === "TODO" ? "px-2 rounded-2xl w-16 text-center text-sm mb-4 bg-[#FAC3FF]" : status === "IN_PROGRESS" ? "px-2 rounded-2xl w-28 mb-4 text-center text-sm bg-[#FFD6A5]" : "px-2 rounded-2xl w-24 text-center text-sm mb-4 bg-[#A2D6A0]"}>{status}</h1>
                        <SortableContext items={tasks.map((t) => t.uuid)} strategy={verticalListSortingStrategy}>
                            {tasks.map((task) => (
                                <TaskCard task={task} key={task.uuid} />
                            ))}
                        </SortableContext>
                    </div>
                ))}
            </div>
        </DndContext>
    );
};

export default TaskBoard;
