import { createContext, useContext } from "react";
import { TaskContextType } from "./types";

// Create a Context for the tasks
export const TaskContext = createContext<TaskContextType | null>(null);

export const useTasks = (): TaskContextType => {
    const context = useContext(TaskContext);
    if (!context) {
      throw new Error('useTasks must be used within a TaskProvider');
    }
    return context;
  };
