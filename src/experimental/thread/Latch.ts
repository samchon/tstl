import { _Barrier } from "../../base/thread/_Barrier";

export class Latch extends _Barrier
{
	public constructor(size: number)
	{
		super(size);
	}

	/**
	 * @hidden
	 */
	protected _Try_wait(): boolean
	{
		return this.count_ <= 0;
	}

	/**
	 * @hidden
	 */
	protected _Arrive(n: number): boolean
	{
		return this.count_ > 0 && (this.count_ -= n) <= 0;
	}
}

export type latch = Latch;
export const latch = Latch;