/// <reference path="../../API.ts" />

/// <reference path="_ListContainer.ts" />

namespace std.base
{
	/**
	 * @hidden
	 */
	export class _SetElementList<T> 
		extends _ListContainer<T, SetIterator<T>>
	{
		/**
		 * @hidden
		 */
		private associative_: SetContainer<T>;

		/**
		 * @hidden
		 */
		private rend_: SetReverseIterator<T>;

		/* ---------------------------------------------------------
			CONSTRUCTORS
		--------------------------------------------------------- */
		public constructor(associative: SetContainer<T>)
		{
			super();

			this.associative_ = associative;
		}

		protected _Create_iterator(prev: SetIterator<T>, next: SetIterator<T>, val: T): SetIterator<T>
		{
			return new SetIterator<T>(this, prev, next, val);
		}
		protected _Set_begin(it: SetIterator<T>): void
		{
			super._Set_begin(it);
			this.rend_ = new SetReverseIterator<T>(it);
		}

		/* ---------------------------------------------------------
			ACCESSORS
		--------------------------------------------------------- */
		public associative(): SetContainer<T>
		{
			return this.associative_;
		}

		public rbegin(): SetReverseIterator<T>
		{
			return new SetReverseIterator<T>(this.end());
		}
		public rend(): SetReverseIterator<T>
		{
			return this.rend_;
		}
	}
}