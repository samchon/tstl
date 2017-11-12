/// <reference path="../../API.ts" />

/// <reference path="mutexes.ts" />

namespace test
{
	const SIZE = 4;

	export async function test_semaphores(): Promise<void>
	{
		await _Test_lock("Semaphore", new std.experiments.Semaphore(1));
		await _Test_try_lock("TimedSemaphore", new std.experiments.TimedSemaphore(1));

		let s = new std.experiments.Semaphore(SIZE);
		let ts = new std.experiments.TimedSemaphore(SIZE);

		await _Test_semaphore("Semaphore", s);
		await _Test_timed_semaphore(ts);
	}

	async function _Test_semaphore(name: string, s: std.experiments.Semaphore): Promise<void>
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
		else if (s.try_lock() == true)
			throw new std.DomainError(`Error on ${name}.try_lock().`);

		// LOCK 4 TIMES AGAIN -> THEY SHOULD BE HOLD
		for (let i: number = 0; i < SIZE; ++i)
			s.lock().then(() =>
			{
				++acquired_count;
			});
		if (acquired_count != SIZE)
			throw new std.DomainError(`Error on ${name}.lock() when ${name} is full.`);
		
		await std.sleep_for(1);

		// DO UNLOCK
		s.unlock(SIZE);
		await std.sleep_for(1);

		if (acquired_count != 2 * SIZE)
			throw new std.DomainError(`Error on ${name}.unlock().`);
	}

	async function _Test_timed_semaphore(ts: std.experiments.TimedSemaphore): Promise<void>
	{
		let name: string = "TimedSemaphore";
		_Test_semaphore(name, <any>ts);

		
	}
}