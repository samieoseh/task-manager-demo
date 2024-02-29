import FilterNavigation from "./components/FilterNavigation";
import Header from "./components/Header";
import Kanban from "./components/Kanban";
import { useTasks } from "./TaskContext";
import { ColumnMapType, TaskMapType, TaskType } from "./types";
import { isToday, isThisWeek, isThisMonth } from "date-fns";

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
  console.log(selectedFilter);
  const filteredTask = tasks.filter((task) =>
    handleFilter(selectedFilter, task)
  );

  function generateKanbanData(tasks: TaskType[]) {
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
      taskMap[task.id] = {
        ...task,
      };

      // Determine the appropriate column for the task based on its status
      const columnId = statusToColumnMap[task.status.toLowerCase()];

      // Add the task ID to the appropriate column's taskIds array
      if (columnId && columnMap[columnId]) {
        columnMap[columnId].taskIds.push(task.id);
      }
    });

    // Return the structured Kanban data
    return {
      tasks: taskMap,
      columns: columnMap,
      columnOrder: columnOrder,
    };
  }

  const kanbanData = generateKanbanData(filteredTask);
  console.log(filteredTask);
  return (
    <div>
      <div className="w-[90%] mx-auto py-12 h-screen">
        <Header />
        <FilterNavigation />
        {/* {filteredTask.length > 0 ? (
          <div className="grid grid-cols-2 gap-8 shadow-sm py-12">
            {filteredTask.map((task, index) => (
              <Board task={task} key={index} />
            ))}
          </div>
        ) : (
          <p className="text-3xl py-12 mx-auto text-center">
            No tasks available
          </p>
        )} */}
        <Kanban kanbanData={kanbanData} />
      </div>
    </div>
  );
}
