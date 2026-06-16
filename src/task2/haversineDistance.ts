import { PowerPlantWithCoordinates } from "./schemas/PowerPlantResponse.schema.js";
import { PersonWithCoordinates } from "./services/peopleService.js";

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
  name: string;
  surname: string;
  distance: number;
  plantCode: string;
  plantName: string;
  birthDate: string;
};

export const findClosestToPlant = (personsLocations: PersonWithCoordinates[], powerPlants: PowerPlantWithCoordinates[]): ClosestPerson => {
  let best = { name: "", surname: "", distance: Infinity, plantCode: "", plantName: "", birthDate: "" };

  for (const person of personsLocations) {
    for (const coordinate of person.coordinates) {
      for (const plant of powerPlants) {
        const distance = haversineDistance(coordinate.latitude, coordinate.longitude, plant.lat, plant.long);
        if (distance < best.distance) {
          best = {
            name: person.name,
            surname: person.surname,
            distance,
            plantCode: plant.code,
            plantName: plant.place,
            birthDate: person.birthDate,
          };
        }
      }
    }
  }

  return best;
};
