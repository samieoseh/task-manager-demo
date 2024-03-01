import { TaskType } from "@/types";
import ChatIcon from "./icons/chat-icon";
import AttachIcon from "./icons/attach-icon";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import EllipseIcon from "./icons/elipses-icon";
import { useTasks } from "@/TaskContext";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "./ui/scroll-area";
import TaskForm from "./TaskForm";
import useTaskForm from "@/hooks/useTaskForm";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { useState } from "react";
import AvatarGroup from "./ui/avatar-group";
import DragIcon from "./icons/drag-icon";
import { DraggableProvided } from "react-beautiful-dnd";

const priorityColor = (priority: string) => {
  switch (priority) {
    case "low":
      return { bg: "#fef9c3", text: "#eab308" };
    case "moderate":
      return { bg: "#fee2e2", text: "#ef4444" };
    case "high":
      return { bg: "#dcfce7", text: "#22c55e" };
  }
};

const shortMonthLabels = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export default function Board({
  task,
  provided,
}: {
  task: TaskType;
  provided: DraggableProvided;
}) {
  const priorityColors = priorityColor(task.priority);
  const [comment, setComment] = useState("");

  const { form } = useTaskForm(task);
  const { removeTask, editTask, duplicateTask } = useTasks();

  const handleSaveComment = () => {
    editTask({ ...task, comments: [...task.comments, comment] });
    setComment(""); // Reset comment after saving
  };

  const calculateDurationInPercent = (startDate: Date, endDate: Date) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const now = new Date(); // Current date

    // Check if the current date is out of the range
    if (now < start) return 0; // The period hasn't started yet
    if (now > end) return 100; // The period has already ended

    // Calculate the total duration and the elapsed duration in milliseconds
    const totalDuration = end.getTime() - start.getTime();
    const elapsedDuration = now.getTime() - start.getTime();

    // Calculate the percentage of the elapsed duration relative to the total duration
    const durationPercent = (elapsedDuration / totalDuration) * 100;
    return durationPercent;
  };

  function calculateDynamicGradient(progress: number) {
    // Start with green
    const startColor = { r: 0, g: 255, b: 0 }; // Green
    // End with red (we won't use it directly but for calculation)
    const endColor = { r: 255, g: 0, b: 0 }; // Red

    // Calculate the "midway" color based on progress
    const progressRatio = progress / 100;
    const midwayColor = {
      r: Math.round(startColor.r + (endColor.r - startColor.r) * progressRatio),
      g: Math.round(startColor.g + (endColor.g - startColor.g) * progressRatio),
      b: Math.round(startColor.b + (endColor.b - startColor.b) * progressRatio),
    };

    // Convert RGB to hex
    const midwayHex = `#${midwayColor.r
      .toString(16)
      .padStart(2, "0")}${midwayColor.g
      .toString(16)
      .padStart(2, "0")}${midwayColor.b.toString(16).padStart(2, "0")}`;

    // Create gradient from green to the calculated midway color
    return `linear-gradient(to right, #00FF00, ${midwayHex})`;
  }

  const progress = calculateDurationInPercent(task.startDate, task.endDate);
  const safeProgress = Math.min(Math.max(progress, 0), 100);

  // Generate dynamic gradient based on progress
  const gradientStyle = {
    width: `${safeProgress}%`,
    background: calculateDynamicGradient(safeProgress),
  };

  return (
    <div className="bg-white px-4 py-6 rounded-md shadow-md w-full">
      <div className="flex justify-between">
        <div className="flex gap-4 items-center">
          <DragIcon provided={provided} />
          <p
            className="py-1 px-4 rounded-md text-sm"
            style={{
              backgroundColor: priorityColors?.bg,
              color: priorityColors?.text,
            }}
          >
            {task.priority.slice(0, 1).toUpperCase()}
            {task.priority.slice(1)}
          </p>
        </div>
        <Dialog>
          <Menubar>
            <MenubarMenu>
              <MenubarTrigger>
                <EllipseIcon className="cursor-pointer" />
              </MenubarTrigger>
              <MenubarContent>
                <DialogTrigger className="w-full">
                  <MenubarItem>Edit Task</MenubarItem>
                </DialogTrigger>
                <MenubarItem onClick={() => removeTask(task._id)}>
                  Delete Task
                </MenubarItem>
                <MenubarItem onClick={() => duplicateTask(task._id)}>Duplicate Task</MenubarItem>
              </MenubarContent>
            </MenubarMenu>
          </Menubar>
          <DialogContent>
            <DialogHeader className="text-xl font-bold">
              Edit a task
            </DialogHeader>
            <ScrollArea className="h-72 w-full rounded-md px-4">
              <TaskForm form={form} task={task} />
            </ScrollArea>
          </DialogContent>
        </Dialog>
      </div>
      <div className="flex flex-col gap-1 py-8">
        <h1 className="font-bold text-xl">{task.title.toUpperCase()}</h1>
        <p className="text-xs text-[#656565]">
          {new Date(task.startDate).getDate()}{" "}
          {shortMonthLabels[new Date(task.startDate).getMonth()]},
          {new Date(task.startDate).getFullYear()} -{" "}
          {new Date(task.endDate).getDate()}{" "}
          {shortMonthLabels[new Date(task.endDate).getMonth()]},
          {new Date(task.endDate).getFullYear()}
        </p>
      </div>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="w-full h-2 bg-gray-300 rounded overflow-hidden">
              <div
                style={gradientStyle}
                className="rounded h-full flex justify-center items-center"
              ></div>
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>{safeProgress.toFixed()}%</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <div className="flex justify-between pt-4">
        <AvatarGroup max={2}>
          {task.owners.map((owner: string, index: number) => (
            <Avatar key={index}>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>{owner.slice(0, 1)}</AvatarFallback>
            </Avatar>
          ))}
        </AvatarGroup>

        {/* TODO: like icons and files icon*/}
        <div className="flex items-center gap-8">
          <Dialog>
            <DialogTrigger>
              <ChatIcon comments={task.comments} />
            </DialogTrigger>
            <DialogContent>
              <DialogHeader className="text-xl font-bold">
                Add a comment
              </DialogHeader>
              <Textarea
                placeholder="Start typing..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              <Button className="w-full" onClick={() => handleSaveComment()}>
                Save
              </Button>
              {task.comments.length > 0 && (
                <>
                  <div className="border w-full"></div>
                  <div>
                    <h2 className="font-bold pb-4">Recent Comments</h2>
                    {task.comments.map((comment, index) => (
                      <div className="py-4 flex items-center gap-4" key={index}>
                        <p>{comment}</p>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </DialogContent>
          </Dialog>
          <AttachIcon />
        </div>
      </div>
    </div>
  );
}
