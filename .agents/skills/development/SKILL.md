---
name: development
description: Changes and verifies TSTL source, tests, workspace wiring, and release workflows.
---

# Development

Establish the supported behavior from the public declaration, existing callers, and the [STL contract](../contracts/SKILL.md). Trace a failure through the public entry point and any `ranges` adapter before editing.

Gather reproducible failures, test results, and measurements together. Repair shared causes in one batch. Keep the existing public declarations and entry points compatible through changes to implementation and packaging.

Run `npm run build` and then `npm test` to check the complete suite. To run a single named test after a build, use `node lib/test <name>` from the repository root.

When changing packaging, use `npm pack` and exercise `require("tstl")` and `import "tstl"` in a consumer of the archive. For a release change, verify tag logic and packaging with a dry run.
