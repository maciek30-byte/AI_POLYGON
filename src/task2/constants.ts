export const POWER_PLANTS_LIST = {
  power_plants: {
    Zabrze: {
      is_active: true,
      power: "35 MW",
      code: "PWR3847PL",
    },
    "Piotrków Trybunalski": {
      is_active: true,
      power: "28 MW",
      code: "PWR5921PL",
    },
    Grudziądz: {
      is_active: true,
      power: "1138 MW",
      code: "PWR7264PL",
    },
    Tczew: {
      is_active: true,
      power: "31 MW",
      code: "PWR1593PL",
    },
    Radom: {
      is_active: true,
      power: "38 MW",
      code: "PWR8406PL",
    },
    Chelmno: {
      is_active: true,
      power: "128 MW",
      code: "PWR2758PL",
    },
    Żarnowiec: {
      is_active: false,
      power: "0 MW",
      code: "PWR6132PL",
    },
  },
};

export const SUSPICIOUS_PERSONS_LIST = [
  {
    id: 1448,
    name: "Cezary",
    surname: "Żurek",
    gender: "M",
    birthDate: "1987-08-07",
    birthPlace: "Grudziądz",
    birthCountry: "Polska",
    job: "Jest kluczowym specjalistą w dziedzinie przepływu towarów, odpowiedzialnym za optymalizację procesów. Zajmuje się zarządzaniem magazynami i transportem.",
    tags: ["transport"],
  },
  {
    id: 3698,
    name: "Jacek",
    surname: "Nowak",
    gender: "M",
    birthDate: "1991-11-23",
    birthPlace: "Grudziądz",
    birthCountry: "Polska",
    job: "Kluczowy gracz w świecie, gdzie towary muszą docierać do celu szybko i sprawnie. Odpowiada za wybór najlepszych metod transportu, negocjacje z przewoźnikami i zarządzanie dokumentacją.",
    tags: ["transport"],
  },
  {
    id: 6577,
    name: "Oskar",
    surname: "Sieradzki",
    gender: "M",
    birthDate: "1993-12-18",
    birthPlace: "Grudziądz",
    birthCountry: "Polska",
    job: "Osoba ta jest odpowiedzialna za to, aby materiały trafiały tam, gdzie są potrzebne, w odpowiednim czasie i ilości. Analizuje potrzeby i projektuje najlepsze rozwiązania.",
    tags: ["transport"],
  },
  {
    id: 8953,
    name: "Wojciech",
    surname: "Bielik",
    gender: "M",
    birthDate: "1986-06-24",
    birthPlace: "Grudziądz",
    birthCountry: "Polska",
    job: "Zajmuje się kompleksowym zarządzaniem ruchem towarowym, od planowania po realizację. To on decyduje, gdzie trafiają poszczególne towary. Jego celem jest zapewnienie maksymalnej efektywności i minimalizacji kosztów.",
    tags: ["transport"],
  },
  {
    id: 11140,
    name: "Wacław",
    surname: "Jasiński",
    gender: "M",
    birthDate: "1986-03-01",
    birthPlace: "Grudziądz",
    birthCountry: "Polska",
    job: "Ta osoba jest mózgiem operacji związanych z przepływem towarów. Jej zadaniem jest zapewnienie, że wszystkie elementy systemu działają spójnie.",
    tags: ["transport"],
  },
]

export type SuspectPerson = typeof SUSPICIOUS_PERSONS_LIST[number]