// src/webhook/handlers/pullRequest.ts

import { getInstallationOctokit } from "../../github/auth";

export async function onPullRequest(payload: any) {
  const { action, pull_request, repository, installation } = payload;
  if (!["opened", "synchronize"].includes(action)) return;

  // ── TEMPORARY TEST ──
  const octokit = await getInstallationOctokit(installation.id);
  const { data } = await octokit.request("GET /repos/{owner}/{repo}", {
    owner: repository.owner.login,
    repo: repository.name,
  });
  console.log("Authenticated! Repo stars:", data.stargazers_count);
  // ───────────────────
}
