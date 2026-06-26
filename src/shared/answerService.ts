import { response } from "express";

export class AnswerService {
  static async sendResponse<T>(payload: T) {
    const response = await fetch("https://hub.ag3nts.org/verify.", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const result = await response.json();
    console.log("THIS IS YOUR RESPONSE", result);
  }
}
