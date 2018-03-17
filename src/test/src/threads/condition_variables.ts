/// <reference path="../API.ts" />

namespace test
{
	const SLEEP_TIME: number = 100;
	const WAIT_COUNT: number = 10;

	export async function test_condition_variables(): Promise<void>
	{
		let cv: std.ConditionVariable = new std.ConditionVariable();
		let wait_count: number = 0;

		//----
		// WAIT & NOTIFY
		//----
		// THERE'RE 10 WAITERS; HOLDERS
		for (let i: number = 0; i < WAIT_COUNT; ++i)
		{
			cv.wait().then(() =>
			{
				--wait_count;
			});
			++wait_count;
		}

		// NOTIFY ONE
		cv.notify_one();
		await std.sleep_for(SLEEP_TIME);

		if (wait_count != WAIT_COUNT - 1)
			throw new std.DomainError("Error on ConditionVariable::notify_one.");

		// NOTIFY ALL
		cv.notify_all();
		await std.sleep_for(SLEEP_TIME);

		if (wait_count != 0)
			throw new std.DomainError("Error on ConditionVariable::notify_all.");

		//----
		// WAIT FOR & NOTIFY
		//----
		let success_count: number = 0;

		// THERE'RE 10 WAITERS, HOLDERS, WITH DIFFERENT TIMES
		for (let i: number = 0; i < WAIT_COUNT; ++i)
		{
			cv.wait_for(i * SLEEP_TIME).then((ret: boolean) =>
			{
				if (ret == true)
					++success_count;
			});
		}

		// NOTIFY ONE
		cv.notify_one();

		// NOTIFY ALL WHEN BE HALT TIME
		await std.sleep_for(5 * SLEEP_TIME);
		cv.notify_all();

		// VALIDATE SUCCESS COUNT
		await std.sleep_for(SLEEP_TIME);
		if (success_count < 3 || success_count > 7)
			throw new std.DomainError("ConditionVariable::wait_for does not work in exact time.");
	}
}
