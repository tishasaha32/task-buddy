type UpdateStatusProps = {
  task: Task;
  status: "TODO" | "IN_PROGRESS" | "COMPLETED";
  toast: any;
  setTaskStatus: React.Dispatch<
    React.SetStateAction<"TODO" | "IN_PROGRESS" | "COMPLETED">
  >;
};
