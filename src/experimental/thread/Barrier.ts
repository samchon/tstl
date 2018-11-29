//================================================================ 
/** @module std.experimental */
//================================================================
import { FlexBarrier } from "./FlexBarrier";

export class Barrier extends FlexBarrier
{
	public constructor(size: number)
	{
		super(size, ()=>this.size_);
	}
}

export type barrier = Barrier;
export const barrier = Barrier;