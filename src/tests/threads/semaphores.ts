import * as std from "../../index";

import { _Test_lock, _Test_try_lock } from "./mutexes";

const SIZE = 4;

export async function test_semaphores(): Promise<void>
{
	await _Test_lock("Semaphore", new std.experimental.Semaphore(1));
	await _Test_try_lock("TimedSemaphore", new std.experimental.TimedSemaphore(1));

	let s = new std.experimental.Semaphore(SIZE);
	let ts = new std.experimental.TimedSemaphore(SIZE);

	await _Test_semaphore("Semaphore", s);
	await _Test_timed_semaphore(ts);
}

async function _Test_semaphore(name: string, s: std.experimental.Semaphore): Promise<void>
{
	let acquired_count: number = 0;
	
	// LOCK 4 TIMES
	for (let i: number = 0; i < SIZE; ++i)
	{
		await s.lock();
		++acquired_count;
	}
	if (acquired_count != SIZE)
		throw new std.DomainError(`Error on ${name}.lock().`);
	else if (await s.try_lock() == true)
		throw new std.DomainError(`Error on ${name}.try_lock().`);

	// LOCK 4 TIMES AGAIN -> THEY SHOULD BE HOLD
	for (let i: number = 0; i < SIZE; ++i)
		s.lock().then(() =>
		{
			++acquired_count;
		});
	if (acquired_count != SIZE)
		throw new std.DomainError(`Error on ${name}.lock() when ${name} is full.`);

	// DO UNLOCK
	await s.unlock(SIZE);

	if (acquired_count != 2 * SIZE)
		throw new std.DomainError(`Error on ${name}.unlock().`);

	// RELEASE UNRESOLVED LOCKS
	await std.sleep_for(0);
	await s.unlock(SIZE);
}

async function _Test_timed_semaphore(ts: std.experimental.TimedSemaphore): Promise<void>
{
	// COMMON TEST
	_Test_semaphore("timed_semaphore", <any>ts);

	// TRY LOCK FIRST
	let flag: boolean = await ts.try_lock_for(0, SIZE / 2);
	if (flag == false)
		throw new std.DomainError("Error on TimedSemaphore.try_lock_for(); failed to lock when clear.");

	// TRY LOCK FOR -> MUST BE FAILED
	ts.try_lock_for(50, SIZE).then((ret: boolean) =>
	{
		if (ret == true)
			throw new std.DomainError("Error on TimedSemaphore.try_lock_for(); succeeded to lock when must be failed.");
	});

	// LOCK WOULD BE HOLD
	let cnt: number = 0;
	for (let i: number = 0; i < SIZE / 2; ++i)
	{
		ts.lock().then(() =>
		{
			++cnt;
		});
	}

	await std.sleep_for(100);
	if (cnt != SIZE / 2)
		throw new std.DomainError("Error on TimedSemaphore.try_lock_for(); failed to release holdings.");

	// RELEASE AND LOCK
	await ts.unlock(SIZE);

	flag = await ts.try_lock_for(100, 4);
	if (flag == false)
		throw new std.DomainError("Error on TimedSemaphore.try_lock_for(); failed to lock when released.");

	await ts.unlock(SIZE);
}
