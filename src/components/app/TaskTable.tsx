import { tasks } from "@/data";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import TasksLists from "./TasksLists";
import NoTasks from "./NoTasks";

const TaskTable = () => {
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
                <TableRow>
                    <TableCell
                        colSpan={6}
                        className="bg-[rgb(250,195,255)] font-semibold p-2 text-left rounded-t-md"
                    >
                        Todo ({todoTasks?.length})
                    </TableCell>
                </TableRow>
                {todoTasks && todoTasks?.length > 0 ? (
                    todoTasks.map((task) => (
                        <TasksLists key={task.uuid} task={task} />
                    ))
                ) : (
                    <NoTasks status="todo" />
                )}

                {/* In Progress Section */}
                <TableRow>
                    <TableCell
                        colSpan={6}
                        className="bg-[rgb(173,216,230)] font-semibold p-2 text-left rounded-t-md"
                    >
                        In Progress ({inProgressTasks?.length})
                    </TableCell>
                </TableRow>
                {inProgressTasks && inProgressTasks?.length > 0 ? (
                    inProgressTasks.map((task) => (
                        <TasksLists key={task.uuid} task={task} />
                    ))
                ) : (
                    <NoTasks status="in progress" />
                )}

                {/* Completed Section */}
                <TableRow>
                    <TableCell
                        colSpan={6}
                        className="bg-[rgb(173,255,173)] font-semibold p-2 text-left rounded-t-md"
                    >
                        Completed ({completedTasks?.length})
                    </TableCell>
                </TableRow>
                {completedTasks && completedTasks?.length > 0 ? (
                    completedTasks.map((task) => (
                        <TasksLists key={task.uuid} task={task} />
                    ))
                ) : (
                    <NoTasks status="completed" />
                )}
            </TableBody>
        </Table>
    );
};

export default TaskTable;
