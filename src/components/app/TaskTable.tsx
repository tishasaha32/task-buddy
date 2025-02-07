import { tasks } from "@/data";
import NoTasks from "./NoTasks";
import { useState } from "react";
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

const TaskTable = () => {

    const [showTodo, setShowTodo] = useState<boolean>(true);
    const [showCompleted, setShowCompleted] = useState<boolean>(true);
    const [showInProgress, setShowInProgress] = useState<boolean>(true);
    const [addTaskClicked, setAddTaskClicked] = useState<boolean>(false);

    const todoTasks = tasks.filter((task) => task.status === "TODO");
    const inProgressTasks = tasks.filter((task) => task.status === "IN_PROGRESS");
    const completedTasks = tasks.filter((task) => task.status === "COMPLETED");

    return (
        <Table className="w-full">
            <TableHeader>
                <TableRow>
                    <TableHead className="hidden sm:table-cell"></TableHead>
                    <TableHead className="hidden sm:table-cell text-bold text-gray-600">Title</TableHead>
                    <TableHead className="hidden sm:table-cell text-bold text-gray-600">
                        DueOn
                    </TableHead>
                    <TableHead className="hidden sm:table-cell text-bold text-gray-600">
                        Status
                    </TableHead>
                    <TableHead className="hidden sm:table-cell text-bold text-gray-600">
                        Category
                    </TableHead>
                    <TableHead className="sm:table-cell hidden">
                    </TableHead>
                </TableRow>
            </TableHeader>

            <TableBody className="bg-[#F1F1F1]">
                {/* Todo Section */}
                <TableRow className="cursor-pointer" onClick={() => setShowTodo(!showTodo)}>
                    <TableCell
                        colSpan={6}
                        className="bg-[rgb(250,195,255)] font-semibold p-2 text-left rounded-t-md"
                    >
                        Todo ({todoTasks?.length})
                        {showTodo ? (<ChevronUp size={16} className="float-right" />) : (<ChevronUp size={16} className="float-right transform rotate-180" />)}
                    </TableCell>
                </TableRow>
                <TableRow className="hidden sm:table-row">
                    <TableCell colSpan={6} onClick={() => setAddTaskClicked(!addTaskClicked)} className="cursor-pointer">+ Add Task </TableCell>
                </TableRow>
                {addTaskClicked && (<AddTaskInTable setAddTaskClicked={setAddTaskClicked} />)}
                {showTodo && todoTasks && todoTasks?.length > 0 && (
                    todoTasks.map((task) => (
                        <TasksLists key={task.uuid} task={task} />
                    ))
                )}
                {!showTodo && todoTasks?.length === 0 && (
                    <NoTasks status="todo" />
                )}
                <TableRow className="hidden sm:table-row bg-background h-8">
                </TableRow>

                {/* In Progress Section */}
                <TableRow className="cursor-pointer" onClick={() => setShowInProgress(!showInProgress)}>
                    <TableCell
                        colSpan={6}
                        className="bg-[rgb(173,216,230)] font-semibold p-2 text-left rounded-t-md"
                    >
                        In Progress ({inProgressTasks?.length})
                        {showInProgress ? (<ChevronUp size={16} className="float-right" />) : (<ChevronUp size={16} className="float-right transform rotate-180" />)}
                    </TableCell>
                </TableRow>
                {showInProgress && inProgressTasks && inProgressTasks?.length > 0 && (
                    inProgressTasks.map((task) => (
                        <TasksLists key={task.uuid} task={task} />
                    ))
                )}
                {!showInProgress && inProgressTasks?.length === 0 && (
                    <NoTasks status="in progress" />
                )}
                <TableRow className="hidden sm:table-row bg-background h-8">
                </TableRow>

                {/* Completed Section */}
                <TableRow className="cursor-pointer" onClick={() => setShowCompleted(!showCompleted)}>
                    <TableCell
                        colSpan={6}
                        className="bg-[rgb(173,255,173)] font-semibold p-2 text-left rounded-t-md"
                    >
                        Completed ({completedTasks?.length})
                        {showCompleted ? (<ChevronUp size={16} className="float-right" />) : (<ChevronUp size={16} className="float-right transform rotate-180" />)}
                    </TableCell>
                </TableRow>
                {showCompleted && completedTasks && completedTasks?.length > 0 && (
                    completedTasks.map((task) => (
                        <TasksLists key={task.uuid} task={task} />
                    ))
                )}
                {!showCompleted && completedTasks?.length === 0 && (
                    <NoTasks status="completed" />
                )}
                <TableRow className="hidden sm:table-row bg-background h-8">
                </TableRow>
            </TableBody>
        </Table>
    );
};

export default TaskTable;
