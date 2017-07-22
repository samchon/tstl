/// <reference path="../API.ts" />

namespace std.experiments
{
	export class ForwardListIterator<T> implements IOutputIterator<T>
	{
		/**
		 * @hidden
		 */
		private source_: ForwardList<T>;

		/**
		 * @hidden
		 */
		private next_: ForwardListIterator<T>;

		/**
		 * @hidden
		 */
		private value_: T;

		/**
		 * Initiailizer Constructor.
		 * 
		 * @param source 
		 * @param next 
		 * @param value 
		 */
		public constructor(source: ForwardList<T>, next: ForwardListIterator<T>, value: T)
		{
			this.source_ = source;
			this.next_ = next;

			this.value_ = value;
		}

		/* ---------------------------------------------------------------
			ACCESSORS
		--------------------------------------------------------------- */
		public source(): ForwardList<T>
		{
			return this.source_;
		}

		public get value(): T
		{
			return this.value_;
		}

		public set value(val: T)
		{
			this.value_ = val;
		}

		/* ---------------------------------------------------------
			MOVERS
		--------------------------------------------------------- */
		public next(): ForwardListIterator<T>
		{
			return this.next_;
		}

		public advance(n: number): ForwardListIterator<T>
		{
			let ret: ForwardListIterator<T> = this;
			for (let i: number = 0; i < n; ++i)
				ret = ret.next();

			return ret;
		}

		/* ---------------------------------------------------------------
			COMPARISON
		--------------------------------------------------------------- */
		public equals(obj: ForwardListIterator<T>): boolean
		{
			return this == obj;
		}
	}
}
