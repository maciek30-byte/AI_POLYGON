import { getPowerPlantsCoordinates } from "./power-plants-coordinates.js";
import { PeopleService, PersonWithCoordinates } from "./services/peopleService.js";
import { SUSPECTED_PERSONS_LIST } from "./constants.js";
import { HandlersService } from "./tools/handlers.service.js";
import { GeminiAgentService } from "../shared/geminiAgent.service.js";
import { functionDeclarations } from "./tools/functionDeclarations.js";

const systemPrompt = `Your task is find which person is the closest person near the one of power plant, after that you need
fetch he's/her access level, when you know everything send final response, make sure that you have all data which is required

`;

type PowerPlantsInfo = { place: string; code: string; lat: number; long: number };

const initialData = async (): Promise<{ powerPlantsWithCoordinates: PowerPlantsInfo[]; peoplesLocations: PersonWithCoordinates[] }> => {
  try {
    const powerPlantsLocationsParsed = JSON.parse(await getPowerPlantsCoordinates()) as PowerPlantsInfo[];
    const peoplesLocations = await PeopleService.getAllPeoplesLocations(SUSPECTED_PERSONS_LIST);

    return { powerPlantsWithCoordinates: powerPlantsLocationsParsed, peoplesLocations };
  } catch (error) {
    throw new Error("Failed to fetch initial data, try it again");
  }
};

export const initTask2 = async () => {
  try {
    const { powerPlantsWithCoordinates, peoplesLocations } = await initialData();
    const handlersService = new HandlersService(peoplesLocations, powerPlantsWithCoordinates);
    const agentService = new GeminiAgentService(process.env.GEMINI_AI_PRIMARY_KEY!);

    await agentService.runAgent({
      handlers: {
        find_closest_suspect_to_plant: (args) => handlersService.find_closest_suspect_to_plant(args),
        get_access_level: (args) => handlersService.get_access_level(args),
        send_final_response: (args) => handlersService.send_final_response(args),
      },
      functionDeclarations,
      systemInstruction: `${systemPrompt}
      Power plants: ${JSON.stringify(powerPlantsWithCoordinates)}
Suspects locations: ${JSON.stringify(peoplesLocations)}\`,
      `,
    });
  } catch (error) {
    console.error(error);
    throw error
  }
};
