import { getPowerPlantsCoordinates } from "./power-plants-coordinates.js";
import { PowerPlantWithCoordinates } from "./schemas/PowerPlantResponse.schema.js";

import { SUSPICIOUS_PERSONS_LIST } from "./constants.js";
import { PeopleService } from "./services/peopleService.js";

const initializeData = async () => {
  const powerPlantsWithCoordinates: PowerPlantWithCoordinates[] = JSON.parse(await getPowerPlantsCoordinates());
  const personLocations = await PeopleService.getAllPeoplesLocations(SUSPICIOUS_PERSONS_LIST);

  return {powerPlantsWithCoordinates, personLocations};
}

export const initTask2 = async () => {
  const {personLocations, powerPlantsWithCoordinates} = await initializeData()

};
