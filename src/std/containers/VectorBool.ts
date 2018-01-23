/// <reference path="../API.ts" />

/// <reference path="../base/containers/ArrayContainer.ts" />
/// <reference path="../base/iterators/ArrayIterator.ts" />

namespace std.experiments
{
	export class VectorBool extends base.ArrayContainer<boolean, VectorBool>
	{
		//----
		// first => (index: number)
		// second => (value: boolean)
		//---
		/**
		 * @hidden
		 */
		private data_: TreeMap<number, boolean>;

		/**
		 * @hidden
		 */
		private size_: number;

		/* =========================================================
			CONSTRUCTORS & SEMI-CONSTRUCTORS
				- CONSTRUCTORS
				- ASSIGN & CLEAR
		============================================================
			CONSTURCTORS
		--------------------------------------------------------- */
		public constructor();
		public constructor(obj: VectorBool);
		public constructor(array: boolean[]);
		public constructor(n: number, val: boolean);
		public constructor(first: IForwardIterator<boolean>, last: IForwardIterator<boolean>);

		public constructor(...args: any[])
		{
			super();

			if (args.length == 1 && args[0] instanceof VectorBool)
			{
				// COPY CONSTRUCTOR
				let first: IForwardIterator<boolean> = args[0].begin();
				let last: IForwardIterator<boolean> = args[0].end();

				this.assign(first, last);
			}
			else if (args.length == 1 && args[0] instanceof Array)
			{
				// INITIALIZER
				this.clear();
				this.push(...args[0]);
			}
			else if (args.length == 2)
			{
				// ASSIGNER
				this.assign(args[0], args[1]);
			}
			else // DEFAULT CONSTRUCTOR
				this.clear();
		}

		/* ---------------------------------------------------------
			ASSIGN & CLEAR
		--------------------------------------------------------- */
		public assign(n: number, val: boolean): void;
		public assign<InputIterator extends IForwardIterator<boolean>>
			(first: InputIterator, last: InputIterator): void;
		
		public assign(first: any, last: any): void
		{
			this.clear();
			this.insert(this.end(), first, last);
		}

		public clear(): void
		{
			this.data_ = new TreeMap();
			this.size_ = 0;
		}

		public swap(obj: VectorBool): void
		{
			[this.data_, obj.data_] = [obj.data_, this.data_];
			[this.size_, obj.size_] = [obj.size_, this.size_];
		}

		/* =========================================================
			ACCESSORS
		========================================================= */
		public size(): number
		{
			return this.size_;
		}

		public at(index: number): boolean
		{
			// IS OUT OF RANGE?
			if (index < 0 || index > this.size())
				throw new OutOfRange("Target index is greater than Vector's size.");

			// FIND THE NEAREST NODE OF LEFT
			let it = this._Find_node(index);
			return it.second; // RETURNS
		}

		public set(index: number, val: boolean): void
		{
			//----
			// PRELIMINARIES
			//----
			// IS OUT OF RANGE?
			if (index < 0 || index > this.size())
				throw new OutOfRange("Target index is greater than Vector's size.");

			// FIND THE NEAREAST NODE OF LEFT
			let it = this._Find_node(index);
			if (it.second == val)
				return; // NO NEED TO CHANGE

			//----
			// CHANGE VALUE
			//----
			if (it.first == index)
			{
				// CHANGE VALUE DIRECTLY
				it.second = val;
			}
			else
			{
				// EMPLACE NEW NODE
				it = this.data_.emplace(index, val).first;
			}

			//----
			// POST-PROCESS
			//----
			// THE LAST ELEMENT, NO POST-PROCESS REQUIRED
			if (index == this.size() - 1)
				return;

			// LIST UP NEIGHBORS
			let prev = it.prev();
			let next = it.next();

			// ARRANGE LEFT SIDE
			if (std.not_equal_to(prev, this.data_.end()) && prev.second == it.second)
			{
				console.log("it => " + it.first + ", " + it.second);
				this.data_.erase(it);
			}

			// ARRANGE RIGHT SIDE
			if (next.equals(this.data_.end()) == true 
				|| (next.first != index + 1 || next.second != val))
			{
				// 1) IT'S THE LAST NODE
				// 2) NEXT NODE DOES NOT POINT THE INDEX + 1 (NEAREST NEIGHBOR)
				// 3) NEXT NODE'S VALUE IS DIFFERENT WITH THE CHANGED VALUE
				//----
				// EMPLACE NEW NODE WITH OLD
				this.data_.emplace(index + 1, !val);
			}
			else 
			{
				// NEXT NODE'S VALUE IS SAME WITH THE CHANGED VALUE
				//----
				// ERASE THE NEXT NODE
				this.data_.erase(next);
			}
		}

		/**
		 * @hidden
		 */
		private _Find_node(index: number): TreeMap.Iterator<number, boolean>
		{
			return this.data_.upper_bound(index).prev();
		}

		/* =========================================================
			ELEMENTS I/O
				- PUSH & POP
				- INSERT
				- ERASE
		============================================================
			PUSH & POP
		--------------------------------------------------------- */
		public push(...items: boolean[]): number
		{
			if (items.length == 0)
				return this.size();

			let first = new base._NativeArrayIterator<boolean>(items, 0);
			let last = new base._NativeArrayIterator<boolean>(items, items.length);

			this._Insert_by_range(this.end(), first, last);
			return this.size();
		}

		public push_back(val: boolean): void
		{
			let it = this.data_.rbegin();
			let index: number = this.size_++;

			// EMPLACE OR NOT
			if (it.second != val)
				this.data_.emplace(index, val);
		}

		public pop_back(): void
		{
			let it = this.data_.rbegin();
			let index: number = --this.size_;

			// ERASE OR NOT
			if (it.first == index)
				this.data_.erase(it.base());
		}

		/* ---------------------------------------------------------
			INSERT
		--------------------------------------------------------- */
		/**
		 * @hidden
		 */
		protected _Insert_by_range<InputIterator extends IForwardIterator<boolean>>
			(pos: VectorBool.Iterator, first: InputIterator, last: InputIterator): VectorBool.Iterator
		{
			// RESERVE ELEMENTS -> REPEATED SIZE & VALUE
			let elements: Vector<Pair<number, boolean>> = new Vector();
			for (let it = first; !it.equals(last); it = it.next() as InputIterator)
			{
				if (elements.empty() || elements.back().second != it.value)
					elements.push_back(std.make_pair(1, it.value));
				else
					++elements.back().first;
			}

			if (pos.equals(this.end()) == true)
				return this._Insert_to_end(elements);
			else
				return this._Insert_to_middle(pos, elements);
		}

		/**
		 * @hidden
		 */
		private _Insert_to_middle(pos: VectorBool.Iterator, elements: Vector<Pair<number, boolean>>): VectorBool.Iterator
		{
			let first = this._Find_node(pos.index());
			for (let it = first; !it.equals(this.data_.end()); it = it.next())
			{
				// COMPUTE SIZE
				let next = it.next();
				let size: number = (next.equals(this.data_.end()) == true)
					? this.size() - it.first // THE LAST NODE
					: next.first - it.first; // MIDDLE NODE
				if (it == first)
					size -= pos.index() - first.first; // DECREASE OVER COUNT
				
				// ENROLL OR INCREASE
				if (elements.empty() || elements.back().second != it.second)
					elements.push_back(std.make_pair(size, it.second));
				else
					elements.back().first += size;
			}

			this.data_.erase(first, this.data_.end());
			return this._Insert_to_end(elements);
		}
		
		/**
		 * @hidden
		 */
		private _Insert_to_end(elements: Vector<Pair<number, boolean>>): VectorBool.Iterator
		{
			let old_size: number = this.size();
			let last_value: boolean = this.empty() ? null : this.data_.rbegin().second;

			for (let i: number = 0; i < elements.size(); ++i)
			{
				// INDEXING
				let p: Pair<number, boolean> = elements.at(i);
				let index: number = this.size();
				this.size_ += p.first;

				// NEED NOT TO EMPLACE, JUST SKIP
				if (i == 0 && p.second == last_value)
					continue;

				// DO EMPLACE
				this.data_.emplace(index, p.second);
			}
			return this.begin().advance(old_size);
		}

		/* ---------------------------------------------------------
			ERASE
		--------------------------------------------------------- */
		/**
		 * @hidden
		 */
		protected _Erase_by_range(first: VectorBool.Iterator, last: VectorBool.Iterator): VectorBool.Iterator
		{
			let distance: number = last.index() - first.index();

			//----
			// SHRINK INDEXES
			//----
			// PRELIMINARIES
			let entries: Entry<number, boolean>[] = [];
			let cut_first = this.data_.lower_bound(first.index());
			let cut_last = this.data_.lower_bound(last.index());

			// RESERVE ENTRIES
			for (let it = cut_last; !it.equals(this.data_.end()); it = it.next())
				entries.push(it.value);

			// ERASE NODES AND SHRINK SIZE
			this.data_.erase(cut_first, this.data_.end());
			this.size_ -= distance;

			// INSERT THEM AGAIN
			for (let entry of entries)
				this.data_.emplace(entry.first - distance, entry.second);

			//----
			// ARRANGEMENT
			//----
			// TWO POINTS - PREV POINT OF CUT_FIRST & NEXT POINT OF THE P1
			// ~ P1 ----CUT------ P2 ~
			let p1 = cut_first.prev();
			let p2 = p1.next();

			// ERASE WHEN P1 == P2
			if (p1.second == p2.second)
				this.data_.erase(p2);

			// RETURNS
			return (first.index() < this.size()) ? first : this.end();
		}
	}
}

/**
 * @hidden
 */
namespace std.experiments.VectorBool
{
	//----
	// PASCAL NOTATION
	//----
	// HEAD
	export type Iterator = base.ArrayIterator<boolean, VectorBool>;
	export type ReverseIterator = base.ArrayReverseIterator<boolean, VectorBool>;

	// BODY
	export var Iterator = base.ArrayIterator;
	export var ReverseIterator = base.ArrayReverseIterator;

	//----
	// SNAKE NOTATION
	//----
	// HEAD
	export type iterator = Iterator;
	export type reverse_iterator = ReverseIterator;

	// BODY
	export var iterator = Iterator;
	export var reverse_iterator = ReverseIterator;
}