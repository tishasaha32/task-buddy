type DeleteBulkTasksProps = {
  selectedTasks: Task[];
  setSelectedTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  toast: any;
  setDeleteBulkTasksState: React.Dispatch<React.SetStateAction<boolean>>;
};
