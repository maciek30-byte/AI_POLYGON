import type { PersonRecord, PersonRecordWithId, ResponseRecord } from "./types.js";

export const enhanceWithId = (persons: PersonRecord[]): PersonRecordWithId[] =>
  persons.map((person, index) => ({ id: index, ...person }));

export const toJobDescriptionsWithId = (
  persons: PersonRecordWithId[],
): (Pick<PersonRecord, "job"> & { id: number })[] =>
  persons.map((person) => ({ id: person.id, job: person.job }));

export const buildTagsMap = (records: ResponseRecord[]): Map<number, string[]> => {
  const map = new Map<number, string[]>();
  for (const record of records) {
    map.set(record.id, record.tags);
  }
  return map;
};

export const mergeTagsIntoPersons = (
  persons: PersonRecordWithId[],
  tagsMap: Map<number, string[]>,
) => persons.map((person) => ({ ...person, tags: tagsMap.get(person.id) }));

export const toAnswerPayload = (
  persons: ReturnType<typeof mergeTagsIntoPersons>,
) =>
  persons.map((person) => ({
    name: person.name,
    surname: person.surname,
    gender: person.gender,
    born: new Date(person.birthDate).getFullYear(),
    city: person.birthPlace,
    tags: person.tags,
  }));
