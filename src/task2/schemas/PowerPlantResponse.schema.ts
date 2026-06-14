import {z} from'zod'
export const PowerPlantResponseSchema = z.array(
  z.object({
    place: z.string(),
    code: z.string(),
    lat: z.number(),
    long: z.number(),
  })
)

export type PowerPlantWithCoordinates = z.infer<typeof PowerPlantResponseSchema.element>

