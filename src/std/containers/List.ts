/// <reference path="../API.ts" />

/// <reference path="../base/containers/ListContainer.ts" />
/// <reference path="../base/iterators/ListIterator.ts" />

namespace std
{
	export class List<T>
		extends base.ListContainer<T, List<T>, List.Iterator<T>, List.ReverseIterator<T>>
		implements base.IDequeContainer<T, List<T>, List.Iterator<T>, List.ReverseIterator<T>>
	{
		/**
		 * @hidden
		 */
		private ptr_: IPointer<List<T>>;

		/* ---------------------------------------------------------
			CONSTURCTORS
		--------------------------------------------------------- */
		/**
		 * Default Constructor.
		 */
		public constructor();

		/**
		 * Initializer Constructor.
		 * 
		 * @param items Items to assign.
		 */
		public constructor(items: Array<T>);

		/**
		 * Copy Constructor
		 * 
		 * @param obj Object to copy.
		 */
		public constructor(obj: List<T>);

		/**
		 * Fill Constructor.
		 * 
		 * @param size Initial size.
		 * @param val Value to fill.
		 */
		public constructor(size: number, val: T);

		/**
		 * Range Constructor.
		 * 
		 * @param first Input iterator of the first position.
		 * @param last Input iteartor of the last position.
		 */
		public constructor(first: Readonly<IForwardIterator<T>>, last: Readonly<IForwardIterator<T>>);

		public constructor(...args: any[])
		{
			//----
			// DEFAULT CONFIGURATIONS
			//----
			// INHERITS
			super();

			// DECLARE SOURCE POINTER
			this.ptr_ = {value: this};
			this["end_"]["source_ptr_"] = this.ptr_;

			//----
			// BRANCHES
			//----
			if (args.length == 0) 
			{
				// DEFAULT CONSTRUCTOR
			}
			else if (args.length == 1 && args[0] instanceof Array) 
			{
				// INITIALIZER CONSTRUCTOR
				let array: Array<T> = args[0];
				this.push(...array);
			}
			else if (args.length == 1 && (args[0] instanceof List)) 
			{
				// COPY CONSTRUCTOR
				let container: List<T> = args[0];
				this.assign(container.begin(), container.end());
			}
			else if (args.length == 2) 
			{
				// ASSIGN CONTRUCTOR
				this.assign(args[0], args[1]);
			}
		}

		/**
		 * @hidden
		 */
		protected _Create_iterator(prev: List.Iterator<T>, next: List.Iterator<T>, val: T): List.Iterator<T>
		{
			return new List.Iterator<T>(this.ptr_, prev as List.Iterator<T>, next as List.Iterator<T>, val);
		}

		/* ===============================================================
			ALGORITHMS
				- UNIQUE & REMOVE(_IF)
				- MERGE & SPLICE
				- SORT & SWAP
		==================================================================
			UNIQUE & REMOVE(_IF)
		--------------------------------------------------------------- */
		public unique(binary_pred: (x: T, y: T) => boolean = equal_to): void
		{
			let it = this.begin().next();

			while (!it.equals(this.end()))
			{
				if (binary_pred(it.value, it.prev().value) == true)
					it = this.erase(it);
				else
					it = it.next();
			}
		}

		public remove(val: T): void
		{
			this.remove_if(function (x: T): boolean
			{
				return x == val;
			});
		}

		public remove_if(pred: (val: T) => boolean): void
		{
			let it = this.begin();

			while (!it.equals(this.end()))
			{
				if (pred(it.value) == true)
					it = this.erase(it);
				else
					it = it.next();
			}
		}

		/* ---------------------------------------------------------
			MERGE & SPLICE
		--------------------------------------------------------- */
		public merge<U extends T>(obj: List<U>, comp: (x: T, y: T) => boolean = less): void
		{
			if (this == <List<T>>obj)
				return;

			let it = this.begin();

			while (obj.empty() == false)
			{
				let first = obj.begin();
				while (!it.equals(this.end()) && comp(it.value, first.value) == true)
					it = it.next();

				this.splice(it, obj, first);
			}
		}

		public splice<U extends T>(position: List.Iterator<T>, obj: List<U>): void;
		
		public splice<U extends T>(position: List.Iterator<T>, obj: List<U>, it: List.Iterator<U>): void;
		
		public splice<U extends T>
			(position: List.Iterator<T>, obj: List<U>, first: List.Iterator<U>, last: List.Iterator<U>): void;

		public splice<U extends T>
			(
				position: List.Iterator<T>, obj: List<U>, 
				first: List.Iterator<U> = null, last: List.Iterator<U> = null
			): void
		{
			if (first == null)
			{
				first = obj.begin();
				last = obj.end();
			}
			else if (last == null)
			{
				last = first.next();
			}

			this.insert(position, first, last);
			obj.erase(first, last);
		}

		/* ---------------------------------------------------------
			SORT & SWAP
		--------------------------------------------------------- */
		public sort(comp: (x: T, y: T) => boolean = less): void
		{
			this._Quick_sort(this.begin(), this.end().prev(), comp);
		}

		/**
		 * @hidden
		 */
		private _Quick_sort(first: List.Iterator<T>, last: List.Iterator<T>, comp: (x: T, y: T) => boolean): void
		{
			if (!first.equals(last) && !last.equals(this.end()) && !first.equals(last.next()))
			{
				let temp: List.Iterator<T> = this._Quick_sort_partition(first, last, comp);

				this._Quick_sort(first, temp.prev(), comp);
				this._Quick_sort(temp.next(), last, comp);
			}
		}

		/**
		 * @hidden
		 */
		private _Quick_sort_partition(first: List.Iterator<T>, last: List.Iterator<T>, comp: (x: T, y: T) => boolean): List.Iterator<T>
		{
			let standard: T = last.value; // TO BE COMPARED
			let prev: List.Iterator<T> = first.prev(); // TO BE SMALLEST

			let it: List.Iterator<T> = first;
			for (; !it.equals(last); it = it.next())
				if (comp(it.value, standard))
				{
					prev = prev.equals(this.end()) ? first : prev.next();
					[prev["value_"], it["value_"]] = [it["value_"], prev["value_"]];
				}

			prev = prev.equals(this.end()) ? first : prev.next();
			[prev["value_"], it["value_"]] = [it["value_"], prev["value_"]];
		
			return prev;
		}

		public reverse(): void
		{
			let begin: List.Iterator<T> = this.end().prev();
			let prev_of_end: List.Iterator<T> = this.begin();

			for (let it = this.begin(); !it.equals(this.end()); )
			{
				let next = it.next();
				[it["prev_"], it["next_"]] = [it["next_"], it["prev_"]];

				it = next;
			}
			
			// ADJUST THE BEGIN AND END
			this["begin_"] = begin; // THE NEW BEGIN
			this.end()["prev_"] = prev_of_end;
			this.end()["next_"] = begin;
		}
		
		/**
		 * @inheritDoc
		 */
		public swap(obj: List<T>): void
		{
			// CHANGE CONTENTS
			super.swap(obj);

			// CHANGE ITERATORS' SOURCES
			[this.ptr_, obj.ptr_] = [obj.ptr_, this.ptr_];
			[this.ptr_.value, obj.ptr_.value] = [obj.ptr_.value, this.ptr_.value];
		}
	}
}

namespace std.List
{
	export class Iterator<T>
		extends base.ListIterator<T, List<T>, Iterator<T>, ReverseIterator<T>>
	{
		/**
		 * @hidden
		 */
		private source_ptr_: IPointer<List<T>>;

		/* ---------------------------------------------------------------
			CONSTRUCTORS
		--------------------------------------------------------------- */
		/**
		 * @hidden
		 */
		public constructor(sourcePtr: IPointer<List<T>>, prev: Iterator<T>, next: Iterator<T>, value: T)
		{
			super(prev, next, value);
			this.source_ptr_ = sourcePtr;
		}

		public reverse(): ReverseIterator<T>
		{
			return new ReverseIterator(this);
		}

		/* ---------------------------------------------------------------
			ACCESSORS
		--------------------------------------------------------------- */
		public source(): List<T>
		{
			return this.source_ptr_.value;
		}

		public get value(): T
		{
			return this["value_"];
		}

		public set value(val: T)
		{
			this["value_"] = val;
		}

		/* ---------------------------------------------------------------
			COMPARISON
		--------------------------------------------------------------- */
		public equals(obj: Iterator<T>): boolean
		{
			return this == obj;
		}
	}

	export class ReverseIterator<T>
		extends base.ReverseIterator<T, List<T>, Iterator<T>, ReverseIterator<T>>
	{
		/* ---------------------------------------------------------------
			CONSTRUCTORS
		--------------------------------------------------------------- */
		public constructor(base: Iterator<T>)
		{
			super(base);
		}

		/**
		 * @hidden
		 */
		protected _Create_neighbor(base: Iterator<T>): ReverseIterator<T>
		{
			return new ReverseIterator<T>(base);
		}

		/* ---------------------------------------------------------
			ACCESSORS
		--------------------------------------------------------- */
		public get value(): T
		{
			return this.base_.value;
		}

		public set value(val: T)
		{
			this.base_.value = val;
		}
	}
}