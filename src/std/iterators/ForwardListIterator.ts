/// <reference path="../API.ts" />

namespace std
{
	export class ForwardListIterator<T> implements IForwardIterator<T>
	{
		/**
		 * @hidden
		 */
		private source_ptr_: IPointer<ForwardList<T>>;

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
		public constructor(source: IPointer<ForwardList<T>>, next: ForwardListIterator<T>, value: T)
		{
			this.source_ptr_ = source;
			this.next_ = next;

			this.value_ = value;
		}

		/* ---------------------------------------------------------------
			ACCESSORS
		--------------------------------------------------------------- */
		public source(): ForwardList<T>
		{
			return this.source_ptr_.value;
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
