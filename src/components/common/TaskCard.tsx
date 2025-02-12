import { useState } from "react";
import DeleteDialog from "./DeleteDialog";
import { useDrag, useDrop } from "react-dnd";
import { UpdateTaskDialog } from "../container";
import { Edit, Ellipsis, Trash2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ItemType } from "@/types/dndType";

type TaskCardProps = {
    task: Task;
    index: number;
    moveTaskWithinColumn: (dragIndex: number, hoverIndex: number, status: string) => void;
    status: string;
};
const TaskCard = ({ task, index, moveTaskWithinColumn, status }: TaskCardProps) => {
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [{ isDragging }, drag] = useDrag({
        type: ItemType,
        item: { id: task.id, index },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    });

    const [, drop] = useDrop({
        accept: ItemType,
        hover: (draggedItem: { id: number; index: number }) => {
            if (draggedItem.index !== index) {
                moveTaskWithinColumn(draggedItem.index, index, status);
                draggedItem.index = index;
            }
        },
    });

    const dragDropRef = (node: HTMLDivElement | null) => {
        if (node) {
            drag(drop(node));
        }
    };


    return (
        <>
            {openEditDialog && (
                < UpdateTaskDialog
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
                className={`m-1 min-h-[14vh] flex flex-col justify-between cursor-grab ${isDragging ? "opacity-50" : ""}`}
                key={task.id}
                // ref={(node) => drag(drop(node))}
                ref={dragDropRef}
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
                                >
                                    <Ellipsis size={16} />
                                </div>
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
                    </div>
                </CardHeader>
                <CardContent className="flex items-center justify-between w-full gap-2 p-2">
                    <p className="text-xs text-gray-500">{task.category}</p>
                    <p className="text-xs text-gray-500">
                        {task.dueDate && task.dueDate.toDateString()}
                    </p>
                </CardContent>
            </Card>
        </>
    );
};

export default TaskCard;
