import { strict as assert } from "assert";

import * as std from "../../index";

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
