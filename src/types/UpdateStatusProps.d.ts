type UpdateStatusProps = {
  task: Task;
  status: string;
  toast: any;
  setTaskStatus: React.Dispatch<React.SetStateAction<string>>;
};
