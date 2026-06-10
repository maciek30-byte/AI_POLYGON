import { z } from "zod";
import { OpenAI } from "openai";
import { ServicesUtil } from "./servicesUtil.js";
import zodToJsonSchema from "zod-to-json-schema";
import { zodResponseFormat } from "openai/helpers/zod";
import { CacheUtil } from "./cache-util.js";

export type OpenRouterModel =
  | "anthropic/claude-3.5-sonnet"
  | "google/gemini-2.5-pro"
  | "google/gemini-2.5-flash"
  | "meta-llama/llama-3-70b-instruct"
  | "openai/gpt-4o"
  | "meta-llama/llama-3.1-8b-instruct:free"
  | (string & {});

interface GenerateOptions {
  model?: OpenRouterModel;
  prompt: string;
  systemPrompt?: string;
  temperature?: number;
  config?: {
    systemPrompt?: string;
    temperature?: number;
  }
}

interface StructuredGenerateOptions<T extends z.ZodType> extends Omit<GenerateOptions, "schema"> {
  schema: T;
  schemaName?: string;
}

export class OpenRouterService {
  private openai: OpenAI;
  private defaultModel: OpenRouterModel = "meta-llama/llama-3.1-8b-instruct:free";

  constructor(apiKey: string) {
    this.openai = new OpenAI({
      baseURL: "https://openrouter.ai/api/v1",
      apiKey: apiKey,
      defaultHeaders: {
        "HTTP-Referer": "http://localhost:3000",
        "X-Title": "My Local Dev App",
      },
    });
  }

  async generateText({ prompt, model = this.defaultModel, systemPrompt, temperature = 0.7 }: GenerateOptions): Promise<string> {
    const cached = CacheUtil.get(prompt, model);
    if (cached) return cached;
    return await ServicesUtil.withRetry(async () => {
      const messages: OpenAI.Chat.ChatCompletionMessageParam[] = [
        ...(systemPrompt ? [{ role: "system" as const, content: systemPrompt }] : []),
        { role: "user" as const, content: prompt },
      ];

      const response = await this.openai.chat.completions.create({
        model,
        messages,
        temperature,
      });

      const result = response.choices[0]?.message?.content ?? "";
      CacheUtil.set(prompt, model, result);

      return result;
    });
  }

  async generateStructured<T extends z.ZodTypeAny>(
    { prompt, model = this.defaultModel, config, schema }: StructuredGenerateOptions<T>,
  ): Promise<z.infer<T>> {
    const cached = CacheUtil.get(prompt, model);
    if (cached) return schema.parse(JSON.parse(cached));

    return await ServicesUtil.withRetry(async () => {
      const response = await this.openai.chat.completions.parse({
        model,
        messages: [
          ...(config?.systemPrompt ? [{ role: "system" as const, content: config.systemPrompt }] : []),
          { role: "user" as const, content: prompt },
        ],
        temperature: config?.temperature ?? 0.7,
        response_format: zodResponseFormat(schema, "result"),
      });

      const parsedData = response.choices[0]?.message?.parsed;
      CacheUtil.set(prompt, model, JSON.stringify(parsedData));


      if (!parsedData) {
        throw new Error("Failed to parse result");
      }

      return parsedData;
    });
  }
}