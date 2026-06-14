import { PowerPlantWithCoordinates } from "./schemas/PowerPlantResponse.schema.js";
import { PersonRecord } from "../task-1/types.js";
import { PersonWithCoordinates } from "./get_peoples_location.js";

const haversineDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
};

export type ClosestPerson = {
  fullName: string;
  distance: number;
  plantCode: string;
  plantName: string;
};

export const findClosestToPlant = (personsLocations: PersonWithCoordinates[], powerPlants: PowerPlantWithCoordinates[]): ClosestPerson => {
  let best = { fullName: "", distance: Infinity, plantCode: "", plantName: "" };

  for (const person of personsLocations) {
    for (const coord of person.coordinates) {
      for (const plant of powerPlants) {
        const distance = haversineDistance(coord.latitude, coord.longitude, plant.lat, plant.long);
        if (distance < best.distance) {
          best = {
            fullName: person.fullName,
            distance,
            plantCode: plant.code,
            plantName: plant.place,
          };
        }
      }
    }
  }

  return best;
};
