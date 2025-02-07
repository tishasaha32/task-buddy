import { z } from "zod";

export const TaskSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  description: z.string().optional(),
  dueDate: z.date({ required_error: "Due date is required" }).nullable(),
  status: z.string().min(1, { message: "Status is required" }),
  category: z.string().min(1, { message: "Category is required" }),
  attachments: z.array(z.instanceof(File)).optional(),
});
