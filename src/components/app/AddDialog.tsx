import { z } from "zod";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { TaskSchema } from "@/schemas/Task";
import { CalendarIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { FileInput } from "@/components/ui/file-input";

interface AddDialogProps {
    openDialog: boolean;
    setOpenDialog: (open: boolean) => void;
}
const AddDialog = ({ openDialog, setOpenDialog }: AddDialogProps) => {
    const onOpenChange = (open: boolean) => {
        setOpenDialog(open);
    };

    const defaultValues: z.infer<typeof TaskSchema> = {
        title: "",
        description: "",
        dueDate: new Date(),
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

    return (
        <Dialog open={openDialog} onOpenChange={onOpenChange}>
            <DialogContent className="flex flex-col items-start max-w-2xl p-0">
                <DialogHeader>
                    <DialogTitle className="text-2xl p-6 pb-2 text-left">Create Task</DialogTitle>
                </DialogHeader>
                <Separator />
                <Form {...form}>
                    <form
                        className="flex w-full flex-col items-center gap-5"
                        onSubmit={form.handleSubmit((values) => onSubmit(values))}
                    >
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
                                render={({ field }) => (
                                    <FormItem>
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
                        <div className="flex w-full justify-between gap-2 px-6 py-0">
                            <FormField
                                control={form.control}
                                name="status"
                                render={() => (
                                    <FormItem>
                                        <p className="text-gray-500 text-sm">Task Category <span>*</span></p>
                                        <div className="flex gap-2">
                                            <Badge variant="outline" className="px-4 py-2">Personal</Badge>
                                            <Badge variant="outline" className="px-4 py-2">Work</Badge>
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
                                        <p className="text-gray-500 text-sm">Due on <span>*</span></p>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <Button
                                                    variant={"outline"}
                                                    className={cn(
                                                        "w-[200px] justify-between",
                                                    )}
                                                >
                                                    <span className="text-gray-500">DD/MM/YYYY</span>
                                                    <CalendarIcon className="mr-2 h-4 w-4 text-gray-500" />
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0">
                                                <Calendar
                                                    mode="single"
                                                    initialFocus
                                                    {...field}
                                                />
                                            </PopoverContent>
                                        </Popover>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="status"
                                render={() => (
                                    <FormItem>
                                        <p className="text-gray-500 text-sm">Task Status <span>*</span></p>
                                        <Select>
                                            <SelectTrigger className="w-[180px]">
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
                        {/* <Separator className="" /> */}
                        <DialogFooter className="flex bg-[#F1F1F1] justify-end gap-2 p-4 border-t-2 border-[#d2d2d2] w-full">
                            <Button onClick={() => setOpenDialog(false)} variant="outline" className="rounded-3xl">
                                Cancel
                            </Button>
                            <Button
                                onClick={() => form.handleSubmit((values) => onSubmit(values))()}
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

export default AddDialog;
