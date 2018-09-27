import { _Barrier } from "../../base/thread/_Barrier";

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

	public arrive_and_drop(n: number): Promise<void>
	{
		return this.arrive(-n);
	}

	/* ---------------------------------------------------------
		HANDLERS
	--------------------------------------------------------- */
	/**
	 * @hidden
	 */
	protected _Try_wait(): boolean
	{
		return this.count_ >= this.size_;
	}

	/**
	 * @hidden
	 */
	protected _Arrive(n: number): boolean
	{
		this.count_ += n;
		if (this._Try_wait())
		{
			this.count_ %= this.size_;
			this.completion_();

			return true;
		}
		else
			return false;
	}
}

/**
 * @hidden
 */
type ICompletion = ()=>void;

export type barrier = Barrier;
export const barrier = Barrier;