import { z } from "zod";
// import { useState } from "react";
// import ReactQuill from 'react-quill';
import "react-quill/dist/quill.snow.css";
import { useForm } from "react-hook-form";
import { TaskSchema } from "@/schemas/Task";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { DatePicker } from "../ui/date-picker";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { FileInput } from "@/components/ui/file-input";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { format } from "date-fns";
import { ScrollArea } from "@/components/ui/scroll-area";

interface UpdateDialogProps {
    task: Task;
    openDialog: boolean;
    setOpenDialog: (open: boolean) => void;
}
const UpdateDialog = ({
    task,
    openDialog,
    setOpenDialog,
}: UpdateDialogProps) => {
    // const [value, setValue] = useState<string>('');
    const onOpenChange = (open: boolean) => {
        setOpenDialog(open);
    };

    const defaultValues: z.infer<typeof TaskSchema> = {
        title: task?.title || "",
        description: task?.description || "",
        dueDate: task?.dueDate || null,
        status: task?.status || "",
        category: task?.category || "",
        attachments: task?.attachments,
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

    return (
        <Dialog open={openDialog} onOpenChange={onOpenChange}>
            <DialogContent className="flex flex-col items-start max-w-5xl p-0">
                <DialogHeader>
                    <DialogTitle className="text-2xl p-6 pb-2 text-left">
                        Update Task
                    </DialogTitle>
                </DialogHeader>
                <Separator />
                <div className="flex justify-center w-full">
                    <Form {...form}>
                        <form
                            className="flex flex-col w-full h-full"
                            onSubmit={form.handleSubmit((values) => onSubmit(values))}
                        >
                            <div className="flex w-full h-full gap-2">
                                <ScrollArea className="h-80 w-2/3">
                                    <div className="flex w-full flex-col gap-3 px-6 py-0">
                                        <FormField
                                            control={form.control}
                                            name="title"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <Input
                                                        type="text"
                                                        placeholder="Task Title"
                                                        {...field}
                                                    />
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="description"
                                            render={({ field }) => (
                                                <FormItem>
                                                    {/* <ReactQuill theme="snow" value={value} onChange={setValue} /> */}
                                                    <Input
                                                        type="text"
                                                        placeholder="Task Description"
                                                        {...field}
                                                    />
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <div className="flex w-full justify-between mt-4 gap-2 px-6 py-0">
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
                                                                task?.category === "PERSONAL"
                                                                    ? "default"
                                                                    : "outline"
                                                            }
                                                            className="px-4 py-2"
                                                        >
                                                            Personal
                                                        </Badge>
                                                        <Badge
                                                            variant={
                                                                task?.category === "WORK"
                                                                    ? "default"
                                                                    : "outline"
                                                            }
                                                            className="px-4 py-2"
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
                                                        value={task?.dueDate || null}
                                                        onChange={field.onChange}
                                                        placeholder="Select a date"
                                                        className="w-[200px]"
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
                                                    <Select
                                                        onValueChange={field.onChange}
                                                        value={field.value}
                                                    >
                                                        <SelectTrigger className="w-[200px]">
                                                            <SelectValue placeholder="Choose" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="TODO">TODO</SelectItem>
                                                            <SelectItem value="IN_PROGRESS">
                                                                IN PROGRESS
                                                            </SelectItem>
                                                            <SelectItem value="COMPLETED">
                                                                COMPLETED
                                                            </SelectItem>
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
                                <div className="w-1/3 bg-[#F1F1F1]">
                                    <p className="font-bold text-lg p-2 pt-0 text-left bg-background">
                                        Activity
                                    </p>
                                    <Separator />
                                    <div className="flex flex-col gap-2 p-2 w-full">
                                        <div className="text-gray-500 text-sm flex justify-between items-center">
                                            <p>You created this task</p>
                                            <p>{format(task?.createdAt, "PPP")}</p>
                                        </div>
                                        {task?.updatedAt && (
                                            <div className="text-gray-500 text-sm flex justify-between items-center">
                                                <p>You updated this task</p>
                                                <p>{format(task?.updatedAt, "PPP")}</p>
                                            </div>
                                        )}
                                        {task?.fileUpdatedAt && (
                                            <div className="text-gray-500 text-sm flex justify-between items-center">
                                                <p>You uploaded file</p>
                                                <p>{format(task?.fileUpdatedAt, "PPP")}</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <DialogFooter className="flex bg-[#F1F1F1] justify-end gap-2 p-4 border-t-2 border-[#d2d2d2] w-full">
                                <Button
                                    onClick={() => setOpenDialog(false)}
                                    variant="outline"
                                    className="rounded-3xl"
                                >
                                    Cancel
                                </Button>
                                <Button
                                    onClick={() =>
                                        form.handleSubmit((values) => onSubmit(values))()
                                    }
                                    className="rounded-3xl"
                                >
                                    Update
                                </Button>
                            </DialogFooter>
                        </form>
                    </Form>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default UpdateDialog;
