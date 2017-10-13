/// <reference path="../API.ts" />

namespace std
{
	export class ForwardList<T>
	{
		/**
		 * @hidden
		 */
		private ptr_: IPointer<ForwardList<T>>;

		/**
		 * @hidden
		 */
		private size_: number;

		/**
		 * @hidden
		 */
		private before_begin_: ForwardListIterator<T>;

		/**
		 * @hidden
		 */
		private end_: ForwardListIterator<T>;

		/* =========================================================
			CONSTRUCTORS & SEMI-CONSTRUCTORS
				- CONSTRUCTORS
				- ASSIGN & CLEAR
		============================================================
			CONSTURCTORS
		--------------------------------------------------------- */
		/**
		 * Default Constructor.
		 */
		public constructor();

		/**
		 * Copy Constructor.
		 * 
		 * @param obj Target container to be copied.
		 */
		public constructor(obj: ForwardList<T>);
		public constructor(n: number, val: T);
		public constructor(first: IForwardIterator<T>, last: IForwardIterator<T>);

		public constructor(...args: any[])
		{
			this.ptr_ = {value: this};

			this.clear();
		}

		/* ---------------------------------------------------------
			ASSIGN & CLEAR
		--------------------------------------------------------- */
		public assign(n: number, val: T): void;
		public assign<T, InputIterator extends IForwardIterator<T>>
			(first: InputIterator, last: InputIterator): void;

		public assign(first: any, last: any): void
		{
			this.clear();

			this.insert_after(this.before_begin_, first, last);
		}

		public clear(): void
		{
			this.end_ = new ForwardListIterator<T>(this.ptr_, null, null);
			this.before_begin_ = new ForwardListIterator<T>(this.ptr_, this.end_, null);
		}

		/* =========================================================
			ACCESSORS
		========================================================= */
		public size(): number
		{
			return this.size_;
		}
		public empty(): boolean
		{
			return this.size_ == 0;
		}

		public before_begin(): ForwardListIterator<T>
		{
			return this.before_begin_;
		}
		public begin(): ForwardListIterator<T>
		{
			return this.before_begin_.next();
		}
		public end(): ForwardListIterator<T>
		{
			return this.end_;;
		}

		/* =========================================================
			ELEMENTS I/O
				- INSERT
				- ERASE
				- ALGORITHMS
		============================================================
			INSERT
		--------------------------------------------------------- */
		public push_front(val: T): void
		{
			this.insert_after(this.before_begin_, val);
		}

		public insert_after(pos: ForwardListIterator<T>, val: T): ForwardListIterator<T>;
		public insert_after(pos: ForwardListIterator<T>, n: number, val: T): ForwardListIterator<T>;
		public insert_after<T, InputIterator extends IForwardIterator<T>>
			(pos: ForwardListIterator<T>, first: InputIterator, last: InputIterator): ForwardListIterator<T>;

		public insert_after(pos: ForwardListIterator<T>, ...args: any[]): ForwardListIterator<T>
		{
			let ret: ForwardListIterator<T>;

			// BRANCHES
			if (args.length == 2)
				ret = this._Insert_by_repeating_val(args[0], 1, args[1]);
			else if (args.length == 3 && typeof args[1] == "number")
				ret = this._Insert_by_repeating_val(args[0], args[1], args[2]);
			else
				ret = this._Insert_by_range(args[0], args[1], args[2]);
			
			// RETURNS
			return ret;
		}

		private _Insert_by_repeating_val(pos: ForwardListIterator<T>, n: number, val: T): ForwardListIterator<T>
		{
			let first: base._Repeater<T> = new base._Repeater<T>(0, val);
			let last: base._Repeater<T> = new base._Repeater<T>(n);

			return this._Insert_by_range(pos, first, last);
		}

		private _Insert_by_range<U extends T, InputIterator extends IForwardIterator<U>>
			(pos: ForwardListIterator<T>, first: InputIterator, last: InputIterator): ForwardListIterator<T>
		{
			let nodes: ForwardListIterator<T>[] = [];
			let count: number = 0;

			for (; !first.equals(last); first = first.next() as InputIterator)
			{
				let node = new ForwardListIterator<T>(this.ptr_, null, first.value);
				nodes.push(node);

				++count;
			}
			if (count == 0)
				return pos;

			for (let i: number = 0; i < count - 1; ++i)
				nodes[i]["next_"] = nodes[i + 1];
			nodes[nodes.length - 1]["next_"] = pos.next();
			pos["next_"] = nodes[0];

			this.size_ += count;
			return nodes[nodes.length - 1];
		}

		/* ---------------------------------------------------------
			ERASE
		--------------------------------------------------------- */
		public pop_front(): void
		{
			this.erase_after(this.before_begin());
		}

		public erase_after(it: ForwardListIterator<T>): ForwardListIterator<T>;

		public erase_after(first: ForwardListIterator<T>, last: ForwardListIterator<T>): ForwardListIterator<T>;

		public erase_after(first: ForwardListIterator<T>, last: ForwardListIterator<T> = first.advance(2)): ForwardListIterator<T>
		{
			// SHRINK SIZE
			this.size_ -= distance(first, last);

			// RE-CONNECT
			first["next_"] = last;
			return last;
		}

		/* ---------------------------------------------------------
			ALGORITHMS
		--------------------------------------------------------- */
		public remove(val: T): void
		{
			this.remove_if(function (elem: T): boolean
				{
					return equal_to(val, elem);
				});
		}

		public remove_if(pred: (val: T) => boolean): void
		{
			for (let it = this.before_begin(); !it.next().equals(this.end()); it = it.next())
				if (pred(it.next().value) == true)
					it["next_"] = it.next().next();
		}

		public sort(): void;
		public sort(comp: (x: T, y: T) => boolean): void;

		public sort(comp: (x: T, y: T) => boolean = less): void
		{
			let vec = new Vector<T>(this.begin(), this.end());
			sort(vec.begin(), vec.end(), comp);

			this.assign(vec.begin(), vec.end());
		}
		
		public reverse(): void
		{
			let vec = new Vector<T>(this.begin(), this.end());
			this.assign(vec.rbegin(), vec.rend());
		}

		public swap(obj: ForwardList<T>): void
		{
			// SIZE AND ITERATORS
			[this.size_, obj.size_] = [obj.size_, this.size_];
			[this.before_begin_, obj.before_begin_] = [obj.before_begin_, this.before_begin_];
			[this.end_, obj.end_] = [obj.before_begin_, this.before_begin_];

			// POINTER OF THE SOURCE
			[this.ptr_, obj.ptr_] = [obj.ptr_, this.ptr_];
			[this.ptr_.value, obj.ptr_.value] = [obj.ptr_.value, this.ptr_.value];
		}
	}
}
