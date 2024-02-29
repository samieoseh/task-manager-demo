import { useEffect, useState } from "react";
import Column from "./Column";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { useTasks } from "@/TaskContext";

export default function Kanban({ kanbanData }) {
  const { editTask } = useTasks();
  const [data, setData] = useState(kanbanData);

  useEffect(() => {
    setData(kanbanData);
  }, [kanbanData]);

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    // Exit if dropped outside the list
    if (!destination) {
      return;
    }

    const sourceColumn = data.columns[source.droppableId];
    const destinationColumn = data.columns[destination.droppableId];

    // Moving within the same column
    if (source.droppableId === destination.droppableId) {
      const newTaskIds = Array.from(sourceColumn.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...sourceColumn,
        taskIds: newTaskIds,
      };

      const newState = {
        ...data,
        columns: {
          ...data.columns,
          [newColumn.id]: newColumn,
        },
      };

      setData(newState);
    } else {
      // Moving from one column to another
      const sourceTaskIds = Array.from(sourceColumn.taskIds);

      sourceTaskIds.splice(source.index, 1);
      const newSourceColumn = {
        ...sourceColumn,
        taskIds: sourceTaskIds,
      };

      const destinationTaskIds: string[] = Array.from(
        destinationColumn.taskIds
      );
      destinationTaskIds.splice(destination.index, 0, draggableId);
      const newDestinationColumn = {
        ...destinationColumn,
        taskIds: destinationTaskIds,
      };

      const task = data.tasks[destinationTaskIds[0]];
      const updatedTask = {
        ...task,
        status: destinationColumn.title.toLowerCase(),
      };

      const newState = {
        ...data,
        columns: {
          ...data.columns,
          [newSourceColumn.id]: newSourceColumn,
          [newDestinationColumn.id]: newDestinationColumn,
        },
      };

      setData(newState);
      editTask(updatedTask);
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex justify-between gap-2">
        {data.columnOrder.map((columnId: string) => {
          const column = data.columns[columnId];
          const tasks = column.taskIds.map(
            (taskId: string) => data.tasks[taskId]
          );
          return <Column key={column.id} column={column} tasks={tasks} />;
        })}
      </div>
    </DragDropContext>
  );
}
