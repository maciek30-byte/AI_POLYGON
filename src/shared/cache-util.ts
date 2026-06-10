import { createHash } from "crypto";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";

const CACHE_FILE = ".cache/llm-cache.json";

export class CacheUtil {
  static get(prompt: string, model: string): string | null {
    const cache = CacheUtil.readCacheFile();
    const key = CacheUtil.buildKey(prompt, model);
    return cache[key] ?? null;
  }

  static set(prompt: string, model: string, value: string): void {
    const cache = CacheUtil.readCacheFile();
    const key = CacheUtil.buildKey(prompt, model);
    cache[key] = value;
    writeFileSync(CACHE_FILE, JSON.stringify(cache, null, 2));
  }

  private static buildKey(prompt: string, model: string): string {
    return createHash("sha256").update(`${model}::${prompt}`).digest("hex");
  }

  private static readCacheFile(): Record<string, string> {
    if (!existsSync(".cache")) {
      mkdirSync(".cache", { recursive: true });
    }
    if (!existsSync(CACHE_FILE)) {
      writeFileSync(CACHE_FILE, JSON.stringify({}));
      return {};
    }
    try {
      return JSON.parse(readFileSync(CACHE_FILE, "utf-8"));
    } catch {
      return {};
    }
  }
}
