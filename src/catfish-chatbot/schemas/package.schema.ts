import {z} from "zod"
export const packageIdSchema = z
  .string()
  .transform((val) => {
    if (val.startsWith("PKG")) {
      return val;
    }

    if (/^\d+$/.test(val)) {
      return `PKG${val}`;
    }
    return val;
  })
  .refine((val) => /^PKG\d{8}$/.test(val), {
    message: 'packageid must be "PKG" followed by 8 digits',
  });

export type PackageId = z.infer<typeof packageIdSchema>;

export const packageStatusResponseSchema = z.object({
  ok: z.boolean(),
  packageid: packageIdSchema,
  status: z.string(),
  message: z.string(),
});

export type PackageStatusResponse = z.infer<typeof packageStatusResponseSchema>;
