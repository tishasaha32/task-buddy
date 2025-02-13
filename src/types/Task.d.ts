type Task = {
  id: string;
  title: string;
  description: string;
  category: "Work" | "Personal";
  dueDate: Date | undefined;
  status: "TODO" | "IN_PROGRESS" | "COMPLETED";
  attachments: File[] | string;
  createdAt: Date | undefined;
  userUid: string;
  updatedAt?: Date | undefined;
  fileUpdatedAt?: Date | undefined;
};
