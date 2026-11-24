---
name: project
description: Identifies TSTL's package owners, public compatibility contract, and workspace commands.
---

# Project

- `src` owns the published library. The root package manifest defines its CommonJS, ESM, and declaration entry points. Preserve existing public signatures, imports, and supported behavior.
- `src/test` contains the automated test suite. `src/benchmark` contains benchmarks.
- Use the C++ standard library as the reference for an algorithm or container. Preserve published TypeScript adaptations when the standard's interface differs. A proposed new public feature needs a corresponding standard-library feature and authorization to change the public API.
- Use `npm run build` to compile the package and `npm test` to run all automated tests against the build.
