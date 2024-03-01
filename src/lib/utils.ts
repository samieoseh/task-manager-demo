import { ColumnMapType, TaskMapType, TaskType } from "@/types";
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateKanbanData(tasks: TaskType[]) {
  const taskMap: TaskMapType = {};
  const columnMap: ColumnMapType = {};
  const columnOrder: string[] = [];

  // Initialize columns based on predefined statuses
  const statusToColumnMap: Record<string, string> = {
    "not started": "column-1",
    "in progress": "column-2",
    completed: "column-3",
  };

  // Prepopulate the columnMap with empty columns using the Record
  Object.entries(statusToColumnMap).forEach(([status, columnId]) => {
    columnMap[columnId] = {
      id: columnId,
      title: status.charAt(0).toUpperCase() + status.slice(1), // Capitalize the first letter
      taskIds: [],
    };
    columnOrder.push(columnId);
  });

  // Process each task
  tasks.forEach((task) => {
    // Add task to taskMap
    taskMap[task._id] = {
      ...task,
    };

    // Determine the appropriate column for the task based on its status
    const columnId = statusToColumnMap[task.status.toLowerCase()];

    // Add the task ID to the appropriate column's taskIds array
    if (columnId && columnMap[columnId]) {
      columnMap[columnId].taskIds.push(task._id);
    }
  });

  // Return the structured Kanban data
  return {
    tasks: taskMap,
    columns: columnMap,
    columnOrder: columnOrder,
  };
}