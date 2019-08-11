import * as std from "../../index";

export async function test_latches(): Promise<void>
{
    return _Test_barriers(size => new std.Latch(size));
}

export async function test_barriers(): Promise<void>
{
    await _Test_barriers(size => new std.Barrier(size));

    const SIZE = 3;
    const REPEAT = 4;

    let barrier = new std.Barrier(SIZE);
    let steps: number = 0;

    for (let i: number = 0; i < REPEAT; ++i)
    {
        barrier.wait().then(() =>
        {
            ++steps;
        });
        for (let j: number = 0; j < SIZE; ++j)
            await barrier.arrive();
    }
    if (steps !== REPEAT)
        throw new std.DomainError("Error on Barrier; not reusable.");
}

async function _Test_barriers(creator: (size: number) => IBarrier): Promise<void>
{
    let dest: number = 0;
    let result: number = 0;

    for (let x: number = 0; x < 10; ++x)
    {
        // PREPARE ASSETS
        let count: number = std.randint(5, 8);
        let size: number = std.randint(5, 8);

        let barrier: IBarrier = creator(size);

        // DEST & RESULT
        dest += (count >= size) ? 1 : -1;
        barrier.wait_for(50).then(flag =>
        {
            result += flag ? 1 : -1;
        });

        // ARRIVE
        for (let i: number = 0; i < count; ++i)
            await barrier.arrive();
    }

    await std.sleep_for(100);
    if (dest !== result)
        throw new std.DomainError("Error on _Barrier.arrive(): " + dest + ", " + result);
}

interface IBarrier
{
    wait_for(ms: number): Promise<boolean>;
    arrive(): Promise<void>;
}