import { TaskType } from "@/types";
import ChatIcon from "./icons/chat-icon";
import AttachIcon from "./icons/attach-icon";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const priorityColor = (status: string) => {
  switch (status) {
    case "in progress":
      return { bg: "#fef9c3", text: "#eab308" };
    case "not started":
      return { bg: "#fee2e2", text: "#ef4444" };
    case "completed":
      return { bg: "#dcfce7", text: "#22c55e" };
  }
};
export default function Board({ task }: { task: TaskType }) {
  const colors = priorityColor(task.status);

  return (
    <div className="bg-white px-4 py-6 rounded-md">
      <div className="flex justify-between">
        <div className="flex gap-2 flex-col">
          <div
            className="rounded-full flex items-center justify-center flex-1 "
            style={{ backgroundColor: colors?.bg }}
          >
            <h1
              className="px-8 py-2 text-sm font-bold "
              style={{ color: colors?.text }}
            >
              {task.title.toUpperCase()}
            </h1>
          </div>
        </div>

        <p className="text-red-500 text-sm">{task.priority.toUpperCase()}</p>
      </div>
      <p className="text-xs py-4">
        {task.startDate.getDate()}/{task.startDate.getMonth()}/
        {task.startDate.getFullYear()} - {task.endDate.getDate()}/
        {task.endDate.getMonth()}/{task.endDate.getFullYear()}
      </p>
      <p className="text-xs pb-8 pt-1">some description text</p>

      <div className="w-full bg-purple-200 rounded-lg">
        <div
          className="bg-purple-600 h-2 rounded-lg"
          style={{ width: "60%" }}
        ></div>
      </div>
      <div className="flex justify-between pt-4">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>{task.owners.slice(0, 1)}</AvatarFallback>
        </Avatar>
        {/* TODO: like icons and files icon*/}
        <div className="flex items-center gap-4">
          <ChatIcon />
          <AttachIcon />
        </div>
      </div>
    </div>
  );
}
