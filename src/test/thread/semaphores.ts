import * as std from "../../index";

import { ITimedLockable } from "../../thread/ITimedLockable";
import { _Test_lock, _Test_try_lock } from "./mutexes";

const SIZE = 4;

export async function test_semaphores(): Promise<void>
{
    //----
    // TEST MUTEX FEATURES
    //----
    let mtx = new std.experimental.Semaphore(1);
    let wrapper: ITimedLockable = 
    {
        lock: () => mtx.acquire(),
        unlock: () => mtx.release(),

        try_lock: () => mtx.try_acquire(),
        try_lock_for: (ms: number) => mtx.try_acquire_for(ms),
        try_lock_until: (at: Date) => mtx.try_acquire_until(at)
    };

    await _Test_lock("Semaphore", wrapper);
    await _Test_try_lock("Semaphore", wrapper);

    //----
    // TEST SPECIAL FEATURES OF SEMAPHORE
    //----
    let semaphore = new std.experimental.Semaphore(SIZE);

    await _Test_semaphore(semaphore);
    await _Test_timed_semaphore(semaphore);
}

async function _Test_semaphore(s: std.experimental.Semaphore): Promise<void>
{
    let acquired_count: number = 0;
    
    // LOCK 4 TIMES
    for (let i: number = 0; i < SIZE; ++i)
    {
        await s.acquire();
        ++acquired_count;
    }
    if (acquired_count !== SIZE)
        throw new std.DomainError(`Error on Semaphore.lock().`);
    else if (await s.try_acquire() === true)
        throw new std.DomainError(`Error on Semaphore.try_lock().`);

    // LOCK 4 TIMES AGAIN -> THEY SHOULD BE HOLD
    for (let i: number = 0; i < SIZE; ++i)
        s.acquire().then(() =>
        {
            ++acquired_count;
        });
    if (acquired_count !== SIZE)
        throw new std.DomainError(`Error on Semaphore.lock() when Semaphore is full.`);

    // DO UNLOCK
    await s.release(SIZE);

    if (acquired_count !== 2 * SIZE)
        throw new std.DomainError(`Error on Semaphore.unlock().`);

    // RELEASE UNRESOLVED LOCKS
    await std.sleep_for(0);
    await s.release(SIZE);
}

async function _Test_timed_semaphore(ts: std.experimental.Semaphore): Promise<void>
{
    // COMMON TEST
    _Test_semaphore(ts);

    // TRY LOCK FIRST
    let flag: boolean = await ts.try_acquire_for(0, SIZE / 2);
    if (flag === false)
        throw new std.DomainError("Error on TimedSemaphore.try_lock_for(); failed to lock when clear.");

    // TRY LOCK FOR -> MUST BE FAILED
    ts.try_acquire_for(50, SIZE).then((ret: boolean) =>
    {
        if (ret === true)
            throw new std.DomainError("Error on TimedSemaphore.try_lock_for(); succeeded to lock when must be failed.");
    });

    // LOCK WOULD BE HOLD
    let cnt: number = 0;
    for (let i: number = 0; i < SIZE / 2; ++i)
    {
        ts.acquire().then(() =>
        {
            ++cnt;
        });
    }

    await std.sleep_for(100);
    if (cnt !== SIZE / 2)
        throw new std.DomainError("Error on TimedSemaphore.try_lock_for(); failed to release holdings.");

    // RELEASE AND LOCK
    await ts.release(SIZE);

    flag = await ts.try_acquire_for(100, 4);
    if (flag === false)
        throw new std.DomainError("Error on TimedSemaphore.try_lock_for(); failed to lock when released.");

    await ts.release(SIZE);
}
