type Task = {
  id: string;
  title: string;
  description: string;
  category: "Work" | "Personal";
  dueDate: Date;
  status: "TODO" | "IN_PROGRESS" | "COMPLETED";
  attachments: File[];
  createdAt: Date;
  userUid: string;
  updatedAt?: Date;
  fileUpdatedAt?: Date;
};
