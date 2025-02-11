import { db } from "@/firebase/config";
import { Button } from "@/components/ui/button";
import { deleteDoc, doc } from "firebase/firestore";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

type DeletDialogProps = {
    task: Task;
    openDialog: boolean;
    setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
};

const DeleteDialog = ({ task, openDialog, setOpenDialog }: DeletDialogProps) => {

    const { toast } = useToast();
    const [deleteTask, setDeleteTask] = useState<boolean>(false);

    const handleDeleteTask = async (taskId: string): Promise<void> => {
        if (!taskId) return;
        setDeleteTask(true);
        try {
            await deleteDoc(doc(db, "tasks", taskId));
            toast({ title: "Task deleted successfully👍" });
        } catch (error) {
            console.error("Error deleting task:", error);
            toast({ variant: "destructive", title: "Task deletion failed👎" });
        }
        setOpenDialog(false);
        setDeleteTask(false);
    };

    return (
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Are you sure you want to delete the task?
                    </DialogTitle>
                </DialogHeader>
                <div className="flex justify-end gap-2 mt-4">
                    <Button onClick={() => setOpenDialog(false)} variant="outline">
                        Cancel
                    </Button>
                    <Button onClick={() => handleDeleteTask(task?.id)} variant="destructive">
                        {deleteTask ? "Deleting..." : "Delete"}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default DeleteDialog;
