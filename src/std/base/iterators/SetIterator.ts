/// <reference path="../../API.ts" />

/// <reference path="ListIterator.ts" />

namespace std.base
{
	/**
	 * Iterator of Set Containers.
	 * 
	 * @author Jeongho Nam <http://samchon.org>
	 */
	export class SetIterator<Key, Source extends SetContainer<Key, Source>>
		extends ListIterator<Key, 
			Source, 
			SetIterator<Key, Source>, 
			SetReverseIterator<Key, Source>>
	{
		/**
		 * @hidden
		 */
		private source_: _SetElementList<Key, Source>;

		/* ---------------------------------------------------------
			CONSTRUCTORS
		--------------------------------------------------------- */
		/**
		 * @hidden
		 */
		public constructor(list: _SetElementList<Key, Source>, prev: SetIterator<Key, Source>, next: SetIterator<Key, Source>, key: Key)
		{
			super(prev, next, key);

			this.source_ = list;
		}

		/**
		 * @inheritDoc
		 */
		public reverse(): SetReverseIterator<Key, Source>
		{
			return new SetReverseIterator(this);
		}

		/* ---------------------------------------------------------
			ACCESSORS
		--------------------------------------------------------- */
		/**
		 * @inheritDoc
		 */
		public source(): Source
		{
			return this.source_.associative();
		}
	}
}

namespace std.base
{
	/**
	 * Reverse iterator of Set Containers.
	 * 
	 * @author Jeongho Nam <http://samchon.org>
	 */
	export class SetReverseIterator<Key, Source extends SetContainer<Key, Source>>
		extends ReverseIterator<Key, 
			Source, 
			SetIterator<Key, Source>, 
			SetReverseIterator<Key, Source>>
	{
		/* ---------------------------------------------------------
			CONSTRUCTORS
		--------------------------------------------------------- */
		/**
		 * Initializer Constructor.
		 * 
		 * @param base The base iterator.
		 */
		public constructor(base: SetIterator<Key, Source>)
		{
			super(base);
		}

		/**
		 * @hidden
		 */
		protected _Create_neighbor(base: SetIterator<Key, Source>): SetReverseIterator<Key, Source>
		{
			return new SetReverseIterator(base);
		}
	}
}
