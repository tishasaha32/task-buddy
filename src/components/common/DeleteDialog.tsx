import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { useTaskStore } from "@/store/taskStore";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

type DeletDialogProps = {
    task: Task;
    openDialog: boolean;
    setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
};

const DeleteDialog = ({ task, openDialog, setOpenDialog }: DeletDialogProps) => {

    const { deleteTask } = useTaskStore((state) => state);
    const { toast } = useToast();
    const [deleteTaskState, setDeleteTaskState] = useState<boolean>(false);

    const handleDeleteTask = async (taskId: string): Promise<void> => {
        if (!taskId) return;
        deleteTask({ taskId, toast, setOpenDialog, setDeleteTaskState });
    };

    return (
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
            <DialogContent className="w-[350px] md:w-[400px] rounded-md">
                <DialogHeader>
                    <DialogTitle className="text-left text-sm md:text-md">
                        Are you sure you want to delete the task?
                    </DialogTitle>
                </DialogHeader>
                <div className="flex justify-end gap-2 md:mt-4">
                    <Button onClick={() => setOpenDialog(false)} variant="outline">
                        Cancel
                    </Button>
                    <Button onClick={() => handleDeleteTask(task?.id)} variant="destructive">
                        {deleteTaskState ? "Deleting..." : "Delete"}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default DeleteDialog;
