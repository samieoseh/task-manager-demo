import { useEffect, useState } from "react";
import { TaskType } from "./types";
import { TaskContext } from "./TaskContext";
import axios, { AxiosResponse } from "axios";
import { generateKanbanData } from "./lib/utils";

export const TaskProvider = ({ children }: { children: React.ReactNode }) => {
  const [tasks, setTasks] = useState<TaskType[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<string>("all");

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get<TaskType[]>(
          "http://localhost:8800/tasks/undefined"
        );
        const taskConvertedWithDate = response.data.map((task) => ({
          ...task,
          startDate: new Date(task.startDate),
          endDate: new Date(task.endDate),
        }));
        setTasks(taskConvertedWithDate);
      } catch (error) {
        console.error("Failed to fetch tasks:", error);
      }
    };

    fetchTasks();
  }, []);

  const getTasks = async (taskId?: string) => {
    const url = `http://localhost:8800/tasks/${taskId}`;
    const response: AxiosResponse<TaskType[]> = await axios.get<TaskType[]>(
      url
    );
    setTasks(response.data);
    const kanbanData = generateKanbanData(response.data);
    return kanbanData;
  };
  const addTask = async (task: TaskType) => {
    const startDate = new Date(task.startDate).getTime();
    const endDate = new Date(task.endDate).getTime();
    const updatedTask = { ...task, startDate: startDate, endDate: endDate };
    const response = await axios.post("http://localhost:8800/tasks", updatedTask);
    setTasks((prevTasks) => [...prevTasks, response.data]);
  };

  const removeTask = async (taskId: string) => {
    const url = `http://localhost:8800/tasks/${taskId}`;
    console.log(url)
    await axios.delete(url);
    setTasks(tasks.filter((task) => task._id !== taskId));
  };

  const editTask = async (editedTask: TaskType) => {
    console.log("editing");
    const url = `http://localhost:8800/tasks/${editedTask._id}`;
    const startDate = new Date(editedTask.startDate).getTime();
    const endDate = new Date(editedTask.endDate).getTime();
    const updatedTask = {
      ...editedTask,
      startDate: startDate,
      endDate: endDate,
    };
    await axios.patch(url, updatedTask);
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task._id === editedTask._id ? editedTask : task))
    );
  };

  const duplicateTask = async (taskId: string) => {
    const url = `http://localhost:8800/tasks/${taskId}`;
    const response: AxiosResponse<TaskType> = await axios.get<TaskType>(
      url
    );
    const task = {...response.data};
    console.log(task);
    await addTask(task);
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        setTasks,
        addTask,
        getTasks,
        duplicateTask,
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
