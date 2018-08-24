import { _Barrier } from "../../base/threads/_Barrier";

export class Latch extends _Barrier
{
	public constructor(size: number)
	{
		super(size);
	}

	protected _Is_goal(n: number): boolean
	{
		return this.count_ > 0 && (this.count_ -= n) <= 0;
	}
}

export type latch = Latch;
export const latch = Latch;