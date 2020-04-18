//================================================================ 
/**
 * @packageDocumentation
 * @module std  
 */
//================================================================
import { ConditionVariable } from "./ConditionVariable";

/**
 * Latch for critical sections.
 * 
 * The Latch class blocks critical sections until the downward counter to be zero.
 */
export class Latch
{
    private cv_: ConditionVariable;
    private count_: number;

    /* ---------------------------------------------------------
        CONSTRUCTORS
    --------------------------------------------------------- */
    /**
     * Initializer Constructor.
     * 
     * @param size Size of the downward counter.
     */
    public constructor(size: number)
    {
        this.cv_ = new ConditionVariable();
        this.count_ = size;
    }

    public async count_down(n: number = 1): Promise<void>
    {
        this.count_ -= n;
        if (this._Try_wait() === true)
            await this.cv_.notify_all();
    }

    public async arrive_and_wait(): Promise<void>
    {
        await this.count_down();
        await this.wait();
    }

    /* ---------------------------------------------------------
        WAIT FUNCTIONS
    --------------------------------------------------------- */
    public async try_wait(): Promise<boolean>
    {
        return this._Try_wait();
    }

    public async wait(): Promise<void>
    {
        if (this._Try_wait() === false)
            await this.cv_.wait();
    }

    public async wait_for(ms: number): Promise<boolean>
    {
        if (this._Try_wait() === true)
            return true;
        else
            return await this.cv_.wait_for(ms);
    }

    public async wait_until(at: Date): Promise<boolean>
    {
        if (this._Try_wait() === true)
            return true;
        else
            return await this.cv_.wait_until(at);
    }

    private _Try_wait(): boolean
    {
        return this.count_ <= 0;
    }
}