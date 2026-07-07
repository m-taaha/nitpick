import { Job } from "bullmq";
import { ReviewJob } from "../types";
import { getInstallationOctokit } from "../github/auth";
import { fetchPRDiff } from "../github/diff";

export async function processReview(job: Job<ReviewJob>) {
  const { prNumber, repoOwner, repoName, installationId } = job.data;

  const octokit = await getInstallationOctokit(installationId);
  const diff = await fetchPRDiff(octokit, repoOwner, repoName, prNumber);

  console.log(`Fetched ${diff.length} changed files for PR #${prNumber}`);
  diff.forEach((f) =>
    console.log(`  → ${f.filename} (${f.patch.length} chars)`),
  );
  // Phase 6: AI review here
}
