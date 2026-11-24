---
name: contracts
description: Checks TSTL behavior against C++ STL contracts and selects high-value unit tests.
---

# Contracts

Check the relevant C++ standard clause for accepted input, the result, mutation, ordering, iterator validity, and complexity. Verify the TypeScript API separately wherever its existing contract differs.

Use the smallest deterministic case that catches each distinct failure. Prefer a literal expected result or an independent array model over a second path through TSTL. A single well-chosen case can check the return position, range boundaries, retained values, and tie order.

For algorithm cost, count comparisons or iterator moves. For asynchronous code, assert completion order or state transitions and use a deadline only to stop a stalled test. Cover one representative path through each implementation that shares the cause.
