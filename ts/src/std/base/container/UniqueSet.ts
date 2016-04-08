/// <reference path="SetContainer.ts" />

namespace std.base.container
{
	/**
	 * @author Jeongho Nam <http://samchon.org>
	 */
	export abstract class UniqueSet<T>
		extends SetContainer<T>
	{
		/* =========================================================
			CONSTRUCTORS
		========================================================= */
		/**
		 * Default Constructor.
		 */
		public constructor()
		{
			super();
		}

		/**
		 * @inheritdoc
		 */
		public count(key: T): number
		{
			return this.find(key).equals(this.end()) ? 0 : 1;
		}

		/* =========================================================
			ELEMENTS I/O
		========================================================= */
		/**
		 * <p> Insert an element. </p>
		 *
		 * <p> Extends the container by inserting new elements, effectively increasing the container size by the 
		 * number of elements inserted. </p>
		 *
		 * <p> Because elements in a {@link UniqueSet UniqueSets} are unique, the insertion operation checks whether 
		 * each inserted element is equivalent to an element already in the container, and if so, the element is not 
		 * inserted, returning an iterator to this existing element (if the function returns a value). </p>
		 *
		 * <p> For a similar container allowing for duplicate elements, see {@link MultiSet}. </p>
		 * 
		 * @param key Value to be inserted as an element.
		 *
		 * @return A {@link Pair}, with its member {@link Pair.first} set to an iterator pointing to either the newly 
		 *		   inserted element or to the equivalent element already in the {@link UniqueSet}. The 
		 *		   {@link Pair.second} element in the {@link Pair} is set to true if a new element was inserted or 
		 *		   false if an equivalent element already existed.
		 */
		public insert(val: T): Pair<SetIterator<T>, boolean>;

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