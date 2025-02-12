import { ChevronUp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useTaskStore } from "@/store/taskStore";
import React, { useEffect, useState } from "react";
import { DndContext, closestCorners, DragEndEvent } from "@dnd-kit/core";
import { AddTaskInTable, TasksLists, NoTaskTable, BulkSelectFunctions } from "../common";
import {
    SortableContext,
    arrayMove,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "../ui/button";

type TaskTableProps = {
    tasks: Task[];
};

const TaskTable = ({ tasks }: TaskTableProps) => {
    const { updateBulkStatus, deleteBulkTasks } = useTaskStore((state) => state);

    const { toast } = useToast();

    const [tasksToShow, setTasksToShow] = useState({
        TODO: 5,
        IN_PROGRESS: 5,
        COMPLETED: 5,
    });

    const loadMoreTasks = (status: string) => {
        setTasksToShow((prev) => ({
            ...prev,
            [status]: prev[status] + 5,
        }));
    };

    const [showTodo, setShowTodo] = useState(true);
    const [showCompleted, setShowCompleted] = useState(true);
    const [showInProgress, setShowInProgress] = useState(true);
    const [addTaskClicked, setAddTaskClicked] = useState(false);
    const [tasksData, setTasksData] = useState(tasks as Task[]);
    const [selectedTasks, setSelectedTasks] = useState<Task[]>([]);
    const [deleteBulkTasksState, setDeleteBulkTasksState] = useState(false);
    const [updateBulkStatusState, setUpdateBulkStatusState] = useState(false);

    useEffect(() => {
        setTasksData(tasks);
    }, [tasks]);

    const updateTaskOrder = (event: DragEndEvent) => {
        const { active, over } = event;
        if (!over) return;

        setTasksData((prevTasks) => {
            const oldIndex = prevTasks.findIndex((t) => t.id === active.id);
            const newIndex = prevTasks.findIndex((t) => t.id === over.id);
            return arrayMove(prevTasks, oldIndex, newIndex);
        });
    };

    const groupedTasks = {
        TODO: tasksData.filter((task) => task.status === "TODO").slice(0, tasksToShow.TODO),
        IN_PROGRESS: tasksData.filter((task) => task.status === "IN_PROGRESS").slice(0, tasksToShow.IN_PROGRESS),
        COMPLETED: tasksData.filter((task) => task.status === "COMPLETED").slice(0, tasksToShow.COMPLETED),
    };

    const updateSelectedTasksStatus = async (
        newStatus: string,
        selectedTasks: Task[]
    ) => {
        if (!selectedTasks.length) return;
        updateBulkStatus({
            newStatus,
            selectedTasks,
            setSelectedTasks,
            toast,
            setUpdateBulkStatusState,
        });
    };

    const deleteSelectedTasks = async (selectedTasks: Task[]) => {
        if (!selectedTasks.length) return;
        deleteBulkTasks({
            selectedTasks,
            setSelectedTasks,
            toast,
            setDeleteBulkTasksState,
        });
    };

    return (
        <DndContext collisionDetection={closestCorners} onDragEnd={updateTaskOrder}>
            <div className="p-4 pt-0 md:p-0 overflow-hidden">
                <Table className="w-full overflow-hidden">
                    <TableHeader>
                        <TableRow>
                            <TableHead className="hidden sm:table-cell"></TableHead>
                            <TableHead className="hidden sm:table-cell text-bold text-gray-600">
                                Title
                            </TableHead>
                            <TableHead className="hidden sm:table-cell text-bold text-gray-600">
                                DueOn
                            </TableHead>
                            <TableHead className="hidden sm:table-cell text-bold text-gray-600">
                                Status
                            </TableHead>
                            <TableHead className="hidden sm:table-cell text-bold text-gray-600">
                                Category
                            </TableHead>
                            <TableHead className="sm:table-cell hidden"></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody className="bg-[#F1F1F1]">
                        {Object.entries(groupedTasks).map(([status, taskList]) => (
                            <React.Fragment key={status}>
                                <TableRow
                                    className="cursor-pointer"
                                    onClick={() => {
                                        if (status === "TODO") setShowTodo(!showTodo);
                                        if (status === "IN_PROGRESS") setShowInProgress(!showInProgress);
                                        if (status === "COMPLETED") setShowCompleted(!showCompleted);
                                    }}
                                >
                                    <TableCell
                                        colSpan={6}
                                        className={`bg-${status === "TODO"
                                            ? "[#FAC3FF]"
                                            : status === "IN_PROGRESS"
                                                ? "[#85D9F1]"
                                                : "[#A2D6A0]"
                                            } font-semibold p-2 text-left rounded-t-md`}
                                    >
                                        {status.split("_").join(" ")} ({taskList.length})
                                        <ChevronUp
                                            size={16}
                                            className={`float-right transform ${(status === "TODO" && showTodo) ||
                                                (status === "IN_PROGRESS" && showInProgress) ||
                                                (status === "COMPLETED" && showCompleted)
                                                ? ""
                                                : "rotate-180"
                                                }`}
                                        />
                                    </TableCell>
                                </TableRow>
                                {status === "TODO" && (
                                    <TableRow className="hidden sm:table-row">
                                        <TableCell
                                            colSpan={6}
                                            onClick={() => setAddTaskClicked(!addTaskClicked)}
                                            className="cursor-pointer"
                                        >
                                            + Add Task{" "}
                                        </TableCell>
                                    </TableRow>
                                )}
                                {addTaskClicked && status === "TODO" && (
                                    <AddTaskInTable setAddTaskClicked={setAddTaskClicked} />
                                )}
                                <SortableContext
                                    items={taskList.map((t) => t.id)}
                                    strategy={verticalListSortingStrategy}
                                >
                                    {(status === "TODO" && showTodo) ||
                                        (status === "IN_PROGRESS" && showInProgress) ||
                                        (status === "COMPLETED" && showCompleted)
                                        ? taskList.map((task) => (
                                            <TasksLists
                                                setSelectedTasks={setSelectedTasks}
                                                selectedTasks={selectedTasks}
                                                key={task.id}
                                                task={task}
                                            />
                                        ))
                                        : null}
                                </SortableContext>
                                {tasksData.filter((task) => task.status === status).length > tasksToShow[status] && (
                                    <TableRow>
                                        <TableCell colSpan={6} className="text-center">
                                            <Button
                                                variant="link"
                                                onClick={() => loadMoreTasks(status)}
                                                className="text-[#2683B5] underline"
                                            >
                                                Load More
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                )}
                                {taskList.length === 0 && (
                                    <NoTaskTable status={status.toLowerCase()} />
                                )}
                                <TableRow className="bg-background">
                                    <TableCell colSpan={6}> </TableCell>
                                </TableRow>
                            </React.Fragment>
                        ))}

                    </TableBody>
                </Table>
                {selectedTasks.length > 0 && (
                    <BulkSelectFunctions
                        selectedTasks={selectedTasks}
                        updateSelectedTasksStatus={updateSelectedTasksStatus}
                        deleteSelectedTasks={deleteSelectedTasks}
                        deleteBulkTasksState={deleteBulkTasksState}
                        updateBulkStatusState={updateBulkStatusState}
                    />
                )}
            </div>
        </DndContext>
    );
};

export default TaskTable;
