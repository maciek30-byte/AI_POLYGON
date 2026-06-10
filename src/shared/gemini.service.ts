import { GenerateContentConfig, GenerateContentResponse, GoogleGenAI } from "@google/genai";
import { CacheUtil } from "./cache-util.js";

type GeminiModel = "gemini-2.5-flash" | "gemini-2.5-pro" | "gemini-2.5-flash-lite";

interface GenerateOptions {
  model?: GeminiModel;
  prompt: string;
  config?: GenerateContentConfig;
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

  async generateStream({ prompt, model = this.defaultModel }: GenerateOptions): Promise<void> {
    const stream = await this.ai.models.generateContentStream({
      model,
      contents: prompt,
    });

    for await (const chunk of stream) {
      process.stdout.write(chunk.text ?? "");
    }
  }

  private async withRetry<T>(fn: () => Promise<T>, retries = 3): Promise<T> {
    for (let attempt = 1; attempt <= retries; attempt++) {
      try {
        return await fn();
      } catch (error) {
        if (attempt === retries) throw error;
        console.log(`Attempt ${attempt} failed, retrying...`);
        await new Promise((resolve) => setTimeout(resolve, 1000 * attempt));
      }
    }
    throw new Error("Unreachable");
  }
}
