export type PersonRecord = {
  name: string;
  surname: string;
  gender: "F" | "M";
  birthDate: string;
  birthPlace: string;
  birthCountry: string;
  job: string;
};

export type PersonRecordWithId = PersonRecord & { id: number };

export type ResponseRecord = { id: number; tags: string[] };
