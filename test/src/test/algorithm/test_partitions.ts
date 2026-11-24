import { strict as assert } from "assert";

import * as std from "tstl";

export function test_partition(): void {
  const values = [1, 2, 3, 4, 5, 6];
  const is_even = (value: number) => value % 2 === 0;
  const point = std.ranges.partition(values, is_even).index();
  assert.equal(point, 3);
  assert.ok(values.slice(0, point).every(is_even));
  assert.ok(values.slice(point).every((value) => !is_even(value)));
  assert.deepEqual(
    values.sort((x, y) => x - y),
    [1, 2, 3, 4, 5, 6],
  );
}

export function test_stable_partition(): void {
  const list = new std.List([0, 1, 2, 3, 4, 5, 6, 7]);
  const first = list.begin().next();
  const last = list.end().prev();
  let comparisons = 0;
  const point = std.stable_partition(first, last, (value) => {
    ++comparisons;
    return value % 2 === 0;
  });

  assert.deepEqual(Array.from(list), [0, 2, 4, 6, 1, 3, 5, 7]);
  assert.equal(std.distance(first, point), 3);
  assert.equal(comparisons, 6);

  for (const values of [[], [2, 4], [1, 3]]) {
    const is_even = (value: number) => value % 2 === 0;
    const original = values.slice();
    const result = std.ranges.stable_partition(values, is_even);
    assert.equal(result.index(), original.filter(is_even).length);
    assert.deepEqual(values, original);
  }
}

export function test_partitions(): void {
  const v = new std.Vector<number>();
  for (let i: number = 0; i < 1000; ++i) v.push_back(i);

  std.ranges.partition(v, _Pred);

  if (std.all_of(v.begin(), v.begin().advance(500), _Pred) === false)
    throw new Error("Bug on std.partition().");
  else if (std.ranges.is_partitioned(v, _Pred) === false)
    throw new Error("Bug on std.is_partitioned().");
}

function _Pred(val: number): boolean {
  return val < 500;
}
