import { strict as assert } from "node:assert";
import { createRequire } from "node:module";
import std, * as esm from "tstl";

const cjs = createRequire(import.meta.url)("tstl");
assert.deepEqual(Object.keys(esm).sort(), Object.keys(cjs).sort());
assert.equal(std.Vector, esm.Vector);
assert.equal(cjs.default.Vector, cjs.Vector);

const values = new esm.Vector([3, 1, 2]);
std.sort(values.begin(), values.end());
assert.deepEqual([...values], [1, 2, 3]);
console.log("ESM and CommonJS entry points verified.");
