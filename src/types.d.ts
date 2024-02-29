import * as z from "zod";
import { taskFormSchema } from "./schema";
import React from "react";
export type TaskType = z.infer<typeof taskFormSchema> & {
  id: string;
  comments: string[];
};
export type TaskContextType = {
  tasks: TaskType[];
  addTask: (task: TaskType) => void;
  editTask: (task: TaskType) => void;
  removeTask: (taskId: string) => void;
  selectedFilter: string;
  setSelectedFilter: React.Dispatch<React.SetStateAction<string>>;
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