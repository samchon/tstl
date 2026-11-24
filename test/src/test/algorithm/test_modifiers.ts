import { strict as assert } from "assert";

import * as std from "tstl";

export function test_shift_boundaries(): void {
  for (const n of [0, 1, 3, 4]) {
    const left = [1, 2, 3];
    const right = [1, 2, 3];
    const left_end = std.shift_left(std.begin(left), std.end(left), n);
    const right_begin = std.shift_right(std.begin(right), std.end(right), n);
    assert.equal(left_end.index(), Math.max(0, left.length - n));
    assert.equal(right_begin.index(), Math.min(n, right.length));
    assert.deepEqual(left.slice(0, left_end.index()), [1, 2, 3].slice(n));
    assert.deepEqual(
      right.slice(right_begin.index()),
      [1, 2, 3].slice(0, Math.max(0, right.length - n)),
    );
  }
}

export function test_copy_backward_boundaries(): void {
  const source = [1, 2, 3];
  const target = [-1, -1, -1, -1, -1];
  const end = std.end(target).prev();
  assert.equal(
    std.copy_backward(std.begin(source), std.end(source), end).index(),
    1,
  );
  assert.deepEqual(target, [-1, 1, 2, 3, -1]);
  assert.equal(std.copy_backward(std.end(source), std.end(source), end), end);
}

export function test_ranges_transform_overloads(): void {
  const unary = [1, 2, 3];
  const end = std.ranges.transform(unary, std.begin(unary), (x) => x * x);
  assert.equal(end.index(), unary.length);
  assert.deepEqual(unary, [1, 4, 9]);

  const output: number[] = [];
  std.ranges.transform(
    [1, 2, 3],
    new std.List([10, 20, 30]),
    std.back_inserter(output),
    (x, y) => x + y,
  );
  assert.deepEqual(output, [11, 22, 33]);
}

export function test_rotate(): void {
  for (let length = 0; length <= 10; ++length) {
    const values = Array.from({ length }, (_, index) => index);
    for (let split = 0; split <= length; ++split) {
      const vector = new std.Vector([-1, ...values, -2]);
      const result = std.rotate(
        vector.nth(1),
        vector.nth(split + 1),
        vector.nth(length + 1),
      );

      assert.deepEqual(vector.data(), [
        -1,
        ...values.slice(split),
        ...values.slice(0, split),
        -2,
      ]);
      assert.equal(result.index(), 1 + length - split);
    }
  }

  const list = new std.ForwardList([1, 2, 3, 4, 5]);
  const result = std.ranges.rotate(list, std.advance(list.begin(), 2));
  assert.deepEqual(Array.from(list), [3, 4, 5, 1, 2]);
  assert.ok(result.equals(std.advance(list.begin(), 3)));
}

export function test_modifiers(): void {
  _Test_removes();
  _Test_replaces();

  _Test_uniques();
  _Test_rotate();
}

function _Test_removes(): void {
  const v: std.Vector<number> = _Create_sample();
  v.erase(std.remove(v.begin(), v.end(), 2), v.end());

  const it = std.find(v.begin(), v.end(), 2);
  if (it.equals(v.end()) === false) throw new Error("Bug on std.remove().");
}
function _Test_replaces(): void {
  const v: std.Vector<number> = _Create_sample();
  std.replace(v.begin(), v.end(), 2, 4);

  const it = std.find(v.begin(), v.end(), 2);
  if (it.equals(v.end()) === false) throw new Error("Bug on std.replace().");
}

function _Test_uniques(): void {
  const l: std.List<number> = new std.List();
  for (let i: number = 0; i < 1000; ++i)
    l.push_back(Math.floor(Math.random() * 50));

  l.sort();
  const v = new std.Vector<number>(l.begin(), l.end());

  l.unique();
  v.erase(std.unique(v.begin(), v.end()), v.end());

  if (std.equal(v.begin(), v.end(), l.begin()) === false)
    throw new Error("Bug on std.unique().");
}

function _Test_rotate(): void {
  const x: std.Vector<number> = new std.Vector([0, 1, 2, 3, 4, 5]);
  const y: std.Vector<number> = new std.Vector([3, 4, 5, 0, 1, 2]);

  std.ranges.rotate(x, x.nth(3));

  if (std.ranges.equal(x, y) === false) throw new Error("Bug on std.rotate().");
}

function _Create_sample(): std.Vector<number> {
  return new std.Vector<number>([1, 2, 2, 3, 3, 3]);
}
