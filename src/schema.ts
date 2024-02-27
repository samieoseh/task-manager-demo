import * as z from "zod";

export const taskFormSchema = z.object({
  title: z.string().min(1, { message: "Required" }),
  startDate: z.date({
    required_error: "Please select a date and time",
    invalid_type_error: "That's not a date!",
  }),
  endDate: z.date({
    required_error: "Please select a date and time",
    invalid_type_error: "That's not a date!",
  }),
  owners: z.string({ required_error: "Please select an email to display." }),
});
