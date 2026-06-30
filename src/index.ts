import "dotenv/config";
import express from "express";
import { router } from "./routes/index.js";
import { sendPersonsTaggedAsATransportSequence } from "./task-1/pipeline.js";
import { initTask2 } from "./task2/task2-sequence.js";
import app from "./server.js";

const PORT = process.env.PORT ?? 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  
});
