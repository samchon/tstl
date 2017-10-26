/// <reference path="../../API.ts" />

/// <reference path="SetContainer.ts" />

namespace std.base
{
	export abstract class MultiSet<T, Source extends IMultiSet<T>>
		extends SetContainer<T, Source>
	{
		/* ---------------------------------------------------------
			INSERT
		--------------------------------------------------------- */
		public insert(val: T): SetIterator<T, Source>;

		public insert(hint: SetIterator<T, Source>, val: T): SetIterator<T, Source>;

		public insert(hint: SetReverseIterator<T, Source>, val: T): SetReverseIterator<T, Source>;

		public insert<U extends T, InputIterator extends Iterator<U>>
			(begin: InputIterator, end: InputIterator): void;

		public insert(...args: any[]): any
		{
			return super.insert.apply(this, args);
		}

		/* ---------------------------------------------------------
			UTILITY
		--------------------------------------------------------- */
		public merge(source: SetContainer<T, Source>): void
		{
			this.insert(source.begin(), source.end());
			source.clear();
		}
	}
}