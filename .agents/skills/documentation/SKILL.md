---
name: documentation
description: Updates TSTL usage documentation, JSDoc contracts, and the generated package README.
---

# Documentation

Edit the root README. The package build and prepack steps copy it to `packages/tstl/README.md` for npm. Verify published links from the package context.

Use JSDoc to explain preconditions, half-open ranges, return positions, mutation, iterator validity, and meaningful complexity guarantees. Match each parameter name to its overload. Keep measurements tied to the measured code path and input.

Run `pnpm api` to verify JSDoc and check new or changed commands against the workspace.
