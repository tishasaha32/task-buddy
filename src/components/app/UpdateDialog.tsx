import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';

type UpdateDialogProps = {
    task: Task;
    openDialog: boolean;
    setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
};

const UpdateDialog = ({ task, openDialog, setOpenDialog }: UpdateDialogProps) => {
    return (
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Update Task</DialogTitle>
                    <DialogDescription>Update your task {task.title} here.
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>

    )
}

export default UpdateDialog