import { HashMap } from "../../container/HashMap";

import { LockType } from "./enums";
import { sleep_for } from "../../thread/global";

export abstract class _Barrier
{
	/**
	 * @hidden
	 */
	protected count_: number;
	
	/**
	 * @hidden
	 */
	private resolvers_: HashMap<IResolver, LockType>;

	/* ---------------------------------------------------------
		CONSTRUCTORS
	--------------------------------------------------------- */
	public constructor(count: number)
	{
		this.count_ = count;
		this.resolvers_ = new HashMap();
	}

	public async arrive(n: number = 1): Promise<void>
	{
		if (!this._Is_goal(n))
			return;

		while (!this.resolvers_.empty())
		{
			let it = this.resolvers_.begin();
			this.resolvers_.erase(it);

			if (it.second === LockType.HOLD)
				it.first();
			else
				it.first(true);
		}
	}

	public async arrive_and_wait(n: number = 1): Promise<void>
	{
		await this.arrive(n);
		await this.wait();
	}

	protected abstract _Is_goal(n: number): boolean;

	/* ---------------------------------------------------------
		WAIT FUNCTIONS
	--------------------------------------------------------- */
	public wait(): Promise<void>
	{
		return new Promise(resolve =>
		{
			if (this.count_ <= 0)
				resolve();
			else
				this.resolvers_.emplace(resolve, LockType.HOLD);
		});
	}
	public async try_wait(): Promise<boolean>
	{
		return (this.count_ <= 0);
	}

	public wait_for(ms: number): Promise<boolean>
	{
		return new Promise(resolve =>
		{
			if (this.count_ <= 0)
			{
				resolve();
				return;
			}

			this.resolvers_.emplace(resolve, LockType.KNOCK);
			sleep_for(ms).then(() =>
			{
				let it = this.resolvers_.find(resolve);	
				if (it.equals(this.resolvers_.end()))
					return;

				this.resolvers_.erase(it);
				resolve(false);
			});
		});
	}
	public wait_until(at: Date): Promise<boolean>
	{
		// COMPUTE MILLISECONDS TO WAIT
		let now: Date = new Date();
		let ms: number = at.getTime() - now.getTime();

		return this.wait_for(ms);
	}
}

/**
 * @hidden
 */
interface IResolver
{
	(ret?: any): void;
}