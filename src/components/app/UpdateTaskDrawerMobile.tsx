import { z } from "zod";
import { format } from "date-fns";
import { db } from "@/firebase/config";
import ReactQuill from "react-quill-new";
import { useForm } from "react-hook-form";
import { CalendarDays } from "lucide-react";
import { TaskSchema } from "@/schemas/Task";
import { useEffect, useState } from "react";
import "react-quill-new/dist/quill.snow.css";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { DatePicker } from "../ui/date-picker";
import { Button } from "@/components/ui/button";
import { doc, updateDoc } from "firebase/firestore";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { FileInput } from "@/components/ui/file-input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Drawer, DrawerContent, DrawerFooter, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import { useToast } from "@/hooks/use-toast";

interface UpdateTaskDrawerMobileProps {
    task: Task;
    openDialog: boolean;
    setOpenDialog: (open: boolean) => void;
}
const UpdateTaskDrawerMobile = ({ task, openDialog, setOpenDialog }: UpdateTaskDrawerMobileProps) => {
    const [value, setValue] = useState<string>("");
    const [update, setUpdate] = useState<boolean>(false);
    const [category, setCategory] = useState<string>(task?.category || "");

    const { toast } = useToast();

    useEffect(() => {
        setValue(task?.description || "");
    }, [task]);

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
        title: task?.title || "",
        description: task?.description || "",
        dueDate: task?.dueDate || null,
        status: task?.status || "",
        category: task?.category || "",
        attachments: [],
    };

    const form = useForm<z.infer<typeof TaskSchema>>({
        defaultValues: defaultValues,
        mode: "onTouched",
        resolver: zodResolver(TaskSchema),
    });

    const onSubmit = async (values: z.infer<typeof TaskSchema>) => {
        setUpdate(true);

        if (values?.attachments && values?.attachments?.length > 0) {
            //Store file to cloudinary
            const data = new FormData();
            data.append("file", values?.attachments[0]);
            data.append("upload_preset", "task_buddy");
            data.append("cloud_name", "dlatzxjdp");

            const res = await fetch("https://api.cloudinary.com/v1_1/dlatzxjdp/image/upload", {
                method: "post",
                body: data,
            })
            const uploadImage = await res.json();

            //Store task to firestore
            const taskRef = doc(db, "tasks", task.id);
            const updatedTask = {
                ...values,
                attachments: uploadImage.url,
                description: value,
                updatedAt: new Date().toISOString(),
            };
            await updateDoc(taskRef, updatedTask);
            if (taskRef.id) {
                toast({ title: "Task updated successfully👍" });
            }
            else {
                toast({ variant: "destructive", title: "Task update failed👎" })
            }
        }
        else {
            const taskRef = doc(db, "tasks", task.id);
            const updatedTask = {
                ...values,
                attachments: "",
                description: value,
                updatedAt: new Date().toISOString(),
            };
            await updateDoc(taskRef, updatedTask);
            if (taskRef.id) {
                toast({ title: "Task updated successfully👍" });
            }
            else {
                toast({ variant: "destructive", title: "Task update failed👎" })
            }
        }
        setUpdate(false);
        setOpenDialog(false);
    };

    const handleCategory = (category: string) => {
        setCategory(category);
        form.setValue("category", category);
    };

    return (
        <Drawer open={openDialog} onOpenChange={onOpenChange}>
            <DrawerContent className="flex flex-col items-start max-w-5xl p-0">
                <DrawerHeader>
                    <DrawerTitle className="text-2xl text-left">
                        Update Task
                    </DrawerTitle>
                </DrawerHeader>
                <Separator />
                <Tabs defaultValue="details">
                    <TabsList className="flex gap-2 w-full">
                        <TabsTrigger value="details" className="w-1/2 border border-border rounded-3xl">Details</TabsTrigger>
                        <TabsTrigger value="activity" className="w-1/2 border border-border rounded-3xl">Activity</TabsTrigger>
                    </TabsList>
                    <TabsContent value="details" >
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
                                            render={({ field }) => (
                                                <FormItem>
                                                    <ReactQuill theme="snow" value={field.value} onChange={setValue} />
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
                                                    <p className="text-gray-500 text-sm">
                                                        Task Category <span>*</span>
                                                    </p>
                                                    <div className="flex gap-2">
                                                        <Badge
                                                            variant={
                                                                category === "Personal" ? "default" : "outline"
                                                            }
                                                            className="px-4 py-2 cursor-pointer"
                                                            onClick={() => handleCategory("Personal")}
                                                        >
                                                            Personal
                                                        </Badge>
                                                        <Badge
                                                            variant={
                                                                category === "Work" ? "default" : "outline"
                                                            }
                                                            className="px-4 py-2 cursor-pointer"
                                                            onClick={() => handleCategory("Work")}
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
                                                    {task?.attachments.length > 0 && form.getValues("attachments")?.length === 0 && (
                                                        <img src={task?.attachments as string} className="h-40 w-40 rounded-lg object-cover" />
                                                    )}
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
                                        {update ? "Updating..." : "Update"}
                                    </Button>
                                </DrawerFooter>
                            </form>
                        </Form>
                    </TabsContent>
                    <TabsContent value="activity">
                        <ScrollArea className="h-[75vh]">
                            <div className="flex flex-col gap-2 p-2 w-screen">
                                <div className="text-sm flex justify-between items-center">
                                    <p>You created this task</p>
                                    <p className="text-gray-500">{task?.createdAt && format(task?.createdAt, "PPP")}</p>
                                </div>
                                {task?.updatedAt && (
                                    <div className="text-sm flex justify-between items-center">
                                        <p>You updated this task</p>
                                        <p className="text-gray-500">{format(task?.updatedAt, "PPP")}</p>
                                    </div>
                                )}
                                {task?.fileUpdatedAt && (
                                    <div className="text-sm flex justify-between items-center">
                                        <p>You uploaded file</p>
                                        <p className="text-gray-500">{format(task?.fileUpdatedAt, "PPP")}</p>
                                    </div>
                                )}
                            </div>
                        </ScrollArea>
                    </TabsContent>
                </Tabs>
            </DrawerContent>
        </Drawer>
    );
};

export default UpdateTaskDrawerMobile;
