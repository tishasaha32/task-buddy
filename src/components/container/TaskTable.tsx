import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { useTaskStore } from "@/store/taskStore";
import React, { useEffect, useState } from "react";
import { ChevronUp, CopyCheck, X } from "lucide-react";
import { AddTaskInTable, TasksLists, NoTaskTable } from "../common";
import { DndContext, closestCorners, DragEndEvent } from "@dnd-kit/core";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { SortableContext, arrayMove, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

type TaskTableProps = {
    tasks: Task[];
}

const TaskTable = ({ tasks }: TaskTableProps) => {

    const { updateBulkStatus, deleteBulkTasks } = useTaskStore((state) => state);

    const { toast } = useToast();

    const [showTodo, setShowTodo] = useState(true);
    const [showCompleted, setShowCompleted] = useState(true);
    const [showInProgress, setShowInProgress] = useState(true);
    const [addTaskClicked, setAddTaskClicked] = useState(false);
    const [tasksData, setTasksData] = useState(tasks as Task[]);
    const [selectedTasks, setSelectedTasks] = useState<Task[]>([]);

    useEffect(() => {
        setTasksData(tasks);
    }, [tasks]);

    const updateTaskOrder = (event: DragEndEvent) => {
        const { active, over } = event;
        if (!over) return;

        setTasksData((prevTasks) => {
            const oldIndex = prevTasks.findIndex((t) => t.id === active.id);
            const newIndex = prevTasks.findIndex((t) => t.id === over.id);
            return arrayMove(prevTasks, oldIndex, newIndex);
        });
    };

    const groupedTasks = {
        TODO: tasksData.filter((task) => task.status === "TODO"),
        IN_PROGRESS: tasksData.filter((task) => task.status === "IN_PROGRESS"),
        COMPLETED: tasksData.filter((task) => task.status === "COMPLETED"),
    };

    const updateSelectedTasksStatus = async (newStatus: string, selectedTasks: Task[]) => {
        if (!selectedTasks.length) return;
        updateBulkStatus({ newStatus, selectedTasks, setSelectedTasks, toast });
    };

    const deleteSelectedTasks = async (selectedTasks: Task[]) => {
        if (!selectedTasks.length) return;
        deleteBulkTasks({ selectedTasks, setSelectedTasks, toast });
    };



    return (
        <DndContext collisionDetection={closestCorners} onDragEnd={updateTaskOrder}>
            <div className="p-4 pt-0 md:p-0 overflow-hidden">
                <Table className="w-full">
                    <TableHeader>
                        <TableRow>
                            <TableHead className="hidden sm:table-cell"></TableHead>
                            <TableHead className="hidden sm:table-cell text-bold text-gray-600">Title</TableHead>
                            <TableHead className="hidden sm:table-cell text-bold text-gray-600">DueOn</TableHead>
                            <TableHead className="hidden sm:table-cell text-bold text-gray-600">Status</TableHead>
                            <TableHead className="hidden sm:table-cell text-bold text-gray-600">Category</TableHead>
                            <TableHead className="sm:table-cell hidden"></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody className="bg-[#F1F1F1]">
                        {Object.entries(groupedTasks).map(([status, taskList]) => (
                            <React.Fragment key={status}>
                                <TableRow className="cursor-pointer" onClick={() => {
                                    if (status === "TODO") setShowTodo(!showTodo);
                                    if (status === "IN_PROGRESS") setShowInProgress(!showInProgress);
                                    if (status === "COMPLETED") setShowCompleted(!showCompleted);
                                }}>
                                    <TableCell colSpan={6} className={`bg-${status === "TODO" ? "[#FAC3FF]" : status === "IN_PROGRESS" ? "[#85D9F1]" : "[#A2D6A0]"} font-semibold p-2 text-left rounded-t-md`}>
                                        {status.split("_").join(" ")} ({taskList.length})
                                        <ChevronUp size={16} className={`float-right transform ${((status === "TODO" && showTodo) || (status === "IN_PROGRESS" && showInProgress) || (status === "COMPLETED" && showCompleted)) ? "" : "rotate-180"}`} />
                                    </TableCell>
                                </TableRow>
                                {status === "TODO" &&
                                    <TableRow className="hidden sm:table-row">
                                        <TableCell colSpan={6} onClick={() => setAddTaskClicked(!addTaskClicked)} className="cursor-pointer">+ Add Task </TableCell>
                                    </TableRow>
                                }
                                {addTaskClicked && status === "TODO" && <AddTaskInTable setAddTaskClicked={setAddTaskClicked} />}
                                <SortableContext items={taskList.map((t) => t.id)} strategy={verticalListSortingStrategy}>
                                    {(status === "TODO" && showTodo) || (status === "IN_PROGRESS" && showInProgress) || (status === "COMPLETED" && showCompleted)
                                        ? taskList.map((task) => (
                                            <TasksLists setSelectedTasks={setSelectedTasks} selectedTasks={selectedTasks} key={task.id} task={task} />
                                        ))
                                        : null}
                                </SortableContext>
                                {taskList.length === 0 && <NoTaskTable status={status.toLowerCase()} />}
                                <TableRow className="bg-background">
                                    <TableCell colSpan={6}> </TableCell>
                                </TableRow>
                            </React.Fragment>
                        ))}
                    </TableBody>
                </Table>
                {selectedTasks.length > 0 && (
                    <div className="w-11/12 fixed bottom-4 -translate-x-1/2 left-1/2 md:w-4/12">
                        <div className="flex gap-6 md:gap-10 items-center rounded-xl bg-black text-white p-2">
                            <div className="flex items-center gap-2">
                                <p className="flex items-center gap-2 border border-border p-2 py-1 rounded-3xl text-xs">{selectedTasks.length} tasks selected
                                    <X size={16} />
                                </p>
                                <CopyCheck size={16} />
                            </div>
                            <div className="flex gap-2">
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Badge variant="outline" className="bg-black text-white border border-border px-4 py-1 hover:bg-gray-900 cursor-pointer">Status</Badge>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-32 text-xs bg-black text-white flex flex-col gap-2 font-semibold cursor-pointer">
                                        <p onClick={() => updateSelectedTasksStatus("TODO", selectedTasks)}>TODO</p>
                                        <p onClick={() => updateSelectedTasksStatus("IN_PROGRESS", selectedTasks)}>IN PROGRESS</p>
                                        <p onClick={() => updateSelectedTasksStatus("COMPLETED", selectedTasks)}>COMPLETED</p>
                                    </PopoverContent>
                                </Popover>
                                <Badge variant="outline" className="bg-[#3a1f22] text-white border border-red-600 px-4 py-1 hover:bg-gray-900 cursor-pointer" onClick={() => deleteSelectedTasks(selectedTasks)}>Delete</Badge>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </DndContext>
    );
};

export default TaskTable;
