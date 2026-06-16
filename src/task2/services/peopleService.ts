import { SuspectPerson } from "../constants.js";

export type PersonWithCoordinates = {
  name: string;
  surname: string;
  birthDate: string;
  coordinates: {
    latitude: number;
    longitude: number;
  }[];
};
type PersonPayload = { name: string; surname: string; birthDate: string };
const BASE_URL = "https://hub.ag3nts.org/api";

export class PeopleService {
  static async #getPersonLocation({ name, surname, birthDate }: PersonPayload): Promise<PersonWithCoordinates> {
    try {
      const response = await fetch(`${BASE_URL}/location`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          apikey: process.env.AI_DEVS_API_KEY,
          name,
          surname,
        }),
      });

      const coordinates = (await response.json()) as { latitude: number; longitude: number }[];

      return {
        name,
        surname,
        birthDate,
        coordinates,
      };
    } catch (error) {
      console.error(`Failed to get person location: ${name}${surname}`);
      throw error;
    }
  }

  static async getAllPeoplesLocations(suspects: SuspectPerson[]): Promise<PersonWithCoordinates[]> {
    try {
      const promisesListList = suspects.map(({ name, surname, birthDate }) => this.#getPersonLocation({ name, surname, birthDate }));

      return await Promise.all(promisesListList);
    } catch (e) {
      console.error("Failed to fetch allPeopleLocations", e);
      throw e;
    }
  }

  static async getPersonAccessLevel({ name, surname, birthDate }: PersonPayload): Promise<{ accessLevel: string }> {
    try {
      const response = await fetch(`${BASE_URL}/accesslevel`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          apikey: process.env.AI_DEVS_API_KEY,
          name,
          surname,
          birthYear: birthDate,
        }),
      });

      return (await response.json()) as { accessLevel: string };
    } catch (error) {
      console.error("Failed to get person access level", error);
      throw error;
    }
  }
}
