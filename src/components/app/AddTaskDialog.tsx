import { z } from "zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { TaskSchema } from "@/schemas/Task";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { FileInput } from "@/components/ui/file-input";
import { DatePicker } from "@/components/ui/date-picker";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { CalendarDays } from "lucide-react";
import { ScrollArea } from "../ui/scroll-area";

interface AddTaskDialogProps {
    openDialog: boolean;
    setOpenDialog: (open: boolean) => void;
}
const AddTaskDialog = ({ openDialog, setOpenDialog }: AddTaskDialogProps) => {
    const [category, setCategory] = useState<string>("");
    const [value, setValue] = useState("");

    console.log(value);

    const onOpenChange = (open: boolean) => {
        setOpenDialog(open);
    };

    const defaultValues: z.infer<typeof TaskSchema> = {
        title: "",
        description: "",
        dueDate: null,
        status: "",
        category: "",
        attachments: [],
    };

    const form = useForm<z.infer<typeof TaskSchema>>({
        defaultValues: defaultValues,
        mode: "onTouched",
        resolver: zodResolver(TaskSchema),
    });

    // Submit the form data and set it in local storage
    const onSubmit = (values: z.infer<typeof TaskSchema>) => {
        console.log(values);
    };

    const handleCategory = (category: string) => {
        setCategory(category);
        form.setValue("category", category);
    };
    console.log(form?.getValues());
    return (
        <Dialog open={openDialog} onOpenChange={onOpenChange}>
            <DialogContent className="flex flex-col items-start max-w-2xl p-0">
                <DialogHeader>
                    <DialogTitle className="text-2xl p-6 pb-2 text-left">
                        Create Task
                    </DialogTitle>
                </DialogHeader>
                <Separator />
                <Form {...form}>
                    <form
                        className="flex w-full flex-col items-center gap-5"
                        onSubmit={form.handleSubmit((values) => onSubmit(values))}
                    >
                        <ScrollArea className="h-96 w-full">
                            <div className="flex w-full flex-col gap-3 px-6 py-0">
                                <FormField
                                    control={form.control}
                                    name="title"
                                    render={({ field }) => (
                                        <FormItem>
                                            <Input type="text" placeholder="Task Title" {...field} />
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="description"
                                    render={() => (
                                        <FormItem>
                                            <div className="h-40">
                                                <ReactQuill
                                                    theme="snow"
                                                    value={value}
                                                    onChange={setValue}
                                                    className="h-28"
                                                />
                                            </div>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="flex flex-row w-full justify-between gap-2 px-6 py-0">
                                <FormField
                                    control={form.control}
                                    name="status"
                                    render={() => (
                                        <FormItem>
                                            <p className="text-gray-500 text-sm">
                                                Task Category <span>*</span>
                                            </p>
                                            <div className="flex gap-2">
                                                <Badge
                                                    variant={
                                                        category === "Personal" ? "default" : "outline"
                                                    }
                                                    onClick={() => handleCategory("Personal")}
                                                    className="px-4 py-2 cursor-pointer"
                                                >
                                                    Personal
                                                </Badge>
                                                <Badge
                                                    variant={category === "Work" ? "default" : "outline"}
                                                    onClick={() => handleCategory("Work")}
                                                    className="px-4 py-2 cursor-pointer"
                                                >
                                                    Work
                                                </Badge>
                                            </div>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="dueDate"
                                    render={({ field }) => (
                                        <FormItem>
                                            <p className="text-gray-500 text-sm">
                                                Due on <span>*</span>
                                            </p>
                                            <DatePicker
                                                endContent={<CalendarDays />}
                                                value={field.value ? new Date(field.value) : undefined}
                                                onChange={field.onChange}
                                                placeholder="DD/MM/YYYY"
                                                className="w-[180px]"
                                            />
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="status"
                                    render={({ field }) => (
                                        <FormItem>
                                            <p className="text-gray-500 text-sm">
                                                Task Status <span>*</span>
                                            </p>
                                            <Select onValueChange={field.onChange} value={field.value}>
                                                <SelectTrigger className="w-[140px]">
                                                    <SelectValue placeholder="Choose" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="TODO">TODO</SelectItem>
                                                    <SelectItem value="IN_PROGRESS">IN PROGRESS</SelectItem>
                                                    <SelectItem value="COMPLETED">COMPLETED</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="grid grid-cols-1 gap-3 w-full mb-20 px-6 py-0">
                                <FormField
                                    control={form.control}
                                    name="attachments"
                                    render={({ field }) => (
                                        <FormItem>
                                            <p className="text-gray-500 text-sm">Attachments</p>
                                            <FileInput maxFiles={1} {...field} />
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </ScrollArea>
                        <DialogFooter className="flex bg-[#F1F1F1] justify-end gap-2 p-4 border-t-2 border-[#d2d2d2] w-full">
                            <Button
                                onClick={() => setOpenDialog(false)}
                                variant="outline"
                                className="rounded-3xl"
                            >
                                Cancel
                            </Button>
                            <Button
                                disabled={
                                    form?.getValues().title === "" ||
                                    form?.getValues().status === "" ||
                                    form?.getValues().category === "" ||
                                    form?.getValues().dueDate === null
                                }
                                onClick={() =>
                                    form.handleSubmit((values) => onSubmit(values))()
                                }
                                className="rounded-3xl"
                            >
                                Create
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};

export default AddTaskDialog;
