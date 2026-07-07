import { AIComment, DiffFile } from "../types";

const SKIP_PATTERNS = /\.(lock|min\.js|min\.css|map)$|node_modules/;
const MAX_CHARS = 80_000;

export async function fetchPRDiff(
  octokit: any,
  owner: string,
  repo: string,
  prNumber: number,
): Promise<DiffFile[]> {
  const { data: files } = await octokit.request(
    "GET /repos/{owner}/{repo}/pulls/{pull_number}/files",
    { owner, repo, pull_number: prNumber, per_page: 100 },
  );

  const result: DiffFile[] = [];
  let totalChars = 0;

  for (const f of files) {
    if (SKIP_PATTERNS.test(f.filename)) continue;
    if (!f.patch) continue;
    if (totalChars + f.patch.length > MAX_CHARS) break;

    result.push({ filename: f.filename, patch: f.patch });
    totalChars += f.patch.length;
  }

  return result;
}
