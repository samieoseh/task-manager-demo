import { Draggable } from "react-beautiful-dnd";
import Board from "./Board";
import { TaskType } from "@/types";

export default function Task({
  task,
  index,
}: {
  task: TaskType;
  index: number;
}) {
  return (
    <Draggable draggableId={task.id} key={task.id} index={index}>
      {(provided) => (
        <div
          className={`  mb-[8px] p-[8px] rounded-md flex items-center`}
          {...provided.draggableProps}
          ref={provided.innerRef}
        >
          <Board task={task} key={index} provided={provided} />
        </div>
      )}
    </Draggable>
  );
}
