import { ConditionVariable } from "../../thread/ConditionVariable";

export class FlexBarrier
{
	/**
	 * @hidden
	 */
	private cv_: ConditionVariable;

	/**
	 * @hidden
	 */
	private reset_: ()=>number;

	/**
	 * @hidden
	 */
	protected size_: number;

	/**
	 * @hidden
	 */
	private count_: number;

	/* ---------------------------------------------------------
		CONSTRUCTORS
	--------------------------------------------------------- */
	/**
	 * Initializer Constructor.
	 * 
	 * @param size Size of the downward counter.
	 */
	public constructor(size: number, reset: ()=>number = ()=>-1)
	{
		this.cv_ = new ConditionVariable();
		this.reset_ = reset;

		this.size_ = size;
		this.count_ = 0;
	}

	public async arrive(n: number = 1): Promise<void>
	{
		let complete: boolean = (this.count_ += n) >= this.size_;
		if (complete === false)
			return;

		this.size_ = this.reset_();
		this.count_ %= this.size_;

		await this.cv_.notify_all();
	}

	public async arrive_and_wait(): Promise<void>
	{
		await this.arrive();
		await this.wait();
	}

	public async arrive_and_reset(): Promise<void>
	{
		--this.size_;
		await this.arrive();
	}

	/* ---------------------------------------------------------
		WAIT FUNCTIONS
	--------------------------------------------------------- */
	public wait(): Promise<void>
	{
		return this.cv_.wait();
	}

	public wait_for(ms: number): Promise<boolean>
	{
		return this.cv_.wait_for(ms);
	}

	public wait_until(at: Date): Promise<boolean>
	{
		return this.cv_.wait_until(at);
	}
}

export type flex_barrier = FlexBarrier;
export const flex_barrier = FlexBarrier;