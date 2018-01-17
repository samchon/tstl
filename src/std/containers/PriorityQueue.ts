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
		public constructor(comp: (x: T, y: T) => boolean);

		public constructor(obj: PriorityQueue<T>);
		public constructor(first: IForwardIterator<T>, last: IForwardIterator<T>);
		public constructor(first: IForwardIterator<T>, last: IForwardIterator<T>, comp: (x: T, y: T) => boolean);

		public constructor(...args: any[])
		{
			// DECLARE MEMBERS
			let comp: (x: T, y: T) => boolean = std.less;
			let post_process: () => void = null;

			//----
			// INITIALIZE MEMBERS AND POST-PROCESS
			//----
			// BRANCH - METHOD OVERLOADINGS
			if (args.length == 1 && args[0] instanceof PriorityQueue)
			{
				let obj: PriorityQueue<T> = args[0];
				
				comp = obj.container_.key_comp();
				post_process = () => 
				{
					let first = obj.container_.begin();
					let last = obj.container_.end();

					this.container_.assign(first, last);
				};
			}
			else if (args.length >= 2 && args[0].next instanceof Function && args[1].next instanceof Function)
			{
				// FUNCTION TEMPLATE
				if (args.length == 3)	comp = args[2];

				post_process = () =>
				{
					// RANGE CONSTRUCTOR
					let first: IForwardIterator<T> = args[0]; // PARAMETER 1
					let last: IForwardIterator<T> = args[1]; // PARAMETER 2

					this.container_.assign(first, last);
				};
			}
			else if (args.length == 1)
				comp = args[0];

			//----
			// DO PROCESS
			//----
			// CONSTRUCT CONTAINER
			this.container_ = new std.TreeMultiSet<T>(comp);

			// ACT POST-PROCESS
			if (post_process != null)
				post_process();
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