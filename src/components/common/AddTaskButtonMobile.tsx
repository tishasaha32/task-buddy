import { useState } from "react";
import { Button } from "@/components/ui/button";
import { AddTaskDrawerMobile } from "../container"

const AddTaskButtonMobile = () => {
    const [openAddTaskDrawerMobile, setOpenAddTaskDrawerMobile] = useState<boolean>(false);

    return (
        <>
            {openAddTaskDrawerMobile && (
                <AddTaskDrawerMobile
                    openDialog={openAddTaskDrawerMobile}
                    setOpenDialog={setOpenAddTaskDrawerMobile}
                />
            )}
            <div className="flex justify-end pr-4 md:p-0">
                <Button className="md:hidden block rounded-3xl w-32" onClick={() => setOpenAddTaskDrawerMobile(true)}>Add Task</Button>
            </div>
        </>
    )
}

export default AddTaskButtonMobile