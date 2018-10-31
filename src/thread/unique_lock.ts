import { ILockable } from "../test/thread/mutexes";
import { _ITimedLockable } from "../base/thread/_ITimedLockable";

export namespace unique_lock
{
	export async function lock<Mutex extends Pick<ILockable, "lock"|"unlock">>
		(mutex: Mutex, lambda: ()=>void | Promise<void>): Promise<void>
	{
		await mutex.lock();
		await lambda();
		await mutex.unlock();
	}

	export async function try_lock<Mutex extends Pick<ILockable, "try_lock"|"unlock">>
		(mutex: Mutex, lambda: ()=>void | Promise<void>): Promise<boolean>
	{
		if (!await mutex.try_lock())
			return false;

		await lambda();
		await mutex.unlock();

		return true;
	}

	export async function try_lock_for<Mutex extends Pick<_ITimedLockable, "try_lock_for"|"unlock">>
		(mutex: Mutex, ms: number, lambda: () => void | Promise<void>): Promise<boolean>
	{
		if (!await mutex.try_lock_for(ms))
			return false;

		await lambda();
		await mutex.unlock();

		return true;
	}

	export async function try_lock_until<Mutex extends Pick<_ITimedLockable, "try_lock_until"|"unlock">>
		(mutex: Mutex, at: Date, lambda: () => void | Promise<void>): Promise<boolean>
	{
		if (!await mutex.try_lock_until(at))
			return false;

		await lambda();
		await mutex.unlock();

		return true;
	}
}