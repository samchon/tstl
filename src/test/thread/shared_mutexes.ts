import * as std from "../../index";

import { _ISharedLockable } from "../../base/thread/_ISharedLockable";

interface ISharedLockable extends std.ILockable
{
    lock_shared(): Promise<void>;
    unlock_shared(): Promise<void>;
}

async function write(mutex: ISharedLockable, scripts: string[]): Promise<void>
{
    for (let i: number = 0; i < 10; ++i)
    {
        await std.UniqueLock.lock(mutex, async () =>
        {
            scripts.push("start writing");
            await std.sleep_for(std.randint(100, 200));
            scripts.push("end writing");
        });
        await std.sleep_for(std.randint(50, 100));
    }
}

async function read(mutex: ISharedLockable, scripts: string[]): Promise<void>
{
    for (let i: number = 0; i < 100; ++i)
        await std.SharedLock.lock(mutex, async () =>
        {
            scripts.push("start reading");
            await std.sleep_for(std.randint(10, 20));
            scripts.push("end reading");
        });
}

async function random(mutex: ISharedLockable): Promise<void>
{
    let scripts: string[] = [];
    let latch: std.experimental.Latch = new std.experimental.Latch(2);

    write(mutex, scripts).then(() => latch.arrive());
    read(mutex, scripts).then(() => latch.arrive());

    await latch.wait();
    
    let writing: number = 0;
    let reading: number = 0;

    for (let str of scripts)
    {
        if (str === "start writing")        ++writing;
        else if (str === "start reading")   ++reading;
        else if (str === "end writing")     --writing;
        else                                --reading;

        try
        {
            if (writing && reading)
                throw new std.DomainError(`Error on ${mutex.constructor.name}: writing and reading at the same time?`);
            else if (writing > 1)
                throw new std.DomainError(`Error on ${mutex.constructor.name}: writing lock is not unique.`);
        }
        catch (exp)
        {
            console.log(scripts);
            throw exp;
        }
    }
}

export async function test_shared_mutexes(): Promise<void>
{
    //await random(new std.SharedMutex());
    await random(new std.SharedTimedMutex());
}