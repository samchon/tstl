import { strict as assert } from "assert";
import * as std from "tstl";

export function test_hash_map_failed_growth(): void {
  let failing = false;
  const failure = new Error("hash failed during rehash");
  const map = new std.HashMap<number, number>((key) => {
    if (failing && key === 0) throw failure;
    return 0;
  });
  const capacity = map.bucket_count();
  const keys = Array.from({ length: capacity }, (_, key) => key);
  for (const key of keys) map.emplace(key, key);

  failing = true;
  assert.throws(
    () => map.emplace(capacity, capacity),
    (error) => error === failure,
  );
  failing = false;
  assert.equal(map.size(), capacity);
  assert.equal(map.load_factor(), 1);
  assert.deepEqual(
    Array.from(map, (entry) => entry.first),
    keys,
  );
  assert.equal(map.has(capacity), false);
  for (const key of keys) assert.equal(map.get(key), key);

  assert.equal(map.emplace(capacity, capacity).second, true);
  assert.ok(map.bucket_count() > capacity);
  assert.equal(map.get(capacity), capacity);

  const erased = map.find(0);
  failing = true;
  assert.equal(map.erase(erased).first, 1);
  failing = false;
  assert.equal(map.has(0), false);
  assert.equal(map.size(), capacity);
  assert.equal(map.load_factor(), capacity / map.bucket_count());
  assert.deepEqual(
    Array.from(map, (entry) => entry.first),
    [...keys.slice(1), capacity],
  );
}

const CHARACTERS = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

function random_characters(length: number): string {
  let ret: string = "";
  for (let i: number = 0; i < length; ++i) {
    const index: number = std.randint(9, CHARACTERS.length - 1);
    ret += CHARACTERS[index];
  }
  return ret;
}

export function test_hash_maps(): void {
  type Key = std.Pair<std.Pair<object, string>, std.Pair<object, string>>;
  const Key = std.Pair;

  const dict: std.HashMap<Key, number> = new std.HashMap();
  const tuples: Array<[Key, number]> = [];

  for (let i: number = 0; i < 100; ++i) {
    const key: Key = new Key(
      new std.Pair(new Object(), random_characters(3)),
      new std.Pair(new Object(), random_characters(7)),
    );
    const value: number = std.randint(0, 5000);

    dict.emplace(key, value);
    tuples.push([key, value]);
  }
  std.ranges.shuffle(tuples);

  for (const t of tuples) {
    const key: Key = t[0];
    const value: number = t[1];

    const it: std.HashMap.Iterator<Key, number> = dict.find(key);
    if (it.first !== key || it.second !== value)
      throw new Error("Error on hash algorithm, maybe.");
  }
}
