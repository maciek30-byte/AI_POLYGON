import { GoogleGenAI, FunctionDeclaration } from "@google/genai";

type Handlers = Record<string, (args: any) => Promise<any>>;

export class GeminiAgentService {
  private ai: GoogleGenAI;
  private model: string = "gemini-2.5-flash";

  constructor(apiKey: string) {
    this.ai = new GoogleGenAI({ apiKey });
  }

  async runAgent({
    handlers,
    functionDeclarations,
    systemInstruction,
    model = this.model,
    maxIterations = 5,
  }: {
    handlers: Handlers;
    functionDeclarations: any[];
    systemInstruction: string;
    model?: string;
    maxIterations?: number;
  }) {
    const chat = this.ai.chats.create({
      model,
      config: {
        tools: [{ functionDeclarations }],
        systemInstruction,
      },
    });

    let response = await chat.sendMessage({ message: "Run agent." });

    for (let i = 0; i < maxIterations; i++) {
      console.log(`--- Iteration ${i + 1}/${maxIterations} ---`);
      const functionCalls = response.functionCalls;

      if (!functionCalls || functionCalls.length === 0) {
        console.log("Agent finished:", response.text);
        break;
      }

      for (const call of functionCalls) {
        console.log(`Calling: ${call.name}`, call.args);

        if(!call.name) continue;

        const result = await handlers[call.name](call.args);
        console.log(`Result:`, result);

        response = await chat.sendMessage({
          message: [
            {
              functionResponse: {
                name: call.name,
                response: { result: JSON.stringify(result) },
              },
            },
          ],
        });
      }

      console.warn("Max iterations reached!");
    }
  }
}
