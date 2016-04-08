/// <reference path="SetContainer.ts" />

namespace std.base.container
{
	/**
	 * @author Jeongho Nam <http://samchon.org>
	 */
	export abstract class MultiSet<T>
		extends SetContainer<T>
	{
		/* ---------------------------------------------------------
			CONSTRUCTORS
		--------------------------------------------------------- */
		/**
		 * Default Constructor.
		 */
		public constructor()
		{
			super();
		}

		/**
		 * 
		 * @param val
		 */
		public count(val: T): number
		{
			let myIt = this.find(val);
			if (myIt.equals(this.end()))
				return 0;

			let size: number = 0;
			for (let it = myIt; !it.equals(this.end()) && std.equals(val, it.value); it = it.next())
				size++;

			return size;
		}

		/* ---------------------------------------------------------
			ELEMENTS I/O
		--------------------------------------------------------- */
		/**
		 * 
		 * @param val
		 */
		public insert(val: T): SetIterator<T>;

		/**
		 * @inheritdoc
		 */
		public insert(hint: SetIterator<T>, val: T): SetIterator<T>;

		/**
		 * @inheritdoc
		 */
		public insert<U extends T, InputIterator extends Iterator<U>>
			(begin: InputIterator, end: InputIterator): void;

		public insert(...args: any[]): any
		{
			return super.insert.apply(this, args);
		}
	}
}