import { Queue } from "bullmq";
import { redis } from "../config";
import { ReviewJob } from "../types";

export const reviewQueue = new Queue<ReviewJob>("reviews", {
  connection: redis,
  defaultJobOptions: {
    attempts: 3,
    backoff: { type: "exponential", delay: 5000 },
    removeOnComplete: 100,
    removeOnFail: 200,
  },
});
