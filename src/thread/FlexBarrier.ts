//================================================================ 
/**
 * @packageDocumentation
 * @module std  
 */
//================================================================
import { ConditionVariable } from "./ConditionVariable";

/**
 * Flex Barrier for critical sections.
 * 
 * The FlexBarrier class blocks critical sections until the downward counter to be zero. Unlike the {@link Barrier} class, FlexBarrier can re-define downward count size by custom function.
 * 
 * @author Jeongho Nam - https://github.com/samchon
 */
export class FlexBarrier
{
    private cv_: ConditionVariable;
    private complete_: () => number;

    protected size_: number;
    private count_: number;

    /* ---------------------------------------------------------
        CONSTRUCTOR
    --------------------------------------------------------- */
    /**
     * Initializer Constructor.
     * 
     * @param size Size of the downward counter.
     * @param complete Complete function re-configuring *size* when downward count be zero. Default is a function always returning -1, which means the barrier is not reusable more.
     */
    public constructor(size: number, complete: () => number = () => -1)
    {
        this.cv_ = new ConditionVariable();
        this.complete_ = complete;

        this.size_ = size;
        this.count_ = 0;
    }

    /* ---------------------------------------------------------
        ARRIVES
    --------------------------------------------------------- */
    public async arrive(n: number = 1): Promise<void>
    {
        let completed: boolean = (this.count_ += n) >= this.size_;
        if (completed === false)
            return;

        this.size_ = this.complete_();
        this.count_ %= this.size_;

        await this.cv_.notify_all();
    }

    public async arrive_and_wait(): Promise<void>
    {
        await this.arrive();
        await this.wait();
    }

    public async arrive_and_drop(): Promise<void>
    {
        --this.size_;
        await this.arrive(0);
    }

    /* ---------------------------------------------------------
        WAIT FUNCTIONS
    --------------------------------------------------------- */
    public wait(): Promise<void>
    {
        return this.cv_.wait();
    }

    // public wait_for(ms: number): Promise<boolean>
    // {
    //     return this.cv_.wait_for(ms);
    // }

    // public wait_until(at: Date): Promise<boolean>
    // {
    //     return this.cv_.wait_until(at);
    // }
}