import { db } from "@/firebase/config";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
} from "firebase/firestore";
import { create } from "zustand";

// Zustand Store Interface
interface TaskStore {
  tasks: Task[];
  loading: boolean;
  error: string | null;
  getTasks: () => Promise<Task[]>;
  addTask: ({
    values,
    value,
    toast,
    user,
    setCreating,
    setOpenDialog,
  }: any) => Promise<void>;
  addTaskInTable: ({
    setCreate,
    setTaskTitle,
    setTaskStatus,
    setTaskCategory,
    setTaskDate,
    user,
    toast,
    taskTitle,
    taskStatus,
    taskCategory,
    taskDate,
  }: any) => Promise<void>;
  //   updateTask: (id: string, updatedTask: Partial<Task>) => Promise<void>;
  deleteTask: ({
    taskId,
    toast,
    setOpenDialog,
    setDeleteTaskState,
  }: any) => Promise<void>;
}

export const useTaskStore = create<TaskStore>((set) => ({
  tasks: [],
  loading: false,
  error: null,

  getTasks: async (): Promise<Task[]> => {
    set({ loading: true, error: null });
    try {
      const tasksCollection = collection(db, "tasks");
      const tasksSnapshot = await getDocs(tasksCollection);
      const tasksList: Task[] = tasksSnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          title: data?.title || "",
          description: data?.description || "",
          category: data?.category as "Work" | "Personal",
          dueDate: data?.dueDate
            ? new Date(data?.dueDate.toDate())
            : new Date(),
          status: data?.status as "TODO" | "IN_PROGRESS" | "COMPLETED",
          attachments: data?.attachments || [],
          createdAt: data?.createdAt ? new Date(data?.createdAt) : new Date(),
          updatedAt: data?.updatedAt ? new Date(data?.updatedAt) : undefined,
          fileUpdatedAt: data?.fileUpdatedAt
            ? new Date(data?.fileUpdatedAt)
            : undefined,
          userUid: data?.userUid || "",
        };
      });
      set({ tasks: tasksList, loading: false, error: null });
      return tasksList as Task[];
    } catch (error) {
      console.error("Error fetching tasks:", error);
      set({ loading: false, error: error as string });
      return [] as Task[];
    }
  },

  addTask: async ({
    values,
    value,
    toast,
    user,
    setCreating,
    setOpenDialog,
  }) => {
    setCreating(true);
    if (values?.attachments && values?.attachments?.length > 0) {
      //Store file to cloudinary
      const data = new FormData();
      data.append("file", values?.attachments[0]);
      data.append("upload_preset", "task_buddy");
      data.append("cloud_name", "dlatzxjdp");

      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dlatzxjdp/image/upload",
        {
          method: "post",
          body: data,
        }
      );
      const uploadImage = await res.json();

      //Store task to firestore
      const payload = {
        ...values,
        attachments: uploadImage.url,
        description: value,
        userUid: user?.uid,
      };
      const docRef = await addDoc(collection(db, "tasks"), payload);
      if (docRef.id) {
        toast({ title: "Task Created Successfully👍" });
        set((state) => ({
          tasks: [...state.tasks, { id: docRef.id, ...payload }],
        }));
      } else {
        toast({ variant: "destructive", title: "Task Creation Failed👎" });
      }
    } else {
      //Store task to firestore
      const payload = {
        ...values,
        attachments: "",
        description: value,
        userUid: user?.uid,
      };
      const docRef = await addDoc(collection(db, "tasks"), payload);
      if (docRef.id) {
        toast({ title: "Task Created Successfully👍" });
        set((state) => ({
          tasks: [...state.tasks, { id: docRef.id, ...payload }],
        }));
      } else {
        toast({ variant: "destructive", title: "Task Creation Failed👎" });
      }
    }
    setCreating(false);
    setOpenDialog(false);
  },

  addTaskInTable: async ({
    setCreate,
    setTaskTitle,
    setTaskStatus,
    setTaskCategory,
    setTaskDate,
    user,
    toast,
    taskTitle,
    taskStatus,
    taskCategory,
    taskDate,
  }) => {
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
      //@ts-expect-error todo
      set((state) => ({
        tasks: [...state.tasks, { id: docRef.id, ...payload }],
      }));
    } else {
      toast({ variant: "destructive", title: "Task Creation Failed👎" });
    }
    setCreate(false);
    setTaskTitle("");
    setTaskStatus("");
    setTaskCategory("");
    setTaskDate(undefined);
  },

  deleteTask: async ({ taskId, toast, setOpenDialog, setDeleteTaskState }) => {
    setDeleteTaskState(true);
    try {
      await deleteDoc(doc(db, "tasks", taskId));
      toast({ title: "Task deleted successfully👍" });
      set((state) => ({
        tasks: state.tasks.filter((task) => task.id !== taskId),
      }));
    } catch (error) {
      console.error("Error deleting task:", error);
      toast({ variant: "destructive", title: "Task deletion failed👎" });
    }
    setOpenDialog(false);
    setDeleteTaskState(false);
  },
}));
