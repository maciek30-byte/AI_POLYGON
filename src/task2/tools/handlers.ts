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

  get_access_level: async (args: { name: string; surname: string; birthday: string }) => {
    return PeopleService.getPersonAccessLevel({
      name: args.name,
      surname: args.surname,
      birthDate: args.birthday,
    });
  },

  send_final_response: async(args:{url: string, payload:{name:string, surname:string,accessLevel:string, powerPlant: string}})=>{
    return AnswerService.sendResponse(args.url,{
      name: args.payload.name,
      surname: args.payload.surname,
      accessLevel: args.payload.accessLevel,
      powerPlant:args.payload.powerPlant,
    })
  }
};
