import { useState } from "react";
import { tasks as initialTasks } from "@/data";
import NoTasks from "./NoTasks";
import TasksLists from "./TasksLists";
import AddTaskInTable from "./AddTaskInTable";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { ChevronUp } from "lucide-react";

import {
    DndContext,
    closestCorners,
    DragEndEvent,
} from "@dnd-kit/core";
import {
    SortableContext,
    arrayMove,
    verticalListSortingStrategy
} from "@dnd-kit/sortable";

const TaskTable = () => {
    const [tasks, setTasks] = useState(initialTasks);
    const [showTodo, setShowTodo] = useState(true);
    const [showCompleted, setShowCompleted] = useState(true);
    const [showInProgress, setShowInProgress] = useState(true);
    const [addTaskClicked, setAddTaskClicked] = useState(false);

    const updateTaskOrder = (event: DragEndEvent) => {
        const { active, over } = event;
        if (!over) return;

        setTasks((prevTasks) => {
            const oldIndex = prevTasks.findIndex((t) => t.uuid === active.id);
            const newIndex = prevTasks.findIndex((t) => t.uuid === over.id);

            return arrayMove(prevTasks, oldIndex, newIndex);
        });
    };

    const groupedTasks = {
        TODO: tasks.filter((task) => task.status === "TODO"),
        IN_PROGRESS: tasks.filter((task) => task.status === "IN_PROGRESS"),
        COMPLETED: tasks.filter((task) => task.status === "COMPLETED"),
    };

    return (
        <DndContext collisionDetection={closestCorners} onDragEnd={updateTaskOrder}>
            <div className="p-4 pt-0 md:p-0">
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
                            <>
                                <TableRow key={status} className="cursor-pointer" onClick={() => {
                                    if (status === "TODO") setShowTodo(!showTodo);
                                    if (status === "IN_PROGRESS") setShowInProgress(!showInProgress);
                                    if (status === "COMPLETED") setShowCompleted(!showCompleted);
                                }}>
                                    <TableCell colSpan={6} className={`bg-${status === "TODO" ? "[rgb(250,195,255)]" : status === "IN_PROGRESS" ? "[rgb(173,216,230)]" : "[rgb(173,255,173)]"} font-semibold p-2 text-left rounded-t-md`}>
                                        {status} ({taskList.length})
                                        <ChevronUp size={16} className={`float-right transform ${((status === "TODO" && showTodo) || (status === "IN_PROGRESS" && showInProgress) || (status === "COMPLETED" && showCompleted)) ? "" : "rotate-180"}`} />
                                    </TableCell>
                                </TableRow>

                                <TableRow className="hidden sm:table-row">
                                    <TableCell colSpan={6} onClick={() => setAddTaskClicked(!addTaskClicked)} className="cursor-pointer">+ Add Task </TableCell>
                                </TableRow>
                                {addTaskClicked && <AddTaskInTable setAddTaskClicked={setAddTaskClicked} />}

                                <SortableContext items={taskList.map((t) => t.uuid)} strategy={verticalListSortingStrategy}>
                                    {(status === "TODO" && showTodo) || (status === "IN_PROGRESS" && showInProgress) || (status === "COMPLETED" && showCompleted)
                                        ? taskList.map((task) => (
                                            <TasksLists key={task.uuid} task={task} />
                                        ))
                                        : null}
                                </SortableContext>

                                <TableRow className="bg-background">
                                    <TableCell colSpan={6}> </TableCell>
                                </TableRow>

                                {taskList.length === 0 && <NoTasks status={status.toLowerCase()} />}
                            </>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </DndContext>
    );
};

export default TaskTable;
