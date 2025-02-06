import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';

type AddDialogProps = {
    openDialog: boolean;
    setOpenDialog: (open: boolean) => void;
};

const AddDialog = ({ openDialog, setOpenDialog }: AddDialogProps) => {

    const onOpenChange = (open: boolean) => {
        setOpenDialog(open);
    };

    return (
        <Dialog open={openDialog} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add Task</DialogTitle>
                    <DialogDescription>
                        Add your task here.
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}

export default AddDialog