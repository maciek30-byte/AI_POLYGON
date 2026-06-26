import { Type } from "@google/genai";

export const functionDeclarations = [
  {
    name: "find_closest_suspect_to_plant",
    description: "It returns person who is the nearest to Power plant",
    parameters: {
      type: Type.OBJECT,
      properties: {},
    },
  },
  {
    name: "get_access_level",
    description: "Return access level selected person",
    parameters: {
      type: Type.OBJECT,
      properties: {
        name: { type: Type.STRING, description: "Name of the person" },
        surname: { type: Type.STRING, description: "Surname of the person" },
        birthDate: { type: Type.STRING, description: "full date of person birth day" },
      },
      required: ["name", "surname", "birthDate"],
    },
  },
  {
    name: "send_final_response",
    description: "Send final response to verify service",
    parameters: {
      type: Type.OBJECT,
      properties: {
        payload: {
          type: Type.OBJECT,
          properties: {
            name: { type: Type.STRING, description: "Name of the person" },
            surname: { type: Type.STRING, description: "Surname of the person" },
            accessLevel: { type: Type.STRING, description: "Access Level of the person" },
            powerPlant: { type: Type.STRING, description: "Power Plant CODE" },
          },
          required: ["name", "surname", "accessLevel", "powerPlant"],
        },
      },
      required: ["payload"],
    },
  },
];
