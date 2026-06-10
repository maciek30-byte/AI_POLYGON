type Person = {
  gender: "M" | "F";
  birthDate: string;
  birthPlace: string;
};

type Filter<T> = (item: T) => boolean;

const combineFilters =
  <T>(...filters: Filter<T>[]) =>
  (item: T): boolean =>
    filters.every((filter) => filter(item));

const isMale: Filter<Person> = (person) => person.gender === "M";

const isBetween20and40: Filter<Person> = (person) => {
  const today = new Date();
  const birth = new Date(person.birthDate);

  const age = today.getFullYear() - birth.getFullYear();
  const hasBirthdayPassed =
    today.getMonth() > birth.getMonth() ||
    (today.getMonth() === birth.getMonth() &&
      today.getDate() >= birth.getDate());

  const exactAge = hasBirthdayPassed ? age : age - 1;

  return exactAge >= 20 && exactAge <= 40;
};

const isBornInGrudziadz: Filter<Person> = (person) =>
  person.birthPlace === "Grudziądz";

export const happyMensFilters = combineFilters(
  isMale,
  isBornInGrudziadz,
  isBetween20and40,
);

