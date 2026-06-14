import { SuspectPerson } from "./constants.js";

export type PersonWithCoordinates = {
  fullName: string;
  coordinates: {
    latitude: number;
    longitude: number;
  }[];
};

const getPersonLocation = async (personData: { name: string; surname: string }): Promise<PersonWithCoordinates> => {
  const response = await fetch("https://hub.ag3nts.org/api/location", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      apikey: process.env.AI_DEVS_API_KEY,
      name: personData.name,
      surname: personData.surname,
    }),
  });
  const coordinates = (await response.json()) as { latitude: number; longitude: number }[];

  return { fullName: `${personData.name} ${personData.surname}`, coordinates: coordinates };
};

const getPersonAccessLevel = async (personData: { name: string; surname: string; birthYear: number }) => {
  return await fetch("https://hub.ag3nts.org/api/accesslevel", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      apikey: process.env.AI_DEVS_API_KEY,
      name: personData.name,
      surname: personData.surname,
      birthYear: personData.birthYear,
    }),
  }).then((response: Response) => response.json());
};

export const getAllPeoplesLocations = async (suspects: SuspectPerson[]): Promise<PersonWithCoordinates[] | undefined> => {
  try {
    const promisesList = suspects.map(({ name, surname }) => getPersonLocation({ name, surname }));

    return await Promise.all(promisesList);
  } catch (e) {
    console.error(e);
  }
};
