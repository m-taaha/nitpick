import { App } from "@octokit/app";
import { config } from "../config";

export const githubApp = new App({
  appId: config.appId,
  privateKey: config.privateKey,
  webhooks: { secret: config.webhookSecret },
});

export async function getInstallationOctokit(installationId: number) {
  return githubApp.getInstallationOctokit(installationId);
}
