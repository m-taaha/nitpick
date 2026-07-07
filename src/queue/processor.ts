import { Job } from "bullmq";
import { ReviewJob } from "../types";

export async function processReview(job: Job<ReviewJob>) {
  const { prNumber, repoOwner, repoName } = job.data;
  console.log(`Processing PR #${prNumber} in ${repoOwner}/${repoName}`);
  // Phase 5: fetch diff here
  // Phase 6: AI review here
  // Phase 7: post comments here
}
