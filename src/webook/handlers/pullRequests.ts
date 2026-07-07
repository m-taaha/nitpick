import { reviewQueue } from "../../queue/reviewQueue";
import { ReviewJob } from "../../types";

export async function onPullRequest(payload: any) {
  const { action, pull_request, repository, installation } = payload;
  if (!["opened", "synchronize"].includes(action)) return;

  const job: ReviewJob = {
    prNumber: pull_request.number,
    repoOwner: repository.owner.login,
    repoName: repository.name,
    headSha: pull_request.head.sha,
    installationId: installation.id,
  };

  await reviewQueue.add("review", job, {
    jobId: `pr-${repository.id}-${pull_request.number}`,
  });

  console.log(`Queued review for PR #${pull_request.number}`);
}
