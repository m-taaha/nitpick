import { Worker } from "bullmq";
import { redis } from "./config";
import { processReview } from "./queue/processor";

const worker = new Worker("reviews", processReview, {
  connection: redis,
  concurrency: 3,
});

worker.on("completed", (job) => console.log(`Job ${job.id} completed`));
worker.on("failed", (job, err) =>
  console.error(`Job ${job?.id} failed:`, err.message),
);

console.log("Worker listening for review jobs...");
