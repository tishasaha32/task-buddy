import { CopyCheck, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

type BulkSelectFunctionsProps = {
    selectedTasks: Task[];
    updateSelectedTasksStatus: (status: string, tasks: Task[]) => void;
    deleteSelectedTasks: (tasks: Task[]) => void;
    updateBulkStatusState: boolean;
    deleteBulkTasksState: boolean;
}

const BulkSelectFunctions = ({ selectedTasks, updateSelectedTasksStatus, deleteSelectedTasks, updateBulkStatusState, deleteBulkTasksState }: BulkSelectFunctionsProps) => {
    return (
        <div className="w-11/12 fixed bottom-4 -translate-x-1/2 left-1/2 md:w-5/12">
            <div className="flex gap-2 md:gap-10 items-center rounded-xl bg-black text-white p-2">
                <div className="flex items-center gap-2">
                    <p className="flex items-center gap-2 border border-border p-2 py-1 rounded-3xl text-xs">
                        {selectedTasks.length} tasks selected
                        <X size={16} />
                    </p>
                    <CopyCheck size={16} />
                </div>
                <div className="flex gap-2">
                    <Popover>
                        <PopoverTrigger asChild>
                            <Badge
                                variant="outline"
                                className="bg-black text-white border border-border px-4 py-1 hover:bg-gray-900 cursor-pointer"
                            >
                                {updateBulkStatusState ? (
                                    "Updating"
                                ) : (
                                    "Status"
                                )}
                            </Badge>
                        </PopoverTrigger>
                        <PopoverContent className="w-32 text-xs bg-black text-white flex flex-col gap-2 font-semibold cursor-pointer">
                            <p
                                onClick={() =>
                                    updateSelectedTasksStatus("TODO", selectedTasks)
                                }
                            >
                                TODO
                            </p>
                            <p
                                onClick={() =>
                                    updateSelectedTasksStatus("IN_PROGRESS", selectedTasks)
                                }
                            >
                                IN PROGRESS
                            </p>
                            <p
                                onClick={() =>
                                    updateSelectedTasksStatus("COMPLETED", selectedTasks)
                                }
                            >
                                COMPLETED
                            </p>
                        </PopoverContent>
                    </Popover>
                    <Badge
                        variant="outline"
                        className="bg-[#3a1f22] text-white border border-red-600 px-4 py-1 hover:bg-gray-900 cursor-pointer"
                        onClick={() => deleteSelectedTasks(selectedTasks)}
                    >
                        {deleteBulkTasksState ? (
                            "Deleting"
                        ) : (
                            "Delete"
                        )}
                    </Badge>
                </div>
            </div>
        </div>
    )
}

export default BulkSelectFunctions