import { db } from "@/firebase/config";
import { collection, getDocs } from "firebase/firestore";
import { create } from "zustand";

// Zustand Store Interface
interface TaskStore {
  tasks: Task[];
  loading: boolean;
  error: string | null;
  getTasks: () => Promise<Task[]>;
  //   addTask: (task: Omit<Task, "id">) => Promise<void>;
  //   updateTask: (id: string, updatedTask: Partial<Task>) => Promise<void>;
  //   deleteTask: (id: string) => Promise<void>;
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
}));
