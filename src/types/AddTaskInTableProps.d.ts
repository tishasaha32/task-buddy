type AddTaskInTableProps = {
  setCreate: React.Dispatch<React.SetStateAction<boolean>>;
  setTaskTitle: React.Dispatch<React.SetStateAction<string>>;
  setTaskStatus: React.Dispatch<React.SetStateAction<string>>;
  setTaskCategory: React.Dispatch<React.SetStateAction<string>>;
  setTaskDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
  user: string | undefined;
  toast: any;
  taskTitle: string;
  taskStatus: string;
  taskCategory: string;
  taskDate: Date | undefined;
};
