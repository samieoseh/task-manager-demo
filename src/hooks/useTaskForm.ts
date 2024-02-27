import { taskFormSchema } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

const useTaskForm = () => {
  const form = useForm<z.infer<typeof taskFormSchema>>({
    resolver: zodResolver(taskFormSchema),
    defaultValues: {
      title: "",
      startDate: new Date(),
      endDate: new Date(),
      owners: "",
    },
  });
  return { form };
};

export default useTaskForm;
