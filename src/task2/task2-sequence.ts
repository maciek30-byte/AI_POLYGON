import { getPowerPlantsCoordinates } from "./power-plants-coordinates.js";
import { PowerPlantWithCoordinates } from "./schemas/PowerPlantResponse.schema.js";
import { getAllPeoplesLocations } from "./get_peoples_location.js";
import { SUSPICIOUS_PERSONS_LIST } from "./constants.js";

export const initTask2 = async ()=>{
  // const powerPlantsWithCoordinates: PowerPlantWithCoordinates[] = JSON.parse(await getPowerPlantsCoordinates());
  console.log("persons",await getAllPeoplesLocations(SUSPICIOUS_PERSONS_LIST));
  console.log("persons", JSON.stringify(await getAllPeoplesLocations(SUSPICIOUS_PERSONS_LIST), null, 2));

  // console.log("Plants with Coordinates", powerPlantsWithCoordinates);



}