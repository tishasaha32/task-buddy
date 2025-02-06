import { z } from "zod";

export const Task = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  dueDate: z.string().min(1, { message: "Due date is required" }),
  status: z.string().min(1, { message: "Status is required" }),
  category: z.string().min(1, { message: "Category is required" }),
  attachments: z.array(z.string()).optional(),
});
