import { _ISemaphore } from "../base/threads/_ISemaphore";

import { Queue } from "../containers/Queue";
import { Pair } from "../utilities/Pair";
import { OutOfRange } from "../exceptions/LogicError";
import { RangeError } from "../exceptions/RuntimeError";

/**
 * Semaphore.
 * 
 * @author Jeongho Nam <http://samchon.org>
 */
export class Semaphore implements _ISemaphore
{
	/**
	 * @hidden
	 */
	private hold_count_: number;

	/**
	 * @hidden
	 */
	private locked_count_: number;

	/**
	 * @hidden
	 */
	private size_: number;

	/**
	 * @hidden
	 */
	private listeners_: Queue<Pair<IListener, number>>;

	/* ---------------------------------------------------------
		CONSTRUCTORS
	--------------------------------------------------------- */
	public constructor(size: number)
	{
		this.hold_count_ = 0;
		this.locked_count_ = 0;
		this.size_ = size;

		this.listeners_ = new Queue();
	}

	/**
	 * @inheritDoc
	 */
	public size(): number
	{
		return this.size_;
	}

	/**
	 * @hidden
	 */
	private _Compute_excess_count(count: number): number
	{
		return Math.max(0, Math.min(this.locked_count_, this.size_) + count - this.size_);
	}

	/* ---------------------------------------------------------
		ACQURE & RELEASE
	--------------------------------------------------------- */
	/**
	 * @inheritDoc
	 */
	public lock(count: number = 1): Promise<void>
	{
		return new Promise<void>((resolve, reject) =>
		{
			// VALIDATE PARAMETER
			if (count < 1 || count > this.size_)
			{
				reject(new OutOfRange("Lock count to semaphore is out of its range."));
				return;
			}

			// INCREASE COUNT PROPERTIES
			let exceeded_count: number = this._Compute_excess_count(count);

			this.hold_count_ += exceeded_count;
			this.locked_count_ += count;

			// BRANCH; KEEP OR GO?
			if (exceeded_count > 0)
				this.listeners_.push(new Pair(resolve, exceeded_count));
			else
				resolve();
		});
	}

	/**
	 * @inheritDoc
	 */
	public async try_lock(count: number = 1): Promise<boolean>
	{
		// VALIDATE PARAMETER
		if (count < 1 || count > this.size_)
			throw new OutOfRange("Lock count to semaphore is out of its range.");

		// ALL OR NOTHING
		if (this.locked_count_ + count > this.size_)
			return false;
		
		this.locked_count_ += count;
		return true;
	}

	/**
	 * @inheritDoc
	 */
	public async unlock(count: number = 1): Promise<void>
	{
		// VALIDATE PARAMETER
		if (count < 1 || count > this.size_)
			throw new OutOfRange("Unlock count to semaphore is out of its range.");
		else if (count > this.locked_count_)
			throw new RangeError("Number of unlocks to semaphore is greater than its locks.");

		// DECREASE COUNT PROPERTIES
		let resolved_count: number = Math.min(count, this.hold_count_);

		this.hold_count_ -= resolved_count;
		this.locked_count_ -= count;

		while (resolved_count !== 0)
		{
			let front: Pair<IListener, number> = this.listeners_.front();

			if (front.second > resolved_count)
			{
				front.second -= resolved_count;
				resolved_count = 0;
			}
			else
			{
				let fn: IListener = front.first;

				// POP AND DECREAE COUNT FIRST
				resolved_count -= front.second;
				this.listeners_.pop();

				fn(); // AND CALL LATER
			}
		}
	}
}

/**
 * @hidden
 */
interface IListener
{
	(): void;
}

export type semaphore = Semaphore;
export const semaphore = Semaphore;