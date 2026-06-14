import { SuspectPerson } from "../constants.js";
import { PowerPlantWithCoordinates } from "../schemas/PowerPlantResponse.schema.js";


export const handlers = {
    async find_closest_suspect_to_plant(
        suspects: SuspectPerson[],
        powerPlantsLocations:PowerPlantWithCoordinates[]
    ){


    }
}
