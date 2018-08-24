import { _Barrier } from "../../base/threads/_Barrier";

export class Barrier extends _Barrier
{
	/**
	 * @hidden
	 */
	private size_: number;

	/**
	 * @hidden
	 */
	private completion_: ICompletion;

	/* ---------------------------------------------------------
		CONSTRUCTORS
	--------------------------------------------------------- */
	public constructor(size: number, completion: ICompletion)
	{
		super(0);

		this.size_ = size;
		this.completion_ = completion;
	}

	protected _Is_goal(n: number): boolean
	{
		this.count_ += Math.max(n, 0);
		if (this.count_ >= this.size_)
		{
			let quotient: number = Math.floor(this.count_ / this.size_);
			this.count_ = this.count_ % this.size_;

			for (; quotient > 0; --quotient)
				this.completion_();

			return true;
		}
		else
			return false;
	}

	public arrive_and_drop(n: number): Promise<void>
	{
		return this.arrive(-n);
	}
}

/**
 * @hidden
 */
type ICompletion = ()=>void;

export type barrier = Barrier;
export const barrier = Barrier;