import FilterNavigation from "./components/FilterNavigation";
import Header from "./components/Header";
import Kanban from "./components/Kanban";
import { useTasks } from "./TaskContext";
import {  TaskType } from "./types";
import { isToday, isThisWeek, isThisMonth } from "date-fns";
import { generateKanbanData } from "./lib/utils";

const handleFilter = (selectedFilter: string, task: TaskType) => {
  const dueDate = new Date(task.endDate); // Assuming task.dueDate is in a format that can be parsed to a Date object
  switch (selectedFilter) {
    case "today":
      return isToday(dueDate);
    case "week":
      return isThisWeek(dueDate);
    case "month":
      return isThisMonth(dueDate);
    case "all":
    default:
      return true; // No filter applied
  }
};
export default function App() {
  const { tasks, selectedFilter } = useTasks();

  const filteredTask = tasks.filter((task) =>
    handleFilter(selectedFilter, task)
  );

  // Assuming generateKanbanData function is defined elsewhere and available here
  const kanbanData = generateKanbanData(filteredTask);
  console.log(kanbanData)
  return (
    <div>
      <div className="w-[90%] mx-auto py-12 h-screen">
        <Header />
        <FilterNavigation />
        <Kanban kanbanData={kanbanData} />
      </div>
    </div>
  );
}
