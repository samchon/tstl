namespace std.base
{
	/**
	 * <p> An abstract container. </p>
	 * 
	 * <p> <img src="../assets/images/design/abstract_containers.png" width="100%" /> </p>
	 *
	 * <h3> Container properties </h3>
	 * <dl>
	 * 	<dt> Sequence </dt>
	 * 	<dd> Elements in sequence containers are ordered in a strict linear sequence. Individual elements are 
	 *		 accessed by their position in this sequence. </dd>
	 *
	 * 	<dt> Doubly-linked list </dt>
	 *	<dd> Each element keeps information on how to locate the next and the previous elements, allowing 
	 *		 constant time insert and erase operations before or after a specific element (even of entire ranges), 
	 *		 but no direct random access. </dd>
	 * </dl>
	 *
	 * @param <T> Type of elements.
	 * 
	 * @author Jeongho Nam <http://samchon.org>
	 */
	export abstract class Container<T>
		implements IContainer<T>
	{
		/* =========================================================
			CONSTRUCTORS & SEMI-CONSTRUCTORS
				- CONSTRUCTORS
				- ASSIGN & CLEAR
		============================================================
			CONSTURCTORS
		--------------------------------------------------------- */
		/**
		 * <p> Default Constructor. </p>
		 *
		 * <p> Constructs an empty container, with no elements. </p>
		 */
		public constructor();

		/**
		 * <p> Initializer list Constructor. </p>
		 *
		 * <p> Constructs a container with a copy of each of the elements in <i>array</i>, in the same order. </p>
		 *
		 * @param array An array containing elements to be copied and contained.
		 */
		public constructor(array: Array<T>);

		/**
		 * <p> Copy Constructor. </p>
		 *
		 * <p> Constructs a container with a copy of each of the elements in <i>container</i>, in the same order. </p>
		 *
		 * @param container Another container object of the same type (with the same class template 
		 *					arguments <i>T</i>), whose contents are either copied or acquired.
		 */
		public constructor(container: IContainer<T>);

		/**
		 * <p> Range Constructor. </p>
		 *
		 * <p> Constructs a container with as many elements as the range (<i>begin</i>, <i>end<i>), with each 
		 * element emplace-constructed from its corresponding element in that range, in the same order. </p>
		 *
		 * @param begin Input interator of the initial position in a sequence.
		 * @param end Input interator of the final position in a sequence.
		 */
		public constructor(begin: Iterator<T>, end: Iterator<T>);
		
		public constructor(...args: any[])
		{
			// THIS IS ABSTRACT CLASS
			// NOTHING TO DO ESPECIALLY
		}

		/* ---------------------------------------------------------
			ASSIGN & CLEAR
		--------------------------------------------------------- */
		/**
		 * @inheritdoc
		 */
		public abstract assign<U extends T, InputIterator extends Iterator<U>>
			(begin: InputIterator, end: InputIterator): void;

		/**
		 * @inheritdoc
		 */
		public clear(): void
		{
			this.erase(this.begin(), this.end());
		}
		
		/* ---------------------------------------------------------------
			GETTERS
		--------------------------------------------------------------- */
		/**
		 * @inheritdoc
		 */
		public abstract begin(): Iterator<T>;

		/**
		 * @inheritdoc
		 */
		public abstract end(): Iterator<T>;

		/**
		 * @inheritdoc
		 */
		public abstract rbegin(): base.IReverseIterator<T>;

		/**
		 * @inheritdoc
		 */
		public abstract rend(): base.IReverseIterator<T>;

		/**
		 * @inheritdoc
		 */
		public abstract size(): number;
		
		/**
		 * @inheritdoc
		 */
		public empty(): boolean
		{
			return this.size() == 0;
		}

		/* =========================================================
			ELEMENTS I/O
				- INSERT
				- ERASE
		============================================================
			INSERT
		--------------------------------------------------------- */
		/**
		 * @inheritdoc
		 */
		public abstract push<U extends T>(...items: U[]): number;

		/**
		 * @inheritdoc
		 */
		public abstract insert(position: Iterator<T>, val: T): Iterator<T>;

		/* ---------------------------------------------------------
			ERASE
		--------------------------------------------------------- */
		/**
		 * @inheritdoc
		 */
		public abstract erase(position: Iterator<T>): Iterator<T>;

		/**
		 * @inheritdoc
		 */
		public abstract erase<U extends T>(begin: Iterator<U>, end: Iterator<U>): Iterator<T>;

		/* ---------------------------------------------------------------
			UTILITIES
		--------------------------------------------------------------- */
		/**
		 * @inheritdoc
		 */
		public swap(obj: IContainer<T>): void
		{
			let supplement: Vector<T> = new Vector<T>(this.begin(), this.end());

			this.assign(obj.begin(), obj.end());
			obj.assign(supplement.begin(), supplement.end());
		}
	}
}