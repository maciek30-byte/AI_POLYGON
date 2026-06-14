import { getAllPeoplesLocations } from "../get_peoples_location.js";
import { SuspectPerson } from "../constants.js";
import { PowerPlantWithCoordinates } from "../schemas/PowerPlantResponse.schema.js";

export const tools = [
    {
        type: 'function',
        name:'find_closest_suspect_to_plant',
        description:"It returns person who is the neearest to Power plant",
        parameters :{},
        strict:true
    },
    {
        type:"function",
        name:'get_acess_level',
        description:"Return acess level selected person",
        parameters:{}
        strict: true
    }
]


export const find_closest_suspect_to_plant = async (
  suspectedPersonList: SuspectPerson[],
  powerPlantsWithCoordinates: PowerPlantWithCoordinates[]
) => {
  const personLocations = await getAllPeoplesLocations(suspectedPersonList)
}