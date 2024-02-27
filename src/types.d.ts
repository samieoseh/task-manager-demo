export type TaskFormType = UseFormReturn<TaskType>;

export type TaskType = {
  title: string;
  startDate: Date;
  status: "in progress" | "not started" | "completed",
  priority: "low" | 'moderate' | 'high' | 'urgent',
  endDate: Date;
  owners: string;
};
