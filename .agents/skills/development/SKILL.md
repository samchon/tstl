---
name: development
description: Changes and verifies TSTL source, tests, workspace wiring, and release workflows.
---

# Development

Establish the supported behavior from the public declaration, existing callers, and the [STL contract](../contracts/SKILL.md). Trace a failure through the public entry point and any `ranges` adapter before editing.

Gather reproducible failures, test results, and measurements together. Repair shared causes in one batch. Keep the existing public declarations and entry points compatible through changes to implementation and packaging.

Use `pnpm install --frozen-lockfile` to reproduce the workspace. Run `pnpm test` to check the complete suite against the built package. To run an individual assertion after a build, use `node test/lib/test <name>` from the root.

When changing packaging, run `pnpm --filter tstl pack` and exercise `require("tstl")` and `import "tstl"` in a consumer of the archive. For a release change, verify the tag logic and packaging without publishing.
