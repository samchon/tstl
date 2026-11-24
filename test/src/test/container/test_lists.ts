import { strict as assert } from "assert";
import * as std from "tstl";

export function test_forward_list_erase_runs(): void {
  const empty = new std.ForwardList<number>();
  empty.unique();
  empty.remove_if(() => true);
  assert.equal(empty.size(), 0);

  const values = new std.ForwardList([1, 1, 1, 2, 2, 4, 6, 3, 8]);
  values.unique();
  assert.deepEqual([...values], [1, 2, 4, 6, 3, 8]);
  values.remove_if((value) => value % 2 === 0);
  assert.deepEqual([...values], [1, 3]);
  assert.equal(values.size(), 2);
}

export function test_forward_list_splice(): void {
  const target = new std.ForwardList([1, 5]);
  const source = new std.ForwardList([2, 3, 4]);
  const moved = source.begin();
  target.splice_after(target.begin(), source);
  assert.deepEqual([...target], [1, 2, 3, 4, 5]);
  assert.equal(source.size(), 0);
  assert.equal(moved.source(), target);
  assert.equal(target.begin().next(), moved);

  const tail = new std.ForwardList([6, 7]);
  target.splice_after(target.before_begin(), tail, tail.before_begin());
  assert.deepEqual([...target], [6, 1, 2, 3, 4, 5]);
  assert.deepEqual([...tail], [7]);

  const last = moved.next().next().next();
  target.reverse();
  assert.equal(target.begin(), last);
  assert.equal(moved.value, 2);
  assert.deepEqual([...target], [5, 4, 3, 2, 1, 6]);
}

export function test_list_stability(): void {
  const first = { key: 1, id: "first" };
  const second = { key: 1, id: "second" };
  const lower = { key: 0, id: "lower" };
  const third = { key: 1, id: "third" };
  const fourth = { key: 1, id: "fourth" };
  const comp = (a: typeof first, b: typeof first) => a.key < b.key;
  const list = new std.List([first, second, lower]);
  const forward = new std.ForwardList([first, second, lower]);
  const list_first = list.begin();
  const forward_first = forward.begin();
  const list_lower = list_first.next().next();
  const forward_lower = forward_first.next().next();
  list.sort(comp);
  forward.sort(comp);
  assert.deepEqual([...list], [lower, first, second]);
  assert.deepEqual([...forward], [lower, first, second]);
  assert.equal(list.begin(), list_lower);
  assert.equal(forward.begin(), forward_lower);
  assert.equal(list.begin().next(), list_first);
  assert.equal(forward.begin().next(), forward_first);

  const source = new std.List([third, fourth]);
  const forward_source = new std.ForwardList([third, fourth]);
  const moved = source.begin();
  const forward_moved = forward_source.begin();
  list.merge(source, comp);
  forward.merge(forward_source, comp);
  const expected = [lower, first, second, third, fourth];
  assert.deepEqual([...list], expected);
  assert.deepEqual([...forward], expected);
  assert.ok(source.empty() && forward_source.empty());
  assert.equal(moved.source(), list);
  assert.equal(forward_moved.source(), forward);
  assert.equal(moved.next().value, fourth);
  assert.equal(forward_moved.next().value, fourth);
}

export function test_list_splice_within_container(): void {
  const list = new std.List([1, 2, 3, 4]);
  const two = list.begin().next();
  list.splice(two.next(), list, two);
  assert.deepEqual([...list], [1, 2, 3, 4]);
  list.splice(list.end(), list, list.begin(), two.next());
  assert.deepEqual([...list], [3, 4, 1, 2]);
  assert.equal(list.end().prev(), two);
  assert.equal(list.size(), 4);

  const forward = new std.ForwardList([1, 2, 3, 4]);
  const one = forward.begin();
  const tail = one.next().next().next();
  forward.splice_after(one, forward, forward.before_begin());
  assert.deepEqual([...forward], [1, 2, 3, 4]);
  forward.splice_after(
    tail,
    forward,
    forward.before_begin(),
    one.next().next(),
  );
  assert.deepEqual([...forward], [3, 4, 1, 2]);
  assert.equal(tail.next(), one);
  assert.equal(forward.size(), 4);
}

export function test_lists(): void {
  _Test_removes();
  _Test_merges();

  _Test_forward_lists();
}

function _Test_removes(): void {
  const v = new std.Vector<number>();
  for (let i: number = 0; i < 10; ++i) v.push_back(Math.random());

  _Test_remove(std.List, v);
  _Test_remove(std.ForwardList as any, v);
}

function _Test_remove(creator: typeof std.List, v: std.Vector<number>): void {
  const l = new creator(v.begin(), v.end());
  l.remove_if(_Remove_if);
  l.reverse();

  v.erase(std.remove_if(v.begin(), v.end(), _Remove_if), v.end());
  if (std.equal(l.begin(), l.end(), v.rbegin()) === false)
    throw new Error(`Bug on ${creator.name}.remove_if()`);
}
function _Remove_if(val: number): boolean {
  return val < 0.5;
}

function _Test_merges(): void {
  //----
  // PRELIMINARIES
  //----
  // SAMPLE DATA
  const v1 = new std.Vector<number>([1, 2, 3, 7, 8, 15, 16]);
  const v2 = new std.Vector<number>([5, 6, 12, 13]);

  // ARE SHUFFLED
  std.shuffle(v1.begin(), v1.end());
  std.shuffle(v2.begin(), v2.end());

  // VALIDATOR; SORTED & MERGED BY TREE-SET
  const set = new std.TreeSet<number>(v1.data());
  set.push(...v2.data());

  //----
  // VALIDATE
  //----
  _Test_merge(std.List, v1, v2, set);
  _Test_merge(std.ForwardList as any, v1, v2, set);
}

function _Test_merge(
  creator: typeof std.List,
  v1: std.Vector<number>,
  v2: std.Vector<number>,
  set: std.TreeSet<number>,
): void {
  // CONSTRUCT LISTS
  const l1 = new creator(v1.data());
  const l2 = new creator(v2.data());

  // SORT THEM TO MERGE
  l1.sort();
  l2.sort();

  // DO MERGE
  l1.merge(l2);

  // VALIDATE
  if ((std.equal as Function)(l1.begin(), l1.end(), set.begin()) === false)
    throw new Error(`Bug on ${creator.name}.merge().`);
}

function _Test_forward_lists(): void {
  //----
  // CONSTRUCT ELEMENTS
  //----
  const fl: std.ForwardList<number> = new std.ForwardList();
  for (let i: number = 9; i >= 0; --i) fl.push_front(i);

  //----
  // ELEMENTS I/O
  //----
  let it = std.advance(fl.before_begin(), 3); // STEP TO 2
  it = fl.erase_after(it); // AND ERASE 3 BY ERASE_AFTER()

  if (it.value !== 4)
    throw new Error("Bug on std.ForwardList.erase_after(); single deletion.");

  // INSERT AN ELEMENT
  it = std.advance(fl.before_begin(), 2);
  it = fl.insert_after(it, -1); // INSERT -1

  if (it.value !== -1)
    throw new Error("Bug on std.ForwardList.insert_after().");

  // ERASE RANGE
  it = std.advance(fl.before_begin(), 6);
  it = fl.erase_after(it, std.advance(it, 3 + 1));

  if (it.value !== 9)
    throw new Error("Bug on std.ForwardList.erase_after(); range deletion.");

  //----
  // FINAL VALIDATION
  //----
  const answer = new std.Vector<number>([0, 1, -1, 2, 4, 5, 9]);
  if (std.equal(fl.begin(), fl.end(), answer.begin()) === false)
    throw new Error("Bug on std.ForwardList; store elements are wrong.");
}
