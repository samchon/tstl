import { Vector } from "./Vector";

export class Stack<T>
{
	private source_: Vector<T>;

	/* ---------------------------------------------------------
		CONSTRUCTORS
	--------------------------------------------------------- */
	public constructor();

	public constructor(stack: Stack<T>);

	public constructor(stack: Stack<T> = null)
	{
		this.source_ = new Vector<T>();

		if (stack != null)
			this.source_.assign(stack.source_.begin(), stack.source_.end());
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

	public top(): T
	{
		return this.source_.back();
	}

	/* ---------------------------------------------------------
		ELEMENTS I/O
	--------------------------------------------------------- */
	public push(...elems: T[]): void
	{
		this.source_.push(...elems);
	}

	public pop(): void
	{
		this.source_.pop_back();
	}

	public swap(obj: Stack<T>): void
	{
		[this.source_, obj.source_] = [obj.source_, this.source_];
	}
}

export type stack<T> = Stack<T>;
export var stack = Stack;