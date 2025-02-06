type Task = {
  uuid: string;
  title: string;
  description: string;
  category: "WORK" | "PERSONAL";
  dueDate: Date;
  status: "TODO" | "IN_PROGRESS" | "COMPLETED";
  attachments: File[];
};
