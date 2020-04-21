//================================================================ 
/**
 * @packageDocumentation
 * @module std  
 */
//================================================================
import { FlexBarrier } from "./FlexBarrier";

/**
 * Barrier for critical sections.
 * 
 * The Barrier class blocks critical sections until the downward counter to be zero. Unlike the {@link Latch} class, Barrier can re-use the downward counter repeatedly.
 * 
 * @author Jeongho Nam - https://github.com/samchon
 */
export class Barrier extends FlexBarrier
{
    public constructor(size: number)
    {
        super(size, () => this.size_);
    }
}