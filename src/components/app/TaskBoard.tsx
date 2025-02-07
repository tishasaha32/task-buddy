import TaskCard from "./TaskCard";
import { tasks } from "@/data/tasks";

const TaskBoard = () => {
    const todoTasks = tasks?.filter((task) => task.status === "TODO");
    const inProgressTasks = tasks?.filter((task) => task.status === "IN_PROGRESS");
    const completedTasks = tasks?.filter((task) => task.status === "COMPLETED");

    return (
        <div className="grid grid-cols-3 lg:grid-cols-4 gap-5 mt-5">
            <div className={todoTasks?.length ? "flex flex-col bg-[#F1F1F1] min-h-[70vh] p-2 rounded-3xl" : "flex flex-col bg-[#F1F1F1] p-2 rounded-3xl"}>
                <div className="flex items-start pb-3">
                    <h1 className="px-2 rounded-2xl text-sm bg-[#FAC3FF]">TODO</h1>
                </div>
                {todoTasks?.map((task) => (
                    <TaskCard task={task} key={task.uuid} />
                ))}
            </div>
            <div className={inProgressTasks?.length ? "flex flex-col bg-[#F1F1F1] min-h-[70vh] p-2 rounded-3xl" : "flex flex-col bg-[#F1F1F1] p-2 rounded-3xl"}>
                <div className="flex items-start pb-3">
                    <h1 className="px-2 rounded-2xl text-sm bg-[#FFD6A5]">IN PROGRESS</h1>
                </div>
                {inProgressTasks?.map((task) => (
                    <TaskCard task={task} key={task.uuid} />
                ))}
            </div>
            <div className={completedTasks && completedTasks?.length > 0 ? "flex flex-col bg-[#F1F1F1] min-h-[70vh] p-2 rounded-3xl" : "flex flex-col bg-[#F1F1F1] h-[10vh] p-2 rounded-3xl"}>
                <div className="flex items-start pb-3">
                    <h1 className="px-2 rounded-2xl text-sm bg-[#A2D6A0]">COMPLETED</h1>
                </div>
                {completedTasks?.map((task) => (
                    <TaskCard task={task} key={task.uuid} />
                ))}
            </div>
        </div>
    );
};

export default TaskBoard;
