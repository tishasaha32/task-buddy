import TaskCard from "./TaskCard";
import { useEffect, useState } from "react";
import SearchNotFound from "@/assets/SearchNotFound.png"
import { DndContext, closestCorners } from "@dnd-kit/core";
import { arrayMove, SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
type TaskBoardProps = {
    tasks: Task[];
    searchTerm: string,
    selectedDate: Date | undefined,
    category: string
}
const TaskBoard = ({ tasks, searchTerm, selectedDate, category }: TaskBoardProps) => {
    const [tasksData, setTasksData] = useState(tasks);

    useEffect(() => {
        setTasksData(tasks);
    }, [tasks]);

    // Group tasks by status
    const groupedTasks = {
        TODO: tasksData.filter((task) => task.status === "TODO"),
        IN_PROGRESS: tasksData.filter((task) => task.status === "IN_PROGRESS"),
        COMPLETED: tasksData.filter((task) => task.status === "COMPLETED"),
    };

    // Handle drag end
    const handleDragEnd = (event: any) => {
        const { active, over } = event;
        if (!over || active.id === over.id) return;

        setTasksData((prevTasks) => {
            const oldIndex = prevTasks.findIndex((t) => t.uuid === active.id);
            const newIndex = prevTasks.findIndex((t) => t.uuid === over.id);
            return arrayMove(prevTasks, oldIndex, newIndex);
        });
    };

    if (tasksData.length === 0 && (searchTerm || selectedDate || category)) {
        return (
            <div className="flex flex-col gap-3 justify-center h-[60vh] items-center">
                <img src={SearchNotFound} alt="empty" width={250} height={250} className="opacity-50" />
                <h1 className="font-semibold text-lg text-center">It looks like we can't find any results <br />that match.</h1>
            </div>
        )
    }

    Object.entries(groupedTasks).map(([status, tasks]) => console.log("Status:", status, "Tasks:", tasks));

    return (
        <DndContext collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
            <div className="grid grid-cols-3 lg:grid-cols-4 gap-5 mt-5">
                {Object.entries(groupedTasks).map(([status, tasks]) => (
                    <div key={status} className={tasks?.length === 0 ? "bg-[#F1F1F1] p-3 rounded-xl max-h-[6vh]" : "flex flex-col bg-[#F1F1F1] p-3 rounded-xl"}>
                        <h1 className={status === "TODO" ? "px-2 rounded-md w-16 text-center text-sm mb-4 bg-[#FAC3FF]" : status === "IN_PROGRESS" ? "px-2 rounded-md w-28 mb-4 text-center text-sm bg-[#85D9F1]" : "px-2 rounded-md w-24 text-center text-sm mb-4 bg-[#A2D6A0]"}>{status.split("_").join(" ")}</h1>
                        <SortableContext items={tasks.map((t) => t.uuid)} strategy={verticalListSortingStrategy}>
                            {tasks?.map((task) => (
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
