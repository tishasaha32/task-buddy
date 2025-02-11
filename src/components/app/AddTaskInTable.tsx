import React, { useState } from "react";
import { auth, db } from "@/firebase/config";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { addDoc, collection } from "firebase/firestore";
import { DatePicker } from "@/components/ui/date-picker";
import { useAuthState } from "react-firebase-hooks/auth";
import { TableCell, TableRow } from "@/components/ui/table";
import { CalendarDays, CornerDownLeft, Loader2 } from "lucide-react";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

const AddTaskInTable = ({
    setAddTaskClicked,
}: {
    setAddTaskClicked: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
    const { toast } = useToast();
    const [user] = useAuthState(auth);
    const [taskTitle, setTaskTitle] = useState<string>("");
    const [taskStatus, setTaskStatus] = useState<string>("");
    const [taskCategory, setTaskCategory] = useState<string>("");
    const [taskDate, setTaskDate] = useState<Date | undefined>();
    const [create, setCreate] = useState<boolean>(false);

    const handleAddButtonClick = async () => {
        setCreate(true);
        const payload = {
            title: taskTitle,
            status: taskStatus,
            category: taskCategory,
            dueDate: taskDate,
            attachments: "",
            description: "",
            userUid: user?.uid,
        };
        const docRef = await addDoc(collection(db, "tasks"), payload);
        console.log("Task successfully saved with ID:", docRef.id);
        if (docRef.id) {
            toast({ title: "Task Created Successfully👍" });
        } else {
            toast({ variant: "destructive", title: "Task Creation Failed👎" });
        }
        setCreate(false);
        setTaskTitle("");
        setTaskStatus("");
        setTaskCategory("");
        setTaskDate(undefined);
    };

    return (
        <>
            <TableRow className="hidden sm:table-row border-b-0">
                <TableCell></TableCell>
                <TableCell>
                    <Input
                        type="text"
                        placeholder="Task Title"
                        value={taskTitle}
                        onChange={(e) => setTaskTitle(e.target.value)}
                        className="border-none"
                    />
                </TableCell>
                <TableCell>
                    <DatePicker
                        startContent={<CalendarDays />}
                        value={taskDate}
                        onChange={(date) => setTaskDate(date)}
                        placeholder="Add Date"
                        className={
                            taskDate
                                ? "bg-[#F1F1F1] w-[150px] rounded-3xl"
                                : "bg-[#F1F1F1] w-[120px] rounded-3xl"
                        }
                    />
                </TableCell>
                <TableCell>
                    <Popover>
                        <PopoverTrigger asChild>
                            <div className="flex items-center gap-2">
                                <Button
                                    variant="outline"
                                    className="rounded-full bg-[#F1F1F1] text-lg"
                                >
                                    +
                                </Button>
                                <p className="text-xs font-semibold">{taskStatus}</p>
                            </div>
                        </PopoverTrigger>
                        <PopoverContent className="w-32 text-xs flex flex-col gap-2 font-semibold cursor-pointer">
                            <p onClick={() => setTaskStatus("TODO")}>TODO</p>
                            <p onClick={() => setTaskStatus("IN_PROGRESS")}>IN PROGRESS</p>
                            <p onClick={() => setTaskStatus("COMPLETED")}>COMPLETED</p>
                        </PopoverContent>
                    </Popover>
                </TableCell>
                <TableCell>
                    <Popover>
                        <PopoverTrigger asChild>
                            <div className="flex items-center gap-2">
                                <Button
                                    variant="outline"
                                    className="rounded-full bg-[#F1F1F1] text-lg"
                                >
                                    +
                                </Button>
                                <p className="text-xs font-semibold">{taskCategory}</p>
                            </div>
                        </PopoverTrigger>
                        <PopoverContent className="w-32 text-xs flex flex-col gap-2 font-semibold cursor-pointer">
                            <p onClick={() => setTaskCategory("Work")}>WORK</p>
                            <p onClick={() => setTaskCategory("Personal")}>PERSONAL</p>
                        </PopoverContent>
                    </Popover>
                </TableCell>
                <TableCell></TableCell>
            </TableRow>
            <TableRow className="hidden sm:table-row">
                <TableCell></TableCell>
                <TableCell className="flex items-center gap-2 pt-0">
                    <Button
                        className="rounded-3xl flex items-center"
                        size="sm"
                        onClick={() => handleAddButtonClick()}
                    >
                        {create ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Adding...
                            </>
                        ) : (
                            <div className="flex gap-2 items-center">
                                Add
                                <CornerDownLeft className="mr-2 h-4 w-4" />
                            </div>
                        )}
                    </Button>
                    <Button
                        variant="ghost"
                        className="font-bold"
                        size="sm"
                        onClick={() => setAddTaskClicked(false)}
                    >
                        Cancel
                    </Button>
                </TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
            </TableRow>
        </>
    );
};

export default AddTaskInTable;
