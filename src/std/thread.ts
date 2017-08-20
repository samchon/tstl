/// <reference path="API.ts" />

/// <reference path="threads/Mutex.ts" />
/// <reference path="threads/SharedMutex.ts" />
/// <reference path="threads/TimedMutex.ts" />
/// <reference path="threads/SharedTimedMutex.ts" />

/// <reference path="threads/ConditionVariable.ts" />
/// <reference path="threads/Semaphore.ts" />

namespace std
{
	export function sleep_for(ms: number): Promise<void>
	{
		return new Promise<void>((resolve, reject) =>
		{
			if (ms < 0) // NEGATIVE VALUE
				reject(new InvalidArgument("Unable to sleep by negative duration."));
			else
				setTimeout(function ()
				{
					resolve(); // RETURN
				}, ms); // FOR 'ms' MILLISECONDS
		});
	}

	export function sleep_until(at: Date): Promise<void>
	{
		let now: Date = new Date();
		let ms: number = at.getTime() - now.getTime(); // MILLISECONDS TO WAIT

		return sleep_for(ms); // CONVERT TO THE SLEEP_FOR
	}

	export function lock(...items: ILockable[]): Promise<void>
	{
		return new Promise<void>(resolve =>
		{
			let count: number = 0;

			for (let mtx of items)
				mtx.lock().then(function (): void 
				{
					if (++count == items.length)
						resolve();
				});
		});
	}

	export function try_lock(...items: ILockable[]): number
	{
		for (let i: number = 0; i < items.length; ++i)
			if (items[i].try_lock() == false)
				return i;

		return -1;
	}
}