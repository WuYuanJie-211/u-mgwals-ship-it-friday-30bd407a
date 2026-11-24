// Ship It Friday — the funniest one-line git commit message an AI
// coding agent writes in the moment before it breaks production
// on a Friday.
//
// The agent read the warning, took it seriously, and shipped anyway:
// the joke is the cheerful confidence of an agent that treats the
// warning as the only healthy thing left in prod.
//
// main.ts validates the entry against the competition gate and writes
// it to /output/entry.txt:
//   * 1–159 characters
//   * exactly one line (no CR/LF anywhere)
//   * not only whitespace
// Any violation exits non-zero and writes nothing.

import { mkdirSync, writeFileSync } from "node:fs";

const ENTRY =
  "fix: read the Friday deploy warning, nodded solemnly, and deployed anyway — it was the only thing in prod still working";

function validate(entry: string): void {
  if (entry.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
  if (entry.includes("\n") || entry.includes("\r")) {
    throw new Error("entry must be exactly one line");
  }
  if (entry !== entry.trim()) {
    throw new Error("entry must not have leading or trailing whitespace");
  }
  if (/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/.test(entry)) {
    throw new Error("entry must not contain control characters");
  }
  if (entry.length < 1 || entry.length > 159) {
    throw new Error(`entry must be 1-159 characters, got ${entry.length}`);
  }
  // The competition asks for a git commit message: it must open with a
  // conventional-commit style prefix (fix:, feat:, chore:, ...).
  if (!/^(fix|feat|chore|docs|refactor|test|deploy|hotfix)(\(.+\))?: /.test(entry)) {
    throw new Error("entry must read as a git commit message (type: subject)");
  }
}

validate(ENTRY);

mkdirSync("/output", { recursive: true });
// No trailing newline: the file must contain exactly one line,
// and a trailing "\n" would make naive line-splitters see two.
writeFileSync("/output/entry.txt", ENTRY, "utf8");

console.log(`Wrote ${ENTRY.length} characters to /output/entry.txt`);
