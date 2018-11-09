import { ConditionVariable } from "../../thread/ConditionVariable";

/**
 * Latch for critical sections.
 * 
 * The Latch class blocks critical sections until the downward counter to be zero.
 */
export class Latch
{
	/**
	 * @hidden
	 */
	private cv_: ConditionVariable;

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
	public constructor(size: number)
	{
		this.cv_ = new ConditionVariable();
		this.count_ = size;
	}

	public async arrive(n: number = 1): Promise<void>
	{
		this.count_ -= n;
		if (this.is_ready() === true)
			await this.cv_.notify_all();
	}

	public async arrive_and_wait(): Promise<void>
	{
		await this.arrive();
		await this.wait();
	}

	/* ---------------------------------------------------------
		WAIT FUNCTIONS
	--------------------------------------------------------- */
	public is_ready(): boolean
	{
		return this.count_ <= 0;
	}

	public async wait(): Promise<void>
	{
		if (this.is_ready() === false)
			await this.cv_.wait();
	}

	public async wait_for(ms: number): Promise<boolean>
	{
		if (this.is_ready())
			return true;
		else
			return await this.cv_.wait_for(ms);
	}

	public async wait_until(at: Date): Promise<boolean>
	{
		if (this.is_ready())
			return true;
		else
			return await this.cv_.wait_until(at);
	}
}

export type latch = Latch;
export const latch = Latch;