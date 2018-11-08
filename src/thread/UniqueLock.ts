import { ILockable } from "./ILockable";
import { _ITimedLockable } from "../base/thread/_ITimedLockable";

import { _SafeLock } from "../base/thread/_SafeLock";

export namespace UniqueLock
{
	export function lock<Mutex extends Pick<ILockable, "lock"|"unlock">>
		(mutex: Mutex, lambda: ()=>void | Promise<void>): Promise<void>
	{
		return _SafeLock.lock
		(
			() => mutex.lock(), 
			() => mutex.unlock(), 
			lambda
		);
	}

	export function try_lock<Mutex extends Pick<ILockable, "try_lock"|"unlock">>
		(mutex: Mutex, lambda: ()=>void | Promise<void>): Promise<boolean>
	{
		return _SafeLock.try_lock
		(
			() => mutex.try_lock(), 
			() => mutex.unlock(), 
			lambda
		);
	}

	export function try_lock_for<Mutex extends Pick<_ITimedLockable, "try_lock_for"|"unlock">>
		(mutex: Mutex, ms: number, lambda: () => void | Promise<void>): Promise<boolean>
	{
		return _SafeLock.try_lock
		(
			() => mutex.try_lock_for(ms), 
			() => mutex.unlock(), 
			lambda
		);
	}

	export function try_lock_until<Mutex extends Pick<_ITimedLockable, "try_lock_until"|"unlock">>
		(mutex: Mutex, at: Date, lambda: () => void | Promise<void>): Promise<boolean>
	{
		return _SafeLock.try_lock
		(
			() => mutex.try_lock_until(at), 
			() => mutex.unlock(), 
			lambda
		);
	}
}
export import unique_lock = UniqueLock;