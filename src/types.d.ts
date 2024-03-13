import * as z from "zod";
import { taskFormSchema } from "./schema";
import React from "react";
export type TaskType = z.infer<typeof taskFormSchema> & {
  _id: string;
  comments: string[];
};
export type TaskContextType = {
  tasks: TaskType[];
  setTasks: React.Dispatch<React.SetStateAction<TaskType[]>>;
  getTasks: (taskId: string | undefined) => AxiosResponse<TaskType[]>;
  addTask: (task: TaskType) => void;
  duplicateTask: (taskId: string) => void;
  editTask: (task) => void;
  removeTask: (taskId: string) => void;
  selectedFilter: string;
  setSelectedFilter: React.Dispatch<React.SetStateAction<string>>;
};

export type KanbanType = {
  tasks: TaskMapType;
  columns: ColumnMapType;
  columnOrder: string[];
};

export type OwnerType = {
  id: string;
  name: string;
};

export type TaskMapType = {
  [key: string]: TaskType;
};

export type ColumnType = {
  id: string;
  title: string;
  taskIds: string[]; // Make sure this matches your naming convention
};

export type ColumnMapType = {
  [key: string]: ColumnType;
};
