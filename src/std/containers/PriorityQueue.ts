/// <reference path="../API.ts" />

namespace std
{
	export class PriorityQueue<T>
	{
		//--------
		// The <i>underlying container</i> for implementing the <i>priority queue</i>.
		//
		// Following standard definition from the C++ committee, the <i>underlying container</i> should be one of
		// {@link Vector} or {@link Deque}, however, I've adopted {@link TreeMultiSet} instead of them. Of course,
		// there are proper reasons for adapting the {@link TreeMultiSet} even violating standard advice.
		//
		// <i>Underlying container</i> of {@link PriorityQueue} must keep a condition; the highest (or lowest)
		// element must be placed on the terminal node for fast retrieval and deletion. To keep the condition with
		// {@link Vector} or {@link Deque}, lots of times will only be spent for re-arranging elements. It calls
		// rearrangement functions like <i>make_heap</i>, <i>push_heap</i> and <i>pop_head</i> for rearrangement.
		//
		// However, the {@link TreeMultiSet} container always keeps arrangment automatically without additional
		// operations and it even meets full criteria of {@link PriorityQueue}. Those are the reason why I've adopted
		// {@link TreeMultiSet} as the <i>underlying container</i> of {@link PriorityQueue}.
		//--------
		/**
		 * @hidden
		 */
		private container_: TreeMultiSet<T>;

		/* =========================================================
			CONSTRUCTORS & SEMI-CONSTRUCTORS
				- CONSTRUCTORS
				- ASSIGN & CLEAR
		============================================================
			CONSTURCTORS
		--------------------------------------------------------- */
		public constructor();

		public constructor(compare: (left: T, right: T) => boolean);

		public constructor(array: Array<T>);

		public constructor(array: Array<T>, compare: (left: T, right: T) => boolean);

		public constructor(container: base.Container<T>);

		public constructor(container: base.Container<T>, compare: (left: T, right: T) => boolean);

		public constructor(begin: IForwardIterator<T>, end: IForwardIterator<T>);

		public constructor(begin: IForwardIterator<T>, end: IForwardIterator<T>, compare: (left: T, right: T) => boolean);

		public constructor(...args: any[])
		{
			// INIT MEMBER
			this.container_ = new TreeMultiSet<T>();

			if (args.length >= 1 && args[0] instanceof base.Container)
			{
				// COPY CONSTRUCTOR
				let container: base.Container<T> = args[0]; // PARAMETER
				if (args.length == 2) // SPECIFIED COMPARISON FUNCTION
					this.container_["tree_"]["compare_"] = (args[1]);

				this.container_.assign(container.begin(), container.end());
			}
			else if (args.length >= 1 && args[0] instanceof Array)
			{
				// INITIALIZER LIST CONSTRUCTOR
				let items: T[] = args[0]; // PARAMETER
				if (args.length == 2) // SPECIFIED COMPARISON FUNCTION
					this.container_["tree_"]["compare_"] = (args[1]);

				this.container_.push(...items);
			}
			else if (args.length >= 2 && args[0].next instanceof Function && args[1].next instanceof Function)
			{
				// RANGE CONSTRUCTOR
				let first: IForwardIterator<T> = args[0]; // PARAMETER 1
				let last: IForwardIterator<T> = args[1]; // PARAMETER 2
				
				if (args.length == 3) // SPECIFIED COMPARISON FUNCTION
					this.container_["tree_"]["compare_"] = (args[2]);

				this.container_.assign(first, last);
			}
			else if (args.length == 1)
			{
				// DEFAULT CONSTRUCTOR WITH SPECIFIED COMPARISON FUNCTION
				this.container_["tree_"]["compare_"] = (args[0]);
			}
		}

		/* ---------------------------------------------------------
			ACCESSORS
		--------------------------------------------------------- */
		public size(): number
		{
			return this.container_.size();
		}

		public empty(): boolean
		{
			return this.container_.empty();
		}

		/* ---------------------------------------------------------
			ELEMENTS I/O
		--------------------------------------------------------- */
		public top(): T
		{
			return this.container_.begin().value;
		}

		public push(val: T): void
		{
			this.container_.insert(val);
		}

		public pop(): void
		{
			this.container_.erase(this.container_.begin());
		}

		public swap(obj: PriorityQueue<T>): void
		{
			this.container_.swap(obj.container_);
		}
	}
}