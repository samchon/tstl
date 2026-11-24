import { strict as assert } from "assert";

import * as std from "tstl";

export async function test_condition_variables(): Promise<void> {
  const cv = new std.ConditionVariable();
  const awakened: number[] = [];
  const waiters = [1, 2, 3].map((id) =>
    cv.wait().then(() => {
      awakened.push(id);
    }),
  );

  await cv.notify_one();
  await waiters[0];
  assert.deepEqual(awakened, [1]);

  await cv.notify_all();
  await Promise.all(waiters);
  assert.deepEqual(awakened, [1, 2, 3]);

  assert.equal(await cv.wait_until(new Date(0)), false);
  const timed_waiter = cv.wait_for(25);
  await cv.notify_one();
  assert.equal(await timed_waiter, true);
}
