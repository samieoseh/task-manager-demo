import { useState } from "react";
import { TaskType } from "./types";
import { TaskContext } from "./TaskContext";

export const TaskProvider = ({ children }: { children: React.ReactNode }) => {
  const [tasks, setTasks] = useState<TaskType[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<string>("all");

  const addTask = (task: TaskType) => {
    setTasks([...tasks, task]);
  };

  const removeTask = (taskId: string) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const editTask = (editedTask: TaskType) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === editedTask.id ? editedTask : task))
    );
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        addTask,
        removeTask,
        editTask,
        selectedFilter,
        setSelectedFilter,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
