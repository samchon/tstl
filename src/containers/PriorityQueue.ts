import { AdaptorContainer } from "../base/containers/AdaptorContainer";

import { TreeMultiSet } from "..";
import { IForwardIterator } from "../iterators/IForwardIterator";
import { less } from "../functional/comparators";

/**
 * Priority Queue; Higher Out First.
 * 
 * @author Jeongho Nam <http://samchon.org>
 */
export class PriorityQueue<T> 
	extends AdaptorContainer<T, TreeMultiSet<T>, PriorityQueue<T>>
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
	/* ---------------------------------------------------------
		CONSTURCTORS
	--------------------------------------------------------- */
	/**
	 * Default Constructor.
	 * 
	 * @param comp A binary function predicates *x* element would be placed before *y*. When returns `true`, then *x* precedes *y*. Note that, because *equality* is predicated by `!comp(x, y) && !comp(y, x)`, the function must not cover the *equality* like `<=` or `>=`. It must exclude the *equality* like `<` or `>`. Default is {@link less}.
	 */
	public constructor(comp?: (x: T, y: T) => boolean);

	/**
	 * Copy Constructor.
	 * 
	 * @param obj Object to copy.
	 */
	public constructor(obj: PriorityQueue<T>);

	/**
	 * Range Constructor.
	 * 
	 * @param first Input iterator of the first position.
	 * @param last Input iterator of the last position.
	 * @param comp A binary function predicates *x* element would be placed before *y*. When returns `true`, then *x* precedes *y*. Note that, because *equality* is predicated by `!comp(x, y) && !comp(y, x)`, the function must not cover the *equality* like `<=` or `>=`. It must exclude the *equality* like `<` or `>`. Default is {@link less}.
	 */
	public constructor
	(
		first: Readonly<IForwardIterator<T>>, 
		last: Readonly<IForwardIterator<T>>, 
		comp?: (x: T, y: T) => boolean
	);

	public constructor(...args: any[])
	{
		super();

		// DECLARE MEMBERS
		let comp: (x: T, y: T) => boolean = less;
		let post_process: () => void = null;

		//----
		// INITIALIZE MEMBERS AND POST-PROCESS
		//----
		// BRANCH - METHOD OVERLOADINGS
		if (args.length === 1 && args[0] instanceof PriorityQueue)
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
			if (args.length === 3)	comp = args[2];

			post_process = () =>
			{
				// RANGE CONSTRUCTOR
				let first: Readonly<IForwardIterator<T>> = args[0]; // PARAMETER 1
				let last: Readonly<IForwardIterator<T>> = args[1]; // PARAMETER 2

				this.source_.assign(first, last);
			};
		}
		else if (args.length === 1)
			comp = args[0];

		//----
		// DO PROCESS
		//----
		// CONSTRUCT CONTAINER
		this.source_ = new TreeMultiSet<T>(comp);

		// ACT POST-PROCESS
		if (post_process !== null)
			post_process();
	}

	/* ---------------------------------------------------------
		ACCESSORS
	--------------------------------------------------------- */
	/**
	 * Get value comparison function.
	 */
	public value_comp(): (x: T, y: T) => boolean
	{
		return this.source_.value_comp();
	}

	/**
	 * Get top element.
	 */
	public top(): T
	{
		return this.source_.end().prev().value;
	}

	/**
	 * @inheritDoc
	 */
	public pop(): void
	{
		this.source_.erase(this.source_.end().prev());
	}
}

export type priority_queue<T> = PriorityQueue<T>;
export const priority_queue = PriorityQueue;