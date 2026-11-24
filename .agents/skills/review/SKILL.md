---
name: review
description: Reviews TSTL changes in complete rounds across callers, types, tests, and package artifacts.
---

# Review

Review the complete change in the current checkout. Trace each changed behavior from the public entry point through its implementation, tests, and any range wrapper. Verify each finding with a reproduction or a concrete contractual difference.

For packaging, check the manifest, the built declarations, and the archive with both module formats. For behavioral changes, check the test against the failure it claims to catch, then run the full suite.

Fix the findings together by cause before starting a new verification round. Report material verification gaps with the check that remains.
