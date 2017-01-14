/// <reference path="../../API.ts" />

/// <reference path="_XTree.ts" />

namespace std.base
{
	/**
	 * @hidden
	 */
	export class _SetTree<T>
		extends _XTree<SetIterator<T>>
	{
		private set_: ITreeSet<T>;
		private compare_: (x: T, y: T) => boolean;

		/* ---------------------------------------------------------
			CONSTRUCTOR
		--------------------------------------------------------- */
		/**
		 * Default Constructor.
		 */
        public constructor(set: ITreeSet<T>, compare: (x: T, y: T) => boolean = less)
		{
			super();

			this.set_ = set;
			this.compare_ = compare;
		}

		/* ---------------------------------------------------------
			FINDERS
		--------------------------------------------------------- */
		public find(val: T): _XTreeNode<SetIterator<T>>;

		public find(it: SetIterator<T>): _XTreeNode<SetIterator<T>>;

		public find(val: any): _XTreeNode<SetIterator<T>>
		{
			if (val instanceof SetIterator && (<SetIterator<T>>val).value instanceof SetIterator == false)
				return super.find(val);
			else
				return this._Find_by_val(val);
        }

		private _Find_by_val(val: T): _XTreeNode<SetIterator<T>>
		{
			if (this.root_ == null)
				return null;

			let node: _XTreeNode<SetIterator<T>> = this.root_;

			while (true)
			{
				let newNode: _XTreeNode<SetIterator<T>> = null;

				if (equal_to(val, node.value.value))
					break; // EQUALS, MEANS MATCHED, THEN TERMINATE
				else if (this.compare_(val, node.value.value))
					newNode = node.left; // LESS, THEN TO THE LEFT
				else
					newNode = node.right; // GREATER, THEN TO THE RIGHT

				// ULTIL CHILD NODE EXISTS
				if (newNode == null)
					break;
				
				// SHIFT A NEW NODE TO THE NODE TO BE RETURNED
				node = newNode;
			}

			return node;
		}

		/* ---------------------------------------------------------
			BOUNDS
		--------------------------------------------------------- */
		public lower_bound(val: T): SetIterator<T>
		{
			let node: _XTreeNode<SetIterator<T>> = this.find(val);

			if (node == null)
				return this.set_.end();
			else if (equal_to(node.value.value, val))
				return node.value;
			else
			{
				let it: SetIterator<T> = node.value;
				while (!equal_to(it, this.set_.end()) && this.compare_(it.value, val))
					it = it.next();

				return it;
			}
        }

		public upper_bound(val: T): SetIterator<T>
		{
			let node: _XTreeNode<SetIterator<T>> = this.find(val);

			if (node == null)
				return this.set_.end();
			else
			{
				let it: SetIterator<T> = node.value;
				while (!equal_to(it, this.set_.end()) && (equal_to(it.value, val) || this.compare_(it.value, val)))
					it = it.next();

				return it;
			}
        }

		public equal_range(val: T): Pair<SetIterator<T>, SetIterator<T>>
		{
			return make_pair(this.lower_bound(val), this.upper_bound(val));
		}

		/* ---------------------------------------------------------
			COMPARISON
		--------------------------------------------------------- */
		public key_comp(): (x: T, y: T) => boolean
		{
			return this.compare_;
        }

		public value_comp(): (x: T, y: T) => boolean
		{
			return this.compare_;
        }

		public is_equal_to(left: SetIterator<T>, right: SetIterator<T>): boolean
		{
			return equal_to(left, right);
        }

		public is_less(left: SetIterator<T>, right: SetIterator<T>): boolean
		{
			return this.compare_(left.value, right.value);
		}
	}
}