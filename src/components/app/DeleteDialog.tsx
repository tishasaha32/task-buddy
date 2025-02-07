import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

type DeletDialogProps = {
    task: Task;
    openDialog: boolean;
    setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
};

const DeleteDialog = ({
    task,
    openDialog,
    setOpenDialog,
}: DeletDialogProps) => {
    console.log(task?.title);
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
                    <Button onClick={() => console.log("delete")} variant="destructive">
                        Delete
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default DeleteDialog;
