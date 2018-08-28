import { ILockable } from "./ILockable";

/**
 * Sleep for time span.
 * 
 * @param ms The milliseconds to sleep.
 */
export function sleep_for(ms: number): Promise<void>
{
	return new Promise<void>(resolve =>
	{
		setTimeout(resolve, ms);
	});
}

/**
 * Sleep until time expiration.
 * 
 * @param at The time point to wake up.
 */
export function sleep_until(at: Date): Promise<void>
{
	let now: Date = new Date();
	let ms: number = at.getTime() - now.getTime(); // MILLISECONDS TO WAIT

	return sleep_for(ms); // CONVERT TO THE SLEEP_FOR
}

/**
 * Lock multiple mutexes.
 * 
 * @param items Items to lock.
 */
export function lock(...items: ILockable[]): Promise<void>
{
	return new Promise<void>(resolve =>
	{
		let count: number = 0;

		for (let mtx of items)
			mtx.lock().then(function (): void 
			{
				if (++count === items.length)
					resolve();
			});
	});
}

/**
 * Try lock mutexes.
 * 
 * @param items Items to try lock.
 * @return Index of mutex who failed to lock. None of them're failed, then returns `-1`.
 */
export async function try_lock(...items: ILockable[]): Promise<number>
{
	for (let i: number = 0; i < items.length; ++i)
		if (await items[i].try_lock() === false)
			return i;

	return -1;
}