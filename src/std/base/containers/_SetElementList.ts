/// <reference path="../../API.ts" />

/// <reference path="ListContainer.ts" />

namespace std.base
{
	/**
	 * @hidden
	 */
	export class _SetElementList<T, Source extends SetContainer<T, Source>> 
		extends ListContainer<T, 
			Source,
			SetIterator<T, Source>,
			SetReverseIterator<T, Source>>
	{
		/**
		 * @hidden
		 */
		private associative_: Source;

		/**
		 * @hidden
		 */
		private rend_: SetReverseIterator<T, Source>;

		/* ---------------------------------------------------------
			CONSTRUCTORS
		--------------------------------------------------------- */
		public constructor(associative: Source)
		{
			super();

			this.associative_ = associative;
		}

		protected _Create_iterator(prev: SetIterator<T, Source>, next: SetIterator<T, Source>, val: T): SetIterator<T, Source>
		{
			return new SetIterator<T, Source>(this, prev, next, val);
		}
		protected _Set_begin(it: SetIterator<T, Source>): void
		{
			super._Set_begin(it);
			this.rend_ = new SetReverseIterator<T, Source>(it);
		}

		/* ---------------------------------------------------------
			ACCESSORS
		--------------------------------------------------------- */
		public associative(): Source
		{
			return this.associative_;
		}

		public rbegin(): SetReverseIterator<T, Source>
		{
			return new SetReverseIterator<T, Source>(this.end());
		}
		public rend(): SetReverseIterator<T, Source>
		{
			return this.rend_;
		}
	}
}