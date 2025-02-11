import { useState } from "react";
import { Button } from "../ui/button"
import AddTaskDialog from "../container/AddTaskDialog";

const AddTaskButton = () => {
    const [openAddTaskDialog, setOpenAddTaskDialog] = useState<boolean>(false);

    return (
        <>
            {openAddTaskDialog && (
                <AddTaskDialog
                    openDialog={openAddTaskDialog}
                    setOpenDialog={setOpenAddTaskDialog}
                />
            )}
            <Button
                className="hidden md:block rounded-3xl"
                onClick={() => setOpenAddTaskDialog(true)}
            >
                Add Task
            </Button>
        </>
    )
}

export default AddTaskButton