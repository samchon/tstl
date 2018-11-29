//================================================================ 
/** @module std */
//================================================================
import { _ISharedLockable } from "../base/thread/_ISharedLockable";
import { _ISharedTimedLockable } from "../base/thread/_ISharedTimedLockable";

import { _SafeLock } from "../base/thread/_SafeLock";

export namespace SharedLock
{
	export function lock<Mutex extends Pick<_ISharedLockable, "lock_shared"|"unlock_shared">>
		(mutex: Mutex, lambda: ()=>void | Promise<void>): Promise<void>
	{
		return _SafeLock.lock
		(
			() => mutex.lock_shared(),
			() => mutex.unlock_shared(),
			lambda
		);
	}

	export function try_lock<Mutex extends Pick<_ISharedLockable, "try_lock_shared"|"unlock_shared">>
		(mutex: Mutex, lambda: ()=>void | Promise<void>): Promise<boolean>
	{
		return _SafeLock.try_lock
		(
			() => mutex.try_lock_shared(),
			() => mutex.unlock_shared(),
			lambda
		);
	}

	export function try_lock_for<Mutex extends Pick<_ISharedTimedLockable, "try_lock_shared_for"|"unlock_shared">>
		(mutex: Mutex, ms: number, lambda: ()=>void | Promise<void>): Promise<boolean>
	{
		return _SafeLock.try_lock
		(
			() => mutex.try_lock_shared_for(ms),
			() => mutex.unlock_shared(),
			lambda
		);
	}

	export function try_lock_until<Mutex extends Pick<_ISharedTimedLockable, "try_lock_shared_until"|"unlock_shared">>
		(mutex: Mutex, at: Date, lambda: ()=>void | Promise<void>): Promise<boolean>
	{
		return _SafeLock.try_lock
		(
			() => mutex.try_lock_shared_until(at),
			() => mutex.unlock_shared(),
			lambda
		);
	}
}
export import shared_lock = SharedLock;