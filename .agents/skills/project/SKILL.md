---
name: project
description: Identifies TSTL's package owners, public compatibility contract, and workspace commands.
---

# Project

- `packages/tstl` owns the published package, its source, and its CommonJS, ESM, and declaration entry points. Preserve its existing public signatures, imports, and supported behavior.
- `test` is a private consumer workspace. Its tests and benchmarks import the built `tstl` package with a workspace dependency.
- Use the C++ standard library as the reference for an algorithm or container. Preserve published TypeScript adaptations when the standard's interface differs. A proposed new public feature needs a corresponding standard-library feature and authorization to change the public API.
- Use `pnpm build` to compile the package and copy the root README. Use `pnpm test` to rebuild and run all automated tests. `pnpm api` generates the API documentation.
