import { taskFormSchema } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

const useTaskForm = (task: z.infer<typeof taskFormSchema>) => {
  const form = useForm<z.infer<typeof taskFormSchema>>({
    resolver: zodResolver(taskFormSchema),
    defaultValues: task,
  });
  return { form };
};

export default useTaskForm;
