import { strict as assert } from "assert";

import { Barrier } from "tstl";

export async function test_barrier_phases(): Promise<void> {
  let timer: ReturnType<typeof setTimeout> | undefined;
  const deadline = new Promise<never>((_, reject) => {
    timer = setTimeout(
      () => reject(new Error("Barrier phase did not complete")),
      1000,
    );
  });
  try {
    await Promise.race([check_phases(), deadline]);
  } finally {
    if (timer !== undefined) clearTimeout(timer);
  }
}

async function check_phases(): Promise<void> {
  const barrier = new Barrier(3);
  let released = 0;
  const first = barrier.arrive_and_wait().then(() => ++released);
  await barrier.arrive();
  assert.equal(released, 0);
  await Promise.all([first, barrier.arrive_and_drop()]);
  assert.equal(released, 1);

  for (let phase = 0; phase < 2; ++phase) {
    const first = barrier.arrive_and_wait().then(() => ++released);
    const second = barrier.arrive_and_wait().then(() => ++released);
    await Promise.all([first, second]);
    assert.equal(released, 3 + phase * 2);
  }
}
