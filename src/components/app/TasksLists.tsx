import { useState } from "react";
import UpdateDialog from "./UpdateDialog";
import DeleteDialog from "./DeleteDialog";
import { Checkbox } from "@/components/ui/checkbox";
import { TableRow, TableCell } from "@/components/ui/table";
import { Ellipsis, CircleCheck, Edit, Trash2, GripVertical } from "lucide-react";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

type TasksListProps = {
    task: Task;
};
const TasksLists = ({ task }: TasksListProps) => {
    const [openEditDialog, setOpenEditDialog] = useState<boolean>(false);
    const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false);

    return (
        <>
            {openEditDialog && (
                <UpdateDialog
                    task={task}
                    openDialog={openEditDialog}
                    setOpenDialog={setOpenEditDialog}
                />
            )}
            {openDeleteDialog && (
                <DeleteDialog
                    task={task}
                    openDialog={openDeleteDialog}
                    setOpenDialog={setOpenDeleteDialog}
                />
            )}
            <TableRow key={task.uuid} className="hover:bg-gray-200 cursor-pointer">
                <TableCell className="hidden sm:table-cell">
                    <Checkbox defaultChecked={task.status === "COMPLETED"} />
                </TableCell>
                <TableCell
                    className={
                        task.status === "COMPLETED"
                            ? "font-medium flex items-center gap-2 line-through"
                            : "font-medium flex items-center gap-2"
                    }
                >
                    <GripVertical size={16} className="hidden md:block text-gray-500" />
                    <CircleCheck
                        size={16}
                        className={
                            task.status === "COMPLETED" ? "text-green-500" : "text-gray-500"
                        }
                    />
                    {task.title}
                </TableCell>
                <TableCell className="hidden sm:table-cell">
                    {new Date(task.dueDate).toDateString()}
                </TableCell>
                <TableCell className="hidden sm:table-cell">{task?.status}</TableCell>
                <TableCell className="hidden sm:table-cell">{task?.category}</TableCell>
                <TableCell className="sm:table-cell hidden">
                    <Popover>
                        <PopoverTrigger asChild>
                            <Ellipsis size={16} />
                        </PopoverTrigger>
                        <PopoverContent className="w-32 flex flex-col gap-2 p-4 cursor-pointer">
                            <div
                                className="flex items-center gap-2 font-bold"
                                onClick={() => setOpenEditDialog(true)}
                            >
                                <Edit size={16} />
                                Edit
                            </div>
                            <div
                                className="flex items-center gap-2 text-destructive font-bold"
                                onClick={() => setOpenDeleteDialog(true)}
                            >
                                <Trash2 size={16} />
                                Delete
                            </div>
                        </PopoverContent>
                    </Popover>
                </TableCell>
            </TableRow>
        </>
    );
};

export default TasksLists;
