/// <reference path="../../API.ts" />

/// <reference path="_XTree.ts" />

namespace std.base
{
	/**
	 * @hidden
	 */
	export abstract class _SetTree<T>
		extends _XTree<SetIterator<T>>
	{
		private set_: ITreeSet<T>;
		private key_comp_: (x: T, y: T) => boolean;

		/* ---------------------------------------------------------
			CONSTRUCTOR
		--------------------------------------------------------- */
		/**
		 * Default Constructor.
		 */
        public constructor
			(
				set: ITreeSet<T>, 
				compare: (x: T, y: T) => boolean,
				itCompare: (x: SetIterator<T>, y: SetIterator<T>) => boolean
			)
		{
			super(itCompare);

			this.set_ = set;
			this.key_comp_ = compare;
		}

		/* ---------------------------------------------------------
			FINDERS
		--------------------------------------------------------- */
		public abstract find_by_val(val: T): _XTreeNode<SetIterator<T>>

		public lower_bound(val: T): SetIterator<T>
		{
			let node: _XTreeNode<SetIterator<T>> = this.find_by_val(val);

			if (node == null)
				return this.set_.end();
			else if (this.key_comp()(node.value.value, val)) // it < key
				return node.value.next();
			else
				return node.value;
        }

		public abstract upper_bound(val: T): SetIterator<T>;

		public equal_range(val: T): Pair<SetIterator<T>, SetIterator<T>>
		{
			return make_pair(this.lower_bound(val), this.upper_bound(val));
		}

		/* ---------------------------------------------------------
			ACCESSORS
		--------------------------------------------------------- */
		public set(): ITreeSet<T>
		{
			return this.set_;
		}

		public key_comp(): (x: T, y: T) => boolean
		{
			return this.key_comp_;
        }

		public value_comp(): (x: T, y: T) => boolean
		{
			return this.key_comp_;
        }
	}
}