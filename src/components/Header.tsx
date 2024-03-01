import PlusIcon from "./icons/plus-icon";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import TaskForm from "./TaskForm";
import useTaskForm from "@/hooks/useTaskForm";
import { ScrollArea } from "./ui/scroll-area";
import { taskFormSchema } from "@/schema";
import * as z from "zod";

export default function Header() {
  const defaultTask: z.infer<typeof taskFormSchema> = {
    title: "A new task",
    startDate: new Date(),
    endDate: new Date(),
    priority: "low",
    status: "in progress",
    owners: [],
    comments: [],
  };
  const { form } = useTaskForm(defaultTask);
  return (
    <header>
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold">Tasks</h1>
        <Dialog>
          <DialogTrigger>
            <Button>
              <PlusIcon />
              Create a task
            </Button>
          </DialogTrigger>

          <DialogContent>
            <DialogHeader className="text-xl font-bold">
              Add a task
            </DialogHeader>
            <ScrollArea className="h-72 w-full rounded-md px-4">
              <TaskForm form={form} />
            </ScrollArea>
          </DialogContent>
        </Dialog>
      </div>
    </header>
  );
}
