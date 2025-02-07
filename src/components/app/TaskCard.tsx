import { useState } from 'react';
import UpdateDialog from './UpdateDialog';
import DeleteDialog from './DeleteDialog';
import { Edit, Ellipsis, Trash2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

type TaskCardProps = {
    task: Task
}

const TaskCard = ({ task }: TaskCardProps) => {
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
            <Card className="m-1 min-h-[14vh] flex flex-col justify-between" key={task.uuid}>
                <CardHeader className="p-2">
                    <div className="flex items-center justify-between w-full">
                        <CardTitle className={task?.status === "COMPLETED" ? "text-md line-through" : "text-md"}>{task?.title}</CardTitle>
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
                    </div>
                </CardHeader>
                <CardContent className="flex items-center justify-between w-full gap-2 p-2">
                    <p className="text-xs text-gray-500">{task?.category}</p>
                    <p className="text-xs text-gray-500">{new Date(task?.dueDate).toDateString()}</p>
                </CardContent>
            </Card>
        </>
    )
}

export default TaskCard