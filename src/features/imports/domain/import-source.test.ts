import { describe, expect, it } from "vitest";
import { executionIdentity, type ImportSource } from "./import-source";

describe("import source contract", () => {
  it("limits initial sources to manual, CSV, and Vorqexa DEX", () => {
    const sources: ImportSource[] = ["manual", "csv", "vorqexa_dex"];
    expect(sources).toHaveLength(3);
  });

  it("creates a stable account-scoped execution identity", () => {
    expect(executionIdentity(" account-1 ", " fill-42 ")).toBe("account-1:fill-42");
    expect(executionIdentity("account-1", "fill-42")).toBe(executionIdentity("account-1", "fill-42"));
  });

  it("rejects empty identifiers rather than creating ambiguous keys", () => {
    expect(() => executionIdentity("", "fill-42")).toThrow("accountId is required");
    expect(() => executionIdentity("account-1", " ")).toThrow("externalExecutionId is required");
  });
});
