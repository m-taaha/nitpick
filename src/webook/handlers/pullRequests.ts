import { getInstallationOctokit } from "../../github/auth";

export async function onPullRequest(payload: any) {
  const { action, pull_request, repository, installation } = payload;
  if (!["opened", "synchronize"].includes(action)) return;

  console.log(
    `PR #${pull_request.number} ${action} on ${repository.full_name}`,
  );

//   queue job here next
}
