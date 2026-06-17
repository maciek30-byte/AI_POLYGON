import { PowerPlantWithCoordinates } from "../schemas/PowerPlantResponse.schema.js";
import { PeopleService, PersonWithCoordinates } from "../services/peopleService.js";
import { ClosestPerson, findClosestToPlant } from "../haversineDistance.js";
import { AnswerService } from "../../shared/answerService.js";

export const handlers = {
  find_closest_suspect_to_plant: async (
    args: { suspectedPersonList: PersonWithCoordinates[] },
    powerPlantsWithCoordinates: PowerPlantWithCoordinates[],
  ) => {
    return findClosestToPlant(args.suspectedPersonList, powerPlantsWithCoordinates);
  },

  get_access_level: async (args: { name: string; surname: string; birthDate: string }) => {
    return PeopleService.getPersonAccessLevel({
      name: args.name,
      surname: args.surname,
      birthDate: (args.birthDate),
    });
  },

  send_final_response: async(args:{url: string, payload:{name:string, surname:string,accessLevel:string, powerPlant: string}})=>{
    return AnswerService.sendResponse(args.url, {
      apikey: process.env.AI_DEVS_API_KEY,
      task: "findhim",
      answer: {
        name: args.payload.name,
        surname: args.payload.surname,
        accessLevel: args.payload.accessLevel,
        powerPlant: args.payload.powerPlant,
      },
    });
  }
};
