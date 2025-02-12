type UpdateTaskProps = {
  setUpdate: React.Dispatch<React.SetStateAction<boolean>>;
  task: Task;
  values: any;
  value: string;
  toast: any;
  setOpenDialog: (open: boolean) => void;
};
