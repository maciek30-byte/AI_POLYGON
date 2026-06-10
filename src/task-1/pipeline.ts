import { GeminiService } from "../shared/gemini.service.js";
import { CSVUTIL } from "../utils/csv.js";
import { resolvePath } from "../utils/path.js";
import { happyMensFilters } from "./filter.js";
import { TAG_JOBS_PROMPT } from "./prompts/categorizeItems.js";
import { PeopleResponseSchema } from "./schemas/answer.schema.js";
import { PersonTagsSchema } from "./schemas/personTag.schema.js";
import type { PersonRecord, ResponseRecord } from "./types.js";
import {
  buildTagsMap,
  enhanceWithId,
  mergeTagsIntoPersons,
  toAnswerPayload,
  toJobDescriptionsWithId,
} from "./transformers.js";

export const sendPersonsTaggedAsATransportSequence = async () => {
  const geminiService = new GeminiService(process.env.GEMINI_BACKUP_KEY!);

  const csvPath = resolvePath("docs/people.csv");

  const rawResults = (await CSVUTIL.parseCSV(csvPath)) as PersonRecord[];
  const personsWithId = enhanceWithId(rawResults);

  const filteredJobDescriptions = toJobDescriptionsWithId(
    personsWithId.filter(happyMensFilters),
  );

  const taggedResults = await geminiService.generateResponse({
    prompt: `${TAG_JOBS_PROMPT}${JSON.stringify(filteredJobDescriptions)}`,
    config: {
      responseMimeType: "application/json",
      responseSchema: PersonTagsSchema.toJSONSchema(),
    },
  });

  const tagsMap = buildTagsMap(JSON.parse(taggedResults) as ResponseRecord[]);
  const personsWithTags = mergeTagsIntoPersons(personsWithId, tagsMap);
  const transportWorkers = personsWithTags.filter((p) => p.tags?.includes("transport"));

  const payload = {
    apikey: "a50287b9-ed7a-406d-91e1-df6cf443a140",
    task: "people",
    answer: toAnswerPayload(transportWorkers),
  };

  const validatedPayload = PeopleResponseSchema.parse(payload);

  const httpResponse = await fetch("https://hub.ag3nts.org/verify", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(validatedPayload),
  });

  const result = await httpResponse.json();
  console.log("External API response:", result);
};