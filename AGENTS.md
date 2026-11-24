# AGENTS.md

TSTL implements C++ STL containers and algorithms in TypeScript. The [project skill](.agents/skills/project/SKILL.md) covers the package boundaries and compatibility contract.

## Working rules

- Run shell commands in PowerShell. Use one PowerShell session for each filesystem operation.
- Gather all relevant evidence in one inspection round. Identify the causes, fix them together, then run the next full verification round.
- For authorized Windows cleanup, resolve the task-owned paths before using `Remove-Item -LiteralPath` without `-Force`. Remove a junction before its owning scratch directory and preserve its target. If policy rejects a deletion with `-Force`, retry the same verified path without it.
- Write repository material in English and respond in the user's language.

## Skills

| Skill | Use when |
| --- | --- |
| [project](.agents/skills/project/SKILL.md) | Choosing package ownership, public behavior, or an entry point |
| [development](.agents/skills/development/SKILL.md) | Changing implementation, tests, CI, or dependencies |
| [contracts](.agents/skills/contracts/SKILL.md) | Checking STL behavior, iterator guarantees, or regression tests |
| [documentation](.agents/skills/documentation/SKILL.md) | Writing JSDoc, README content, or contributor instructions |
| [review](.agents/skills/review/SKILL.md) | Reviewing or verifying a change |
| [prompting](.agents/skills/prompting/SKILL.md) | Editing agent instructions or skills |
