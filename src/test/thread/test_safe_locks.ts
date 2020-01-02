import * as std from "../../index";

export async function test_unique_locks(): Promise<void>
{
    //----
    // PREPARE ASSETS
    //----
    // BASIC MUTEX
    let mtx: std.TimedMutex = new std.TimedMutex();

    // PROCEDURES
    let lambda = _Lambda.bind(undefined, true);
    let trier = () => mtx.try_lock();
    let unlocker = () => mtx.unlock();

    //----
    // DO TEST
    //----
    // IN CLASS LEVEL
    let safer: std.UniqueLock<std.TimedMutex> = new std.UniqueLock(mtx);
    await safer.lock(lambda);
    await safer.try_lock(lambda);
    await safer.try_lock_for(30, lambda);

    // STATIC METHOHD
    await _Test_lock("UniqueLock.lock()", () => std.UniqueLock.lock(mtx, lambda), trier, unlocker);
    await _Test_lock("UniqueLock.try_lock()", () => std.UniqueLock.try_lock(mtx, lambda), trier, unlocker);
    await _Test_lock("UniqueLock.try_lock_for()", () => std.UniqueLock.try_lock_for(mtx, 50, lambda), trier, unlocker);
}

export async function test_shared_locks(): Promise<void>
{
    //----
    // PREPARE ASSETS
    //----
    // BASIC MUTEX
    let mtx: std.SharedTimedMutex = new std.SharedTimedMutex();

    // PROCEDURES
    let lambda = _Lambda.bind(undefined, true);
    let trier = () => mtx.try_lock();
    let unlocker = () => mtx.unlock();

    //----
    // DO TEST
    //----
    // IN CLASS LEVEL
    let safer: std.SharedLock<std.SharedTimedMutex> = new std.SharedLock(mtx);
    await safer.lock(lambda);
    await safer.try_lock(lambda);
    await safer.try_lock_for(30, lambda);

    // STATIC METHOHD
    await _Test_lock("SharedLock.lock()", () => std.SharedLock.lock(mtx, lambda), trier, unlocker);
    await _Test_lock("SharedLock.try_lock()", () => std.SharedLock.try_lock(mtx, lambda), trier, unlocker);
    await _Test_lock("SharedLock.try_lock_for()", () => std.SharedLock.try_lock_for(mtx, 50, lambda), trier, unlocker);
}

async function _Test_lock(name: string, locker: ()=>Promise<void|boolean>, trier: ()=>Promise<boolean>, unlocker: ()=>Promise<void>): Promise<void>
{
    try
    {
        await locker();
    }
    catch {}

    if (await trier() === false)
        throw new Error(`Bug on ${name}: invalid implementation.`);

    await unlocker();
}

function _Lambda(success: boolean): void
{
    if (!success)
        throw new Error("Throw error.");
}