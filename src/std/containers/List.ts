/// <reference path="../API.ts" />

/// <reference path="../base/containers/_ListContainer.ts" />
/// <reference path="../base/iterators/_ListIteratorBase.ts" />

namespace std
{
	export class List<T>
		extends base._ListContainer<T, List.Iterator<T>>
		implements base.IDequeContainer<T>
	{
		/**
		 * @hidden
		 */
		private ptr_: IPointer<List<T>>;

		/**
		 * @hidden
		 */
		private rend_: List.ReverseIterator<T>;

		/* =========================================================
			CONSTRUCTORS & SEMI-CONSTRUCTORS
				- CONSTRUCTORS
				- ASSIGN & CLEAR
		============================================================
			CONSTURCTORS
		--------------------------------------------------------- */
		public constructor();
		public constructor(items: Array<T>);
		public constructor(size: number, val: T);
		public constructor(container: List<T>);
		public constructor(first: IForwardIterator<T>, last: IForwardIterator<T>);

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

		/**
		 * @hidden
		 */
		protected _Set_begin(it: List.Iterator<T>): void
		{
			super._Set_begin(it);
			this.rend_ = new List.ReverseIterator<T>(it);
		}

		/* ---------------------------------------------------------
			ASSIGN & CLEAR
		--------------------------------------------------------- */
		public assign(n: number, val: T): void;
		public assign<U extends T, InputIterator extends IForwardIterator<U>>
			(begin: InputIterator, end: InputIterator): void;

		public assign<U extends T, InputIterator extends IForwardIterator<U>>
			(par1: any, par2: any): void
		{
			this.clear();
			this.insert(this.end(), par1, par2);
		}
		
		/* =========================================================
			ACCESSORS
		========================================================= */
		public rbegin(): List.ReverseIterator<T>
		{
			return new List.ReverseIterator<T>(this.end());
		}

		public rend(): List.ReverseIterator<T>
		{
			return this.rend_;
		}

		/* =========================================================
			ELEMENTS I/O
				- INSERT
				- ERASE
				- POST-PROCESS
		============================================================
			INSERT
		--------------------------------------------------------- */
		public insert(position: List.Iterator<T>, val: T): List.Iterator<T>;

		public insert(position: List.Iterator<T>, size: number, val: T): List.Iterator<T>;

		public insert<U extends T, InputIterator extends IForwardIterator<U>>
			(position: List.Iterator<T>, begin: InputIterator, end: InputIterator): List.Iterator<T>;
		
		public insert(position: List.ReverseIterator<T>, val: T): List.ReverseIterator<T>;

		public insert(position: List.ReverseIterator<T>, size: number, val: T): List.ReverseIterator<T>;

		public insert<U extends T, InputIterator extends IForwardIterator<U>>
			(position: List.ReverseIterator<T>, begin: InputIterator, end: InputIterator): List.ReverseIterator<T>;

		public insert(...args: any[]): List.Iterator<T> | List.ReverseIterator<T>
		{
			// REVERSE_ITERATOR TO ITERATOR
			let ret: List.Iterator<T>;
			let is_reverse_iterator: boolean = false;

			if (args[0] instanceof List.ReverseIterator)
			{
				is_reverse_iterator = true;
				args[0] = (args[0] as List.ReverseIterator<T>).base().prev();
			}

			//----
			// DO INSERT VIA SUPER
			//----
			ret = super.insert.apply(this, args);
			
			// RETURNS
			if (is_reverse_iterator == true)
				return new List.ReverseIterator<T>(ret.next());
			else
				return ret;
		}

		/* ---------------------------------------------------------
			ERASE
		--------------------------------------------------------- */
		public erase(position: List.Iterator<T>): List.Iterator<T>;
		
		public erase(begin: List.Iterator<T>, end: List.Iterator<T>): List.Iterator<T>;

		public erase(position: List.ReverseIterator<T>): List.ReverseIterator<T>;

		public erase(begin: List.ReverseIterator<T>, end: List.ReverseIterator<T>): List.ReverseIterator<T>;

		public erase(first: any, last: any = first.next()): List.Iterator<T> | List.ReverseIterator<T>
		{
			let ret: List.Iterator<T>;
			let is_reverse_iterator: boolean = false;

			// REVERSE ITERATOR TO ITERATOR
			if (first instanceof List.ReverseIterator)
			{
				is_reverse_iterator = true;

				let first_it = (last as List.ReverseIterator<T>).base();
				let last_it = (first as List.ReverseIterator<T>).base();

				first = first_it;
				last = last_it;
			}

			// ERASE ELEMENTS
			ret = this._Erase_by_range(first, last);

			// RETURN BRANCHES
			if (is_reverse_iterator == true)
				return new List.ReverseIterator<T>(ret.next());
			else
				return ret;
		}

		/* ===============================================================
			ALGORITHMS
				- UNIQUE & REMOVE(_IF)
				- MERGE & SPLICE
				- SORT & SWAP
		==================================================================
			UNIQUE & REMOVE(_IF)
		--------------------------------------------------------------- */
		public unique(): void;

		public unique(binary_pred: (left: T, right: T) => boolean): void;

		public unique(binary_pred: (left: T, right: T) => boolean = equal_to): void
		{
			let it = this.begin().next();

			while (!it.equals(this.end()))
			{
				if (equal_to(it.value, it.prev().value) == true)
					it = this.erase(it);
				else
					it = it.next();
			}
		}

		public remove(val: T): void
		{
			let it = this.begin();

			while (!it.equals(this.end()))
			{
				if (equal_to(it.value, val) == true)
					it = this.erase(it);
				else
					it = it.next();
			}
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
		public merge<U extends T>(obj: List<U>): void;

		public merge<U extends T>(obj: List<U>, compare: (left: T, right: T) => boolean): void;

		public merge<U extends T>(obj: List<U>, compare: (left: T, right: T) => boolean = less): void
		{
			if (this == <List<T>>obj)
				return;

			let it = this.begin();

			while (obj.empty() == false)
			{
				let first = obj.begin();
				while (!it.equals(this.end()) && compare(it.value, first.value) == true)
					it = it.next();

				this.splice(it, obj, first);
			}
		}

		public splice<U extends T>(position: List.Iterator<T>, obj: List<U>): void;
		
		public splice<U extends T>(position: List.Iterator<T>, obj: List<U>, it: List.Iterator<U>): void;
		
		public splice<U extends T>
			(position: List.Iterator<T>, obj: List<U>, begin: List.Iterator<U>, end: List.Iterator<U>): void;

		public splice<U extends T>
			(
				position: List.Iterator<T>, obj: List<U>, 
				begin: List.Iterator<U> = null, end: List.Iterator<U> = null): void
		{
			if (begin == null)
			{
				begin = obj.begin();
				end = obj.end();
			}
			else if (end == null)
			{
				end = begin.next();
			}

			this.insert(position, begin, end);
			obj.erase(begin, end);
		}

		/* ---------------------------------------------------------
			SORT & SWAP
		--------------------------------------------------------- */
		public sort(): void;

		public sort(compare: (left: T, right: T) => boolean): void;

		public sort(compare: (left: T, right: T) => boolean = less): void
		{
			this._Quick_sort(this.begin(), this.end().prev(), compare);
		}

		/**
		 * @hidden
		 */
		private _Quick_sort(first: List.Iterator<T>, last: List.Iterator<T>, compare: (left: T, right: T) => boolean): void
		{
			if (!first.equals(last) && !last.equals(this.end()) && !first.equals(last.next()))
			{
				let temp: List.Iterator<T> = this._Quick_sort_partition(first, last, compare);

				this._Quick_sort(first, temp.prev(), compare);
				this._Quick_sort(temp.next(), last, compare);
			}
		}

		/**
		 * @hidden
		 */
		private _Quick_sort_partition(first: List.Iterator<T>, last: List.Iterator<T>, compare: (left: T, right: T) => boolean): List.Iterator<T>
		{
			let standard: T = last.value; // TO BE COMPARED
			let prev: List.Iterator<T> = first.prev(); // TO BE SMALLEST

			let it: List.Iterator<T> = first;
			for (; !it.equals(last); it = it.next())
				if (compare(it.value, standard))
				{
					prev = prev.equals(this.end()) ? first : prev.next();
					[prev.value, it.value] = [it.value, prev.value];
				}

			prev = prev.equals(this.end()) ? first : prev.next();
			[prev.value, it.value] = [it.value, prev.value];
		
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
			this._Set_begin(begin); // THE NEW BEGIN
			this.end()["prev_"] = prev_of_end;
			this.end()["next_"] = begin;
		}
		
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
		extends base._ListIteratorBase<T>
		implements IComparable<Iterator<T>>
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

		/* ---------------------------------------------------------------
			ACCESSORS
		--------------------------------------------------------------- */
		public source(): List<T>
		{
			return this.source_ptr_.value;
		}

		public get value(): T
		{
			return this.value_;
		}

		public set value(val: T)
		{
			this.value_ = val;
		}

		/* ---------------------------------------------------------
			MOVERS
		--------------------------------------------------------- */
		public prev(): Iterator<T>
		{
			return this.prev_ as Iterator<T>;
		}

		public next(): Iterator<T>
		{
			return this.next_ as Iterator<T>;
		}

		public advance(step: number): Iterator<T>
		{
			return super.advance(step) as Iterator<T>;
		}

		/* ---------------------------------------------------------------
			COMPARISON
		--------------------------------------------------------------- */
		public equals(obj: Iterator<T>): boolean
		{
			return this == obj;
		}

		public swap(obj: Iterator<T>): void
		{
			super.swap(obj);
		}
	}

	export class ReverseIterator<T>
		extends base.ReverseIterator<T, List<T>, Iterator<T>, ReverseIterator<T>>
		implements base.ILinearIterator<T>, IComparable<ReverseIterator<T>>
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