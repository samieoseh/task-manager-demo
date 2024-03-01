import { Droppable } from "react-beautiful-dnd";
import Task from "./Task";
import { ColumnType, TaskType } from "@/types";

export default function Column({
  column,
  tasks,
}: {
  column: ColumnType;
  tasks: TaskType[];
}) {
  return (
    <div className="m-[8px] border rounded-md flex-1 flex flex-col ">
      <h3 className="text-xl font-bold p-[8px]">{column.title}</h3>
      <Droppable droppableId={column.id}>
        {(provided, snapshot) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className={` ${
              snapshot.isDraggingOver
                ? "bg-blue-300"
                : "bg-transparent flex-grow"
            }`}
          >
            <div>
              {tasks.map((task, index) => (
                <Task task={task} index={index} key={index} />
              ))}
              {provided.placeholder}
            </div>
          </div>
        )}
      </Droppable>
    </div>
  );
}
