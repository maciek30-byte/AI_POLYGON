import { GeminiService } from "../shared/gemini.service.js";
import { POWER_PLANTS_LIST } from "./constants.js";
import { PowerPlantResponseSchema } from "./schemas/PowerPlantResponse.schema.js";


export const getPowerPlantsCoordinates  = async (): Promise<string>=>{
  const geminiService = new GeminiService(process.env.GEMINI_BACKUP_KEY!);
  
  return await geminiService.generateResponse({
    prompt: `For Each power plant generate their own coordinates based on response schema, place is Zarnowiec,Zabrze etc.
    this is the list ${JSON.stringify(POWER_PLANTS_LIST)}`,
    config: {
      responseMimeType: "application/json",
      responseSchema: PowerPlantResponseSchema.toJSONSchema(),
    },
  });
}