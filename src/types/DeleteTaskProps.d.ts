type DeleteTaskProps = {
  taskId: string;
  toast: any;
  setOpenDialog: (open: boolean) => void;
  setDeleteTaskState: React.Dispatch<React.SetStateAction<boolean>>;
};
