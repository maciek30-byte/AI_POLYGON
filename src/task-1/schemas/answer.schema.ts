import { z } from "zod";

const PersonSchema = z.object({
  name: z.string(),
  surname: z.string(),
  gender: z.enum(["M", "F"]),
  born: z.number().int().min(1900).max(new Date().getFullYear()),
  city: z.string(),
  tags: z.array(z.string()),
});

export const PeopleResponseSchema = z.object({
  apikey: z.string(),
  task: z.literal("people"),
  answer: z.array(PersonSchema),
});


type Person = z.infer<typeof PersonSchema>;
type PeopleResponse = z.infer<typeof PeopleResponseSchema>;
