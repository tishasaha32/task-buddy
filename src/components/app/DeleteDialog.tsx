import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';

type DeletDialogProps = {
    task: Task
    openDialog: boolean
    setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>
}

const DeleteDialog = ({ task, openDialog, setOpenDialog }: DeletDialogProps) => {
    return (
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Delete Task</DialogTitle>
                    <DialogDescription>
                        Delete your task {task.title} here.
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}

export default DeleteDialog