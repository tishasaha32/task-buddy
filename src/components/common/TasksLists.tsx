import { useState } from "react";
import { CSS } from "@dnd-kit/utilities";
import DeleteDialog from "./DeleteDialog";
import { useSortable } from "@dnd-kit/sortable";
import UpdateTaskDialog from "../container/UpdateTaskDialog";
import { Checkbox } from "@/components/ui/checkbox";
import { TableRow, TableCell } from "@/components/ui/table";
import UpdateTaskDrawerMobile from "../container/UpdateTaskDrawerMobile";
import {
    Ellipsis,
    CircleCheck,
    Edit,
    Trash2,
    GripVertical,
} from "lucide-react";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase/config";
import { useToast } from "@/hooks/use-toast";

type TasksListProps = {
    task: Task;
    selectedTasks: Task[];
    setSelectedTasks: React.Dispatch<React.SetStateAction<Task[]>>
};
const TasksLists = ({ task, setSelectedTasks }: TasksListProps) => {

    const { toast } = useToast();

    const [disableDrag, setDisableDrag] = useState(false);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [openUpdateTaskDialog, setOpenUpdateTaskDialog] = useState(false);
    const [openUpdateTaskDrawerMobile, setOpenUpdateTaskDrawerMobile] = useState(false);
    const [taskStatus, setTaskStatus] = useState<"TODO" | "IN_PROGRESS" | "COMPLETED">(task?.status);

    const { attributes, listeners, setNodeRef, transform, transition } =
        useSortable({
            id: task.id,
            disabled: disableDrag,
        });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    const handleTaskStatus = (status: "TODO" | "IN_PROGRESS" | "COMPLETED") => {
        setTaskStatus(status);
        const taskRef = doc(db, "tasks", task.id);
        updateDoc(taskRef, {
            status: status as "TODO" | "IN_PROGRESS" | "COMPLETED",
        });

        if (taskRef.id) {
            toast({ title: "Task status updated successfully👍" });
        }
        else {
            toast({ variant: "destructive", title: "Task status update failed👎" });
        }
    };

    const handleSelectedTask = () => {
        setSelectedTasks((prevSelected) =>
            prevSelected.some((t) => t.id === task.id)
                ? prevSelected.filter((t) => t.id !== task.id)
                : [...prevSelected, task]
        );
    };

    return (
        <>
            {openUpdateTaskDialog && (
                <UpdateTaskDialog
                    task={task}
                    openDialog={openUpdateTaskDialog}
                    setOpenDialog={setOpenUpdateTaskDialog}
                />
            )}
            {openDeleteDialog && (
                <DeleteDialog
                    task={task}
                    openDialog={openDeleteDialog}
                    setOpenDialog={setOpenDeleteDialog}
                />
            )}
            {openUpdateTaskDrawerMobile && (
                <UpdateTaskDrawerMobile
                    task={task}
                    openDialog={openUpdateTaskDrawerMobile}
                    setOpenDialog={setOpenUpdateTaskDrawerMobile}
                />
            )}
            <TableRow
                ref={setNodeRef}
                style={style}
                {...attributes}
                {...listeners}
                className="hover:bg-gray-200 cursor-pointer"
            >
                <TableCell
                    onMouseEnter={() => setDisableDrag(true)}
                    onMouseLeave={() => setDisableDrag(false)}
                >
                    <Checkbox onClick={() => handleSelectedTask()} defaultChecked={task.status === "COMPLETED"} />
                </TableCell>
                <TableCell
                    className={
                        task.status === "COMPLETED"
                            ? "font-medium flex items-center gap-2 line-through"
                            : "font-medium flex items-center gap-2"
                    }
                >
                    <GripVertical
                        size={16}
                        className="hidden md:block text-gray-500 cursor-grab"
                        {...listeners}
                    />
                    <CircleCheck
                        size={16}
                        className={
                            task.status === "COMPLETED" ? "text-green-500" : "text-gray-500"
                        }
                    />
                    {task.title}
                </TableCell>
                <TableCell className="hidden sm:table-cell">
                    {task?.dueDate && task.dueDate.toDateString()}
                </TableCell>
                <TableCell
                    className="hidden sm:table-cell"
                    onMouseEnter={() => setDisableDrag(true)}
                    onMouseLeave={() => setDisableDrag(false)}
                >
                    <Popover>
                        <PopoverTrigger asChild><span className="cursor-pointer bg-[#DDDADD] py-1 px-2 rounded-lg">{taskStatus.split("_").join(" ")}</span></PopoverTrigger>
                        <PopoverContent className="w-32 text-xs flex flex-col gap-2 font-semibold cursor-pointer">
                            <p onClick={() => handleTaskStatus("TODO")}>TODO</p>
                            <p onClick={() => handleTaskStatus("IN_PROGRESS")}>IN PROGRESS</p>
                            <p onClick={() => handleTaskStatus("COMPLETED")}>COMPLETED</p>
                        </PopoverContent>
                    </Popover>
                </TableCell>
                <TableCell className="hidden sm:table-cell">{task?.category}</TableCell>
                <TableCell className="hidden md:table-cell">
                    <Popover>
                        <PopoverTrigger asChild>
                            <Ellipsis
                                size={16}
                                onMouseEnter={() => setDisableDrag(true)}
                                onMouseLeave={() => setDisableDrag(false)}
                            />
                        </PopoverTrigger>
                        <PopoverContent className="w-32 flex flex-col gap-2 p-4 cursor-pointer">
                            <div
                                className="flex items-center gap-2 font-bold"
                                onClick={() => setOpenUpdateTaskDialog(true)}
                                onMouseEnter={() => setDisableDrag(true)}
                                onMouseLeave={() => setDisableDrag(false)}
                            >
                                <Edit size={16} />
                                Edit
                            </div>
                            <div
                                className="flex items-center gap-2 text-destructive font-bold"
                                onClick={() => setOpenDeleteDialog(true)}
                                onMouseEnter={() => setDisableDrag(true)}
                                onMouseLeave={() => setDisableDrag(false)}
                            >
                                <Trash2 size={16} />
                                Delete
                            </div>
                        </PopoverContent>
                    </Popover>
                </TableCell>
                <TableCell className="md:hidden">
                    <Popover>
                        <PopoverTrigger asChild>
                            <Ellipsis
                                size={16}
                                onMouseEnter={() => setDisableDrag(true)}
                                onMouseLeave={() => setDisableDrag(false)}
                            />
                        </PopoverTrigger>
                        <PopoverContent className="w-32 flex flex-col gap-2 p-4 cursor-pointer">
                            <div
                                className="flex items-center gap-2 font-bold"
                                onClick={() => setOpenUpdateTaskDrawerMobile(true)}
                                onMouseEnter={() => setDisableDrag(true)}
                                onMouseLeave={() => setDisableDrag(false)}
                            >
                                <Edit size={16} />
                                Edit
                            </div>
                            <div
                                className="flex items-center gap-2 text-destructive font-bold"
                                onClick={() => setOpenDeleteDialog(true)}
                                onMouseEnter={() => setDisableDrag(true)}
                                onMouseLeave={() => setDisableDrag(false)}
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
