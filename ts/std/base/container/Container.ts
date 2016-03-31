namespace std.base.container
{
	/**
	 * <p> An abstract container. </p>
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
		/* ---------------------------------------------------------------
			CONSTRUCTORS
		--------------------------------------------------------------- */
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
			if (args.length == 1 && (args[0] instanceof Vector || args[0] instanceof Container))
			{
				let container: IContainer<T> = args[0];

				this.assign(container.begin(), container.end());
			}
			else if (args.length == 2 && args[0] instanceof Iterator && args[1] instanceof Iterator)
			{
				let begin: Iterator<T> = args[0];
				let end: Iterator<T> = args[1];

				this.assign(begin, end);
			}
		}

		/**
		 * @inheritdoc
		 */
		public abstract assign<U extends T>(begin: Iterator<U>, end: Iterator<U>): void;

		/**
		 * @inheritdoc
		 */
		public clear(): void
		{
			this.erase(this.begin(), this.end());
		}

		/* ---------------------------------------------------------------
			ELEMENTS I/O
		--------------------------------------------------------------- */
		/**
		 * @inheritdoc
		 */
		public abstract push<U extends T>(...items: U[]): number;
		
		/**
		 * @inheritdoc
		 */
		public abstract insert(position: Iterator<T>, val: T): Iterator<T>;

		/**
		 * @inheritdoc
		 */
		public abstract erase(position: Iterator<T>): Iterator<T>;

		/**
		 * @inheritdoc
		 */
		public abstract erase<U extends T>(begin: Iterator<U>, end: Iterator<U>): Iterator<T>;
		
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
		public abstract size(): number;
		
		/**
		 * @inheritdoc
		 */
		public empty(): boolean
		{
			return this.size() == 0;
		}

		/* ===============================================================
			UTILITIES
		=============================================================== */
		public abstract swap(obj: Container<T>): void;
	}
}