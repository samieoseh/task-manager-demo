import * as z from "zod";

export const taskFormSchema = z.object({
  title: z
    .string()
    .min(1, { message: "Required" })
    .max(24, { message: "Title must be at most 24 characters" }),
  status: z.enum(['in progress', 'not started', 'completed']),
  priority: z.enum(['low', 'moderate', 'high']),
  startDate: z.date({
    required_error: "Please select a date and time",
    invalid_type_error: "That's not a date!",
  }),
  endDate: z.date({
    required_error: "Please select a date and time",
    invalid_type_error: "That's not a date!",
  }),
  owners: z.string({ required_error: "Please select an email to display." }).array(),
  comments: z.string().array()
});
