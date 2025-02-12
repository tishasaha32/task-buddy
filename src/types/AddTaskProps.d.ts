type AddTaskProps = {
  values: any;
  value: string | undefined;
  toast: any;
  user: string | undefined;
  setCreating: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenDialog: (open: boolean) => void;
};
