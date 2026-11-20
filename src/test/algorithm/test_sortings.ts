import { strict as assert } from "assert";

import * as std from "../../index";
import { Cube } from "../internal/Cube";

export function test_stable_sort(): void {
  const values: [number, string][] = [
    [2, "a"],
    [1, "b"],
    [2, "c"],
    [1, "d"],
    [0, "e"],
    [1, "f"],
  ];
  const comp = (x: [number, string], y: [number, string]) => x[0] < y[0];
  const deque = new std.Deque<[number, string]>([
    [9, "<"],
    ...values,
    [-1, ">"],
  ]);
  std.stable_sort(deque.begin().next(), deque.end().prev(), comp);
  assert.equal(Array.from(deque, (pair) => pair[1]).join(""), "<ebdfac>");

  std.ranges.stable_sort(values, (x, y) => comp(y, x));
  assert.equal(values.map((pair) => pair[1]).join(""), "acbdfe");
}

export function test_nth_element(): void {
  const pair = [6, 1];
  std.ranges.nth_element(pair, std.begin(pair));
  assert.deepEqual(pair, [1, 6]);

  const values = [5, 2, 5, 1, 5, 3];
  for (const order of [1, -1]) {
    const compare = (x: number, y: number) => order * (x - y);
    const sorted = values.slice().sort(compare);
    for (let index = 0; index < values.length; ++index) {
      const vector = new std.Vector([99, ...values, -99]);
      const nth = vector.nth(index + 1);
      std.nth_element(vector.nth(1), nth, vector.end().prev(), (x, y) => {
        return compare(x, y) < 0;
      });

      const actual = vector.data().slice(1, -1);
      assert.equal(nth.value, sorted[index]);
      assert.ok(
        actual.slice(0, index).every((x) => compare(x, nth.value) <= 0),
      );
      assert.ok(
        actual.slice(index + 1).every((x) => compare(x, nth.value) >= 0),
      );
      assert.deepEqual(actual.sort(compare), sorted);
      assert.equal(vector.front(), 99);
      assert.equal(vector.back(), -99);
    }
  }

  const vector = new std.Vector(values);
  std.nth_element(vector.begin(), vector.end(), vector.end());
  assert.deepEqual(vector.data(), values);

  const reverse_nth = vector.rbegin().advance(2);
  std.nth_element(vector.rbegin(), reverse_nth, vector.rend());
  assert.equal(reverse_nth.value, 3);
  assert.ok(
    vector
      .data()
      .slice(0, 3)
      .every((value) => value >= 3),
  );
  assert.ok(
    vector
      .data()
      .slice(4)
      .every((value) => value <= 3),
  );
}

export function test_nth_element_less_equal(): void {
  const inputs = [
    Array<number>(64).fill(8),
    Array.from({ length: 64 }, (_, index) => index % 4),
  ];
  for (const values of inputs) {
    const nth = std.begin(values).advance(values.length / 2);
    const expected = values.slice().sort((x, y) => x - y);
    let comparisons = 0;
    std.ranges.nth_element(values, nth, (x, y) => {
      assert.ok(++comparisons <= 16 * values.length);
      return std.less_equal(x, y);
    });
    assert.equal(nth.value, expected[nth.index()]);
    assert.ok(values.slice(0, nth.index()).every((x) => x <= nth.value));
    assert.ok(values.slice(nth.index() + 1).every((x) => x >= nth.value));
    assert.deepEqual(
      values.sort((x, y) => x - y),
      expected,
    );
  }
}

export function test_nth_element_unbalanced_pivots(): void {
  const length = 2048;
  const values = Array.from({ length }, (_, i) => Math.min(i, length - i));
  const nth = std.begin(values).advance(length / 2);
  let comparisons = 0;
  std.ranges.nth_element(values, nth, (x, y) => {
    assert.ok(++comparisons <= 64 * length);
    return x < y;
  });

  assert.equal(nth.value, length / 4);
  assert.ok(values.slice(0, nth.index()).every((x) => x <= nth.value));
  assert.ok(values.slice(nth.index() + 1).every((x) => x >= nth.value));
}

export function test_sortings(): void {
  _Test_atomic_sorting();
  _Test_object_sorting();
}

function _Test_atomic_sorting(): void {
  const array: number[] = [];
  for (let i: number = 1; i <= 15; ++i)
    for (let j: number = 0; j < 3; ++j) array.push(i);

  std.ranges.shuffle(array);
  std.ranges.stable_sort(array);

  if (std.ranges.is_sorted(array) === false)
    throw new Error("Bug on std.stable_sort()");
}

function _Test_object_sorting(): void {
  //----
  // CONSTRUCT ITEMS
  //----
  const cubes: std.Deque<Cube> = new std.Deque<Cube>();
  for (let i: number = 0; i < 1000; ++i) cubes.push_back(new Cube());

  //----
  // SORT BY Cube.less
  //----
  // DO SORT
  std.ranges.sort(cubes);

  // VALIDATION
  if (std.ranges.is_sorted(cubes) === false)
    throw new Error("Bug on std.sort() with IComparable.less()");

  //----
  // SORT BY inline function
  //----
  // DECLARE INLINE FUNCTION
  const inline_function = (cx: Cube, cy: Cube) => {
    if (cx.x !== cy.x) return cx.x < cy.x;
    else if (cx.y !== cy.y) return cx.y < cy.y;
    else return cx.z < cy.z;
  };

  // DO SORT
  std.ranges.sort(cubes, inline_function);

  // VALIDATION
  if (std.ranges.is_sorted(cubes, inline_function) === false)
    throw new Error("Bug on std.sort() with parametric comparator");
}
