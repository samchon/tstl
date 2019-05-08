import { sleep_for, SharedTimedMutex } from "./thread";

async function main(): Promise<void>
{
    let sm = new SharedTimedMutex();
    await sm.lock();

    (async () =>
    {
        await sleep_for(50);
        await sm.unlock();
    })();

    await sm.lock_shared();
    console.log("dead lock");
}
main();