//================================================================ 
/** @module std.experimental */
//================================================================
import { FlexBarrier } from "./FlexBarrier";

/**
 * Barrier for critical sections.
 * 
 * The Barrier class blocks critical sections until the downward counter to be zero. Unlike the {@link Latch} class, Barrier can re-use the downward counter repeatedly.
 * 
 * @author Jeongho Nam <samchon@samchon.org>
 */
export class Barrier extends FlexBarrier
{
	public constructor(size: number)
	{
		super(size, ()=>this.size_);
	}
}

export type barrier = Barrier;
export const barrier = Barrier;