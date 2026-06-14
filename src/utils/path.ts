import { join } from "path"

export const PROJECT_ROOT = join(import.meta.dirname, "..", "..")
export const SRC_DIR = join(PROJECT_ROOT, "src")
export const DATA_DIR  = join(SRC_DIR, "data")
export const PUBLIC_DIR = join(PROJECT_ROOT, "public")

export function resolvePath(relativePath: string): string {
  return join(PROJECT_ROOT, relativePath)
}