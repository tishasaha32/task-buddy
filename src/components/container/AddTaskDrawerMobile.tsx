import { z } from "zod";
import { useState } from "react";
import ReactQuill from 'react-quill-new';
import { useForm } from "react-hook-form";
import { CalendarDays } from "lucide-react";
import { TaskSchema } from "@/schemas/Task";
import 'react-quill-new/dist/quill.snow.css';
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "../ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { FileInput } from "@/components/ui/file-input";
import { DatePicker } from "@/components/ui/date-picker";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Drawer, DrawerContent, DrawerFooter, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import { auth } from "@/firebase/config";
import { useToast } from "@/hooks/use-toast";
import { useAuthState } from "react-firebase-hooks/auth";
import { useTaskStore } from "@/store/taskStore";

interface AddTaskDrawerMobileProps {
    openDialog: boolean;
    setOpenDialog: (open: boolean) => void;
}
const AddTaskDrawerMobile = ({ openDialog, setOpenDialog }: AddTaskDrawerMobileProps) => {
    const { addTask } = useTaskStore((state) => state);

    const { toast } = useToast();
    const [user] = useAuthState(auth);
    const [value, setValue] = useState('');
    const [creating, setCreating] = useState(false);
    const [category, setCategory] = useState<string>("");

    const accept: { [key: string]: string[] } = {
        "application/msword": [".doc"],
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"],
        "image/jpeg": [".jpeg", ".jpg"],
        "image/png": [".png"],
        "application/pdf": [".pdf"],
        "application/vnd.ms-excel": [".xls"],
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [".xlsx"],
    };

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
    const onSubmit = async (values: z.infer<typeof TaskSchema>) => {
        addTask({ values, value, toast, user, setCreating, setOpenDialog });
    };

    const handleCategory = (category: string) => {
        setCategory(category);
        form.setValue("category", category);
    }


    return (
        <Drawer open={openDialog} onOpenChange={onOpenChange}>
            <DrawerContent className="flex flex-col items-start max-w-2xl p-0">
                <DrawerHeader>
                    <DrawerTitle className="text-2xl text-left">Create Task</DrawerTitle>
                </DrawerHeader>
                <Separator />
                <Form {...form}>
                    <form
                        className="flex w-full flex-col items-center gap-5"
                        onSubmit={form.handleSubmit((values) => onSubmit(values))}
                    >
                        <ScrollArea className="h-[60vh]">
                            <div className="flex w-full mt-4 flex-col gap-3 px-6 py-0">
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
                                            <ReactQuill theme="snow" value={value} onChange={setValue} />
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="flex flex-col w-full justify-between mt-4 gap-4 px-6 py-0">
                                <FormField
                                    control={form.control}
                                    name="status"
                                    render={() => (
                                        <FormItem>
                                            <p className="text-gray-500 text-sm">Task Category <span>*</span></p>
                                            <div className="flex gap-2">
                                                <Badge variant={category === "Personal" ? "default" : "outline"} onClick={() => handleCategory("Personal")} className="px-4 py-2 cursor-pointer">Personal</Badge>
                                                <Badge variant={category === "Work" ? "default" : "outline"} onClick={() => handleCategory("Work")} className="px-4 py-2 cursor-pointer">Work</Badge>
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
                                            <DatePicker endContent={<CalendarDays />} value={field.value ? new Date(field.value) : undefined} onChange={field.onChange} placeholder="DD/MM/YYYY" className="w-[180px]" />
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="status"
                                    render={({ field }) => (
                                        <FormItem>
                                            <p className="text-gray-500 text-sm">Task Status <span>*</span></p>
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
                            <div className="grid grid-cols-1 gap-3 mt-4 w-full px-6 py-0">
                                <FormField
                                    control={form.control}
                                    name="attachments"
                                    render={({ field }) => (
                                        <FormItem>
                                            <p className="text-gray-500 text-sm">Attachments</p>
                                            <FileInput maxFiles={1} accept={accept} {...field} />
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </ScrollArea>
                        <DrawerFooter className="flex bg-[#F1F1F1] justify-end gap-2 p-4 border-t-2 border-[#d2d2d2] w-full">
                            <Button onClick={() => setOpenDialog(false)} variant="outline" className="rounded-3xl">
                                Cancel
                            </Button>
                            <Button disabled={form?.getValues().title === "" || form?.getValues().status === "" || form?.getValues().category === "" || form?.getValues().dueDate === null}
                                onClick={() => form.handleSubmit((values) => onSubmit(values))()}
                                className="rounded-3xl"
                            >
                                {creating ? "Creating..." : "Create Task"}
                            </Button>
                        </DrawerFooter>
                    </form>
                </Form>
            </DrawerContent>
        </Drawer>
    );
};

export default AddTaskDrawerMobile;
