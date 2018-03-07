/// <reference path="../../API.ts" />

/// <reference path="SetContainer.ts" />

namespace std.base
{
	export abstract class MultiSet<T, Source extends MultiSet<T, Source>>
		extends SetContainer<T, Source>
	{
		/* ---------------------------------------------------------
			INSERT
		--------------------------------------------------------- */
		public insert(val: T): SetIterator<T, Source>;
		public insert(hint: SetIterator<T, Source>, val: T): SetIterator<T, Source>;
		public insert<U extends T, InputIterator extends Readonly<IForwardIterator<U, InputIterator>>>
			(begin: InputIterator, end: InputIterator): void;

		public insert(...args: any[]): any
		{
			return super.insert.apply(this, args);
		}

		/* ---------------------------------------------------------
			UTILITY
		--------------------------------------------------------- */
		public merge(source: Source): void
		{
			this.insert(source.begin(), source.end());
			source.clear();
		}
	}
}