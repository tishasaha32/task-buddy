type UpdateBulkStatusProps = {
  newStatus: string;
  selectedTasks: Task[];
  setSelectedTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  setUpdateBulkStatusState: React.Dispatch<React.SetStateAction<boolean>>;
  toast: any;
};
