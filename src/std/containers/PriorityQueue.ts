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
		private source_: TreeMultiSet<T>;

		/* ---------------------------------------------------------
			CONSTURCTORS
		--------------------------------------------------------- */
		public constructor(comp?: (x: T, y: T) => boolean);
		public constructor(obj: PriorityQueue<T>);
		public constructor(first: Readonly<IForwardIterator<T>>, last: Readonly<IForwardIterator<T>>, comp?: (x: T, y: T) => boolean);

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
				
				comp = obj.source_.key_comp();
				post_process = () => 
				{
					let first = obj.source_.begin();
					let last = obj.source_.end();

					this.source_.assign(first, last);
				};
			}
			else if (args.length >= 2 && args[0].next instanceof Function && args[1].next instanceof Function)
			{
				// FUNCTION TEMPLATE
				if (args.length == 3)	comp = args[2];

				post_process = () =>
				{
					// RANGE CONSTRUCTOR
					let first: Readonly<IForwardIterator<T>> = args[0]; // PARAMETER 1
					let last: Readonly<IForwardIterator<T>> = args[1]; // PARAMETER 2

					this.source_.assign(first, last);
				};
			}
			else if (args.length == 1)
				comp = args[0];

			//----
			// DO PROCESS
			//----
			// CONSTRUCT CONTAINER
			this.source_ = new std.TreeMultiSet<T>(comp);

			// ACT POST-PROCESS
			if (post_process != null)
				post_process();
		}

		public swap(obj: PriorityQueue<T>): void
		{
			this.source_.swap(obj.source_);
		}

		/* ---------------------------------------------------------
			ACCESSORS
		--------------------------------------------------------- */
		public size(): number
		{
			return this.source_.size();
		}

		public empty(): boolean
		{
			return this.source_.empty();
		}

		public value_comp(): (x: T, y: T) => boolean
		{
			return this.source_.value_comp();
		}

		/* ---------------------------------------------------------
			ELEMENTS I/O
		--------------------------------------------------------- */
		public top(): T
		{
			return this.source_.begin().value;
		}

		public push(...elems: T[]): void
		{
			this.source_.push(...elems);
		}

		public pop(): void
		{
			this.source_.erase(this.source_.begin());
		}
	}
}