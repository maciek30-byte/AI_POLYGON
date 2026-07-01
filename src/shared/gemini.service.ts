import { GenerateContentConfig, GenerateContentResponse, GoogleGenAI, Content, FunctionDeclaration } from "@google/genai";
import { CacheUtil } from "./cache-util.js";

type GeminiModel = "gemini-2.5-flash" | "gemini-2.5-pro" | "gemini-2.5-flash-lite";

interface GenerateOptions {
  model?: GeminiModel;
  prompt: string;
  config?: GenerateContentConfig;
}

interface AgentTurnOptions {
  model?: GeminiModel;
  history: Content[]; // <- to jest ten nowy argument
  userMessage: string;
  systemInstruction?: string;
  tools?: FunctionDeclaration[];
  toolExecutor: (name: string, args: any) => Promise<any>; // Twoja logika biznesowa
  maxIterations?: number;
}

export class GeminiService {
  private ai: GoogleGenAI;
  private defaultModel: GeminiModel = "gemini-2.5-flash-lite";

  constructor(apiKey: string) {
    this.ai = new GoogleGenAI({ apiKey });
  }

  async generateResponse({ prompt, model = this.defaultModel, config }: GenerateOptions): Promise<string> {
    const cached = CacheUtil.get(prompt, model);
    if (cached) return cached;

    return await this.withRetry(async () => {
      const response: GenerateContentResponse = await this.ai.models.generateContent({
        model,
        contents: prompt,
        config,
      });
      const result = response.text ?? "";
      CacheUtil.set(prompt, model, result);
      return result;
    });
  }

  async runAgentTurn({
    history,
    userMessage,
    model = this.defaultModel,
    systemInstruction,
    tools = [],
    toolExecutor,
    maxIterations = 5,
  }: AgentTurnOptions): Promise<{ text: string; history: Content[] }> {
    history.push({ role: "user", parts: [{ text: userMessage }] });

    for (let i = 0; i < maxIterations; i++) {
      const response = await this.withRetry(() =>
        this.ai.models.generateContent({
          model,
          contents: history,
          config: {
            systemInstruction,
            tools: tools.length ? [{ functionDeclarations: tools }] : undefined,
          },
        }),
      );

      const calls = response.functionCalls;
      if (!calls || calls.length === 0) {
        const text = response.text ?? "";
        history.push({ role: "model", parts: [{ text }] });
        return { text, history };
      }

      history.push({
        role: "model",
        parts: calls.map((c) => ({ functionCall: c })),
      });

      const results = await Promise.all(
        calls.map(async (c) => ({
          name: c.name,
          response: { value: await toolExecutor(c.name!, c.args) },
        })),
      );

      history.push({
        role: "user",
        parts: results.map((r) => ({ functionResponse: r })),
      });
    }

    throw new Error("You reached operation limit");
  }

  private async withRetry<T>(fn: () => Promise<T>, retries = 3): Promise<T> {
    for (let attempt = 1; attempt <= retries; attempt++) {
      try {
        return await fn();
      } catch (error) {
        if (attempt === retries) throw error;
        await new Promise((resolve) => setTimeout(resolve, 1000 * attempt));
      }
    }
    throw new Error("Unreachable");
  }
}
