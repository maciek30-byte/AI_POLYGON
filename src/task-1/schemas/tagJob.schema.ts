    import { z } from "zod";

export const TagJobResponseSchema = z.array(
  z.object({
    id: z.number(),
    tags: z.array(
      z.enum(["transport", "edukacja", "medycyna", "praca z ludźmi", "praca z pojazdami", "praca fizyczna"]),
    ),
  }),
);
