import { useState } from "react";
import { AddTaskDialog } from "../container";
import { Button } from "@/components//ui/button"

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