//================================================================ 
/** @module std.base */
//================================================================
/**
 * @hidden
 */
export namespace _SafeLock
{
    export async function lock
        (
            locker: () => Promise<void>, 
            unlocker: () => Promise<void>, 
            lambda: () => void | Promise<void>
        ): Promise<void>
    {
        await try_lock(locker as any, unlocker, lambda);
    }

    export async function try_lock
        (
            locker: () => Promise<boolean>, 
            unlocker: () => Promise<void>, 
            lambda: () => void | Promise<void>
        ): Promise<boolean>
    {
        // TRY LOCK
        let ret: boolean = await locker();
        if (ret === false)
            return false;

        // PROCESS THE CRITICAL SECTION
        try
        {
            await lambda();
        }
        catch (error)
        {
            await unlocker();
            throw error;
        }

        // TERMINATE THE CRITICAL SECTION
        await unlocker();
        return ret;
    }
}