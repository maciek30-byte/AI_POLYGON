import "dotenv/config";
import express from "express";
import { router } from "./routes/index.js";
import { sendPersonsTaggedAsATransportSequence } from "./task-1/pipeline.js";
import { initTask2 } from "./task2/task2-sequence.js";

const app = express();
const PORT = process.env.PORT ?? 3000;

app.use(express.json());
app.use("/", router);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  initTask2()
});
