import { Type, FunctionDeclaration } from "@google/genai";

export const toolsDeclarations: FunctionDeclaration[] = [
  {
    name: "get_package_status",
    description: "It returns information about package status based on id",
    parameters: {
      type: Type.OBJECT,
      properties: {
        packageid: { type: Type.STRING, description: "id of requested package in format PKG12345678" },
      },
      required: ["packageid"],
    },
  },
  {
    name: "redirect_package",
    description: "It returns selected package to place where user pick",
    parameters: {
      type: Type.OBJECT,
      properties: {
        packageid: { type: Type.STRING, description: "id of requested package in format PKG12345678" },
        destination: { type: Type.STRING, description: "place where user want to redirect package" },
        code: { type: Type.STRING, description: "seciurity code provide by operator" },
      },
      required: ["packageid", "destination", "code"],
    },
  },
  // {
  //   name: "send_final_response",
  //   description: "Send final response to verify service",
  //   parameters: {
  //     type: Type.OBJECT,
  //     properties: {
  //       payload: {
  //         type: Type.OBJECT,
  //         properties: {
  //           name: { type: Type.STRING, description: "Name of the person" },
  //           surname: { type: Type.STRING, description: "Surname of the person" },
  //           accessLevel: { type: Type.STRING, description: "Access Level of the person" },
  //           powerPlant: { type: Type.STRING, description: "Power Plant CODE" },
  //         },
  //         required: ["name", "surname", "accessLevel", "powerPlant"],
  //       },
  //     },
  //     required: ["payload"],
  //   },
  // },
];
