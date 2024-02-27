import PlusIcon from "./icons/plus-icon";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import AddTaskForm from "./AddTaskForm";
import useTaskForm from "@/hooks/useTaskForm";

export default function Header() {
  const { form } = useTaskForm();
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
            <AddTaskForm form={form} />
          </DialogContent>
        </Dialog>
      </div>
    </header>
  );
}
