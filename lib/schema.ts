import * as z from "zod";
import { v4 as uuidv4 } from "uuid";

// schema for form validation
export const todoSchema = z.object({
  id: z.string().uuid().default(uuidv4()),
  listId: z.string().uuid().nullable(),
  title: z.string().min(1),
  description: z.string().nullable(),
  due: z
    .date()
    .min(new Date(Date.now() - 86400000), {
      message: "Please insert a future date",
    })
    .nullable(),
  completed: z.boolean().default(false),
});

// infer type
export interface ToDo extends Omit<z.infer<typeof todoSchema>, "due"> {
  due: string | Date | null;
}

export type List = {
  id: string;
  name: string;
  todos?: Array<ToDo> | undefined;
};
