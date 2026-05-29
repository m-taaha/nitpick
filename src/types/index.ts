export interface ReviewJob {
  prNumber: number;
  repoOwner: string;
  repoName: string;
  headSha: string;
  installationId: number;
}

export interface DiffFile {
  filename: string;
  patch: string;
}

export interface AIComment {
  file: string;
  line: number;
  severity: "low" | "medium" | "high";
  comment: string;
}
