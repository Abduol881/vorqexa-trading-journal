export type ImportSource = "manual" | "csv" | "vorqexa_dex";

export type ImportRunStatus =
  | "pending"
  | "processing"
  | "completed"
  | "completed_with_errors"
  | "failed";

export interface ImportRowIssue {
  rowNumber: number;
  code: string;
  message: string;
}

/**
 * Builds a stable identity for an upstream execution.
 * The database must still enforce uniqueness; this helper supports normalization
 * and duplicate checks but is not a replacement for a database constraint.
 */
export function executionIdentity(accountId: string, externalExecutionId: string): string {
  const account = accountId.trim();
  const execution = externalExecutionId.trim();
  if (!account) throw new Error("accountId is required");
  if (!execution) throw new Error("externalExecutionId is required");
  return `${account}:${execution}`;
}
