import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const PROJECT_ROOT = join(__dirname, "..", "..");
export const SRC_DIR = join(PROJECT_ROOT, "src");
export const DATA_DIR = join(SRC_DIR, "data");
export const PUBLIC_DIR = join(PROJECT_ROOT, "public");

export function resolvePath(relativePath: string): string {
  return join(PROJECT_ROOT, relativePath);
}
