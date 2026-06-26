import { PowerPlantWithCoordinates } from "../schemas/PowerPlantResponse.schema.js";
import { PeopleService, PersonWithCoordinates } from "../services/peopleService.js";
import { findClosestToPlant } from "../haversineDistance.js";
import { AnswerService } from "../../shared/answerService.js";

export class HandlersService {
  constructor(
    private personLocations: PersonWithCoordinates[],
    private powerPlantsWithCoordinates: PowerPlantWithCoordinates[],
  ) {}

  async find_closest_suspect_to_plant(_args: Record<string, never>) {
    return findClosestToPlant(this.personLocations, this.powerPlantsWithCoordinates);
  }

  async get_access_level(args: { name: string; surname: string; birthDate: string }) {
    return PeopleService.getPersonAccessLevel(args);
  }

  async send_final_response(args: { payload: { name: string; surname: string; accessLevel: string; powerPlant: string } }) {
    const result = await AnswerService.sendResponse({
      apikey: process.env.AI_DEVS_API_KEY,
      task: "findhim",
      answer: args.payload,
    });
    console.log("THIS IS FINAL RESPONSE", result);
    return result;
  }
}
