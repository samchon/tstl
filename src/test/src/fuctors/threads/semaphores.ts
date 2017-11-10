/// <reference path="../../API.ts" />

/// <reference path="mutexes.ts" />

namespace test
{
	export async function test_semaphores(): Promise<void>
	{
		await _Test_lock("Semaphore", new std.experiments.Semaphore(1));
		await _Test_try_lock("TimedSemaphore", new std.experiments.TimedSemaphore(1));
	}
}