import * as std from "tstl";

export function test_hash(): void {
  std.hash(1, 2, 3, {}, null, undefined, true);
}
