import { db } from "@/firebase/config";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
  writeBatch,
} from "firebase/firestore";
import { create } from "zustand";

// Zustand Store Interface

interface TaskStore {
  tasks: Task[];
  loading: boolean;
  error: string | null;

  getTasks: ({ user: any }) => Promise<Task[]>;

  addTask: ({
    values,
    value,
    toast,
    user,
    setCreating,
    setOpenDialog,
  }: AddTaskProps) => Promise<void>;

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
  }: AddTaskInTableProps) => Promise<void>;

  updateTask: ({
    setUpdate,
    task,
    values,
    value,
    toast,
    setOpenDialog,
  }: UpdateTaskProps) => Promise<void>;

  updateStatus: ({
    task,
    status,
    toast,
    setTaskStatus,
  }: UpdateStatusProps) => Promise<void>;

  updateBulkStatus: ({
    newStatus,
    selectedTasks,
    setSelectedTasks,
    toast,
    setUpdateBulkStatusState,
  }: UpdateBulkStatusProps) => Promise<void>;

  deleteTask: ({
    taskId,
    toast,
    setOpenDialog,
    setDeleteTaskState,
  }: DeleteTaskProps) => Promise<void>;

  deleteBulkTasks: ({
    selectedTasks,
    setSelectedTasks,
    toast,
    setDeleteBulkTasksState,
  }: DeleteBulkTasksProps) => Promise<void>;
}

export const useTaskStore = create<TaskStore>((set) => ({
  tasks: [],
  loading: false,
  error: null,

  getTasks: async ({ user }): Promise<Task[]> => {
    set({ loading: true, error: null });
    try {
      const tasksCollection = collection(db, "tasks");
      // Query to filter tasks by user ID
      const q = query(tasksCollection, where("userUid", "==", user?.uid));
      const tasksSnapshot = await getDocs(q);

      const tasksList: Task[] = tasksSnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          index: data?.index,
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
    const taskStore = useTaskStore.getState();
    const currentTaskCount = taskStore.tasks.length;
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
        index: currentTaskCount,
        attachments: uploadImage.url,
        description: value,
        userUid: user,
        createdAt: new Date(),
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
        index: currentTaskCount,
        attachments: "",
        description: value,
        userUid: user,
        createdAt: new Date(),
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
    const taskStore = useTaskStore.getState();
    const currentTaskCount = taskStore.tasks.length;

    setCreate(true);
    const payload = {
      index: currentTaskCount,
      title: taskTitle,
      status: taskStatus,
      category: taskCategory,
      dueDate: taskDate,
      attachments: "",
      description: "",
      userUid: user,
      createdAt: new Date(),
    };
    const docRef = await addDoc(collection(db, "tasks"), payload);
    if (docRef.id) {
      toast({ title: "Task Created Successfully👍" });
      set((state) => ({
        tasks: [...state.tasks, { ...payload, id: docRef.id } as Task],
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

  updateTask: async ({
    setUpdate,
    task,
    values,
    value,
    toast,
    setOpenDialog,
  }) => {
    setUpdate(true);
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
        set((state) => ({
          tasks: state.tasks.map((t) => {
            if (t.id === task.id) {
              return { ...t, ...updatedTask };
            }
            return t;
          }),
        }));
      } else {
        toast({ variant: "destructive", title: "Task update failed👎" });
      }
    } else if (
      task?.attachments &&
      values?.attachments &&
      values?.attachments?.length === 0
    ) {
      const taskRef = doc(db, "tasks", task.id);
      const updatedTask = {
        ...values,
        attachments: task?.attachments,
        description: value,
        updatedAt: new Date().toISOString(),
      };
      await updateDoc(taskRef, updatedTask);
      if (taskRef.id) {
        toast({ title: "Task updated successfully👍" });
        set((state) => ({
          tasks: state.tasks.map((t) => {
            if (t.id === task.id) {
              return { ...t, ...updatedTask };
            }
            return t;
          }),
        }));
      } else {
        toast({ variant: "destructive", title: "Task update failed👎" });
      }
    } else {
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
        set((state) => ({
          tasks: state.tasks.map((t) => {
            if (t.id === task.id) {
              return { ...t, ...updatedTask };
            }
            return t;
          }),
        }));
      } else {
        toast({ variant: "destructive", title: "Task update failed👎" });
      }
    }
    setUpdate(false);
    setOpenDialog(false);
  },

  updateStatus: async ({ task, status, toast, setTaskStatus }) => {
    setTaskStatus(status);
    const taskRef = doc(db, "tasks", task.id);
    updateDoc(taskRef, {
      status: status as "TODO" | "IN_PROGRESS" | "COMPLETED",
    });

    if (taskRef.id) {
      toast({ title: "Task status updated successfully👍" });
      set((state) => ({
        ...state,
        tasks: state.tasks.map((t) => {
          if (t.id === task.id) {
            return {
              ...t,
              status: status as "TODO" | "IN_PROGRESS" | "COMPLETED",
            };
          }
          return t;
        }),
      }));
    } else {
      toast({ variant: "destructive", title: "Task status update failed👎" });
    }
  },

  updateBulkStatus: async ({
    newStatus,
    selectedTasks,
    setSelectedTasks,
    setUpdateBulkStatusState,
    toast,
  }) => {
    setUpdateBulkStatusState(true);
    const batch = writeBatch(db);
    selectedTasks.forEach((task: Task) => {
      const taskRef = doc(db, "tasks", task.id);
      batch.update(taskRef, { status: newStatus });
    });

    try {
      await batch.commit();
      toast({ title: "Tasks updated successfully👍" });
      set((state) => ({
        ...state,
        tasks: state.tasks.map((t) => {
          if (selectedTasks.some((task: Task) => task.id === t.id)) {
            return {
              ...t,
              status: newStatus as "TODO" | "IN_PROGRESS" | "COMPLETED",
            };
          }
          return t;
        }),
      }));

      setSelectedTasks([]);
    } catch (error) {
      toast({ variant: "destructive", title: "Task update failed👎" });
      console.error("Error updating tasks:", error);
    }
    setUpdateBulkStatusState(false);
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

  deleteBulkTasks: async ({
    selectedTasks,
    setSelectedTasks,
    toast,
    setDeleteBulkTasksState,
  }) => {
    setDeleteBulkTasksState(true);
    try {
      const deletePromises = selectedTasks.map((task: Task) =>
        deleteDoc(doc(db, "tasks", task.id))
      );
      await Promise.all(deletePromises);
      toast({ title: "Tasks deleted successfully👍" });
      set((state) => ({
        tasks: state.tasks.filter((task) => !selectedTasks.includes(task)),
      }));
    } catch (error) {
      console.error("Error deleting tasks:", error);
      toast({ variant: "destructive", title: "Task deletion failed👎" });
    }
    setSelectedTasks([]);
    setDeleteBulkTasksState(false);
  },
}));
