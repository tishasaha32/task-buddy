import { useState } from "react";
import { CSS } from "@dnd-kit/utilities";
import UpdateDialog from "./UpdateTaskDialog";
import DeleteDialog from "./DeleteDialog";
import { useSortable } from "@dnd-kit/sortable";
import { Edit, Ellipsis, Trash2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

type TaskCardProps = {
    task: Task;
};

const TaskCard = ({ task }: TaskCardProps) => {
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [disableDrag, setDisableDrag] = useState(false); // Track drag state

    // Make the task draggable
    const { attributes, listeners, setNodeRef, transform, transition } =
        useSortable({
            id: task.uuid,
            disabled: disableDrag, // Disable drag dynamically
        });

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
            <Card
                ref={setNodeRef}
                style={{
                    transform: CSS.Transform.toString(transform),
                    transition,
                }}
                className="m-1 min-h-[14vh] flex flex-col justify-between cursor-grab"
                key={task.uuid}
                {...attributes}
                {...(disableDrag ? {} : listeners)} // Disable listeners if disableDrag is true
            >
                <CardHeader className="p-2">
                    <div className="flex items-center justify-between w-full">
                        <CardTitle
                            className={
                                task.status === "COMPLETED" ? "text-md line-through" : "text-md"
                            }
                        >
                            {task.title}
                        </CardTitle>
                        <Popover>
                            <PopoverTrigger asChild>
                                <div
                                    className="cursor-pointer"
                                    onMouseEnter={() => setDisableDrag(true)}
                                    onMouseLeave={() => setDisableDrag(false)}
                                    onClick={() => console.log("clicked")}
                                >
                                    <Ellipsis size={16} />
                                </div>
                            </PopoverTrigger>
                            <PopoverContent className="w-32 flex flex-col gap-2 p-4 cursor-pointer">
                                <div
                                    className="flex items-center gap-2 font-bold"
                                    onClick={() => setOpenEditDialog(true)}
                                    onMouseEnter={() => setDisableDrag(true)}
                                    onMouseLeave={() => setDisableDrag(false)}
                                >
                                    <Edit size={16} />
                                    Edit
                                </div>
                                <div
                                    className="flex items-center gap-2 text-destructive font-bold"
                                    onClick={() => setOpenDeleteDialog(true)}
                                    onMouseEnter={() => setDisableDrag(true)} // Disable drag on hover
                                    onMouseLeave={() => setDisableDrag(false)}
                                >
                                    <Trash2 size={16} />
                                    Delete
                                </div>
                            </PopoverContent>
                        </Popover>
                    </div>
                </CardHeader>
                <CardContent className="flex items-center justify-between w-full gap-2 p-2">
                    <p className="text-xs text-gray-500">{task.category}</p>
                    <p className="text-xs text-gray-500">
                        {new Date(task.dueDate).toDateString()}
                    </p>
                </CardContent>
            </Card>
        </>
    );
};

export default TaskCard;
