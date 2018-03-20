/// <reference path="../API.ts" />

/// <reference path="../base/iterators/_InsertIterator.ts" />

namespace std
{
	export class InsertIterator<T, 
			Container extends base._IInsert<T, Iterator>, 
			Iterator extends IForwardIterator<T, Iterator>>
		extends base._InsertIterator<T, InsertIterator<T, Container, Iterator>>
	{
		/**
		 * @hidden
		 */
		private container_: Container;

		/**
		 * @hidden
		 */
		private it_: Iterator;

		/* ---------------------------------------------------------
			METHODS
		--------------------------------------------------------- */
		/**
		 * Initializer Constructor.
		 * 
		 * @param container Target container to insert.
		 * @param it Iterator to the position to insert.
		 */
		public constructor(container: Container, it: Iterator)
		{
			super();

			this.container_ = container;
			this.it_ = it;
		}

		/**
		 * @inheritDoc
		 */
		public set value(val: T)
		{
			this.container_.insert(this.it_, val);
			this.it_ = this.it_.next() as Iterator;
		}

		/**
		 * @inheritDoc
		 */
		public equals(obj: InsertIterator<T, Container, Iterator>): boolean
		{
			return std.equal_to(this.it_, obj.it_);
		}
	}
}