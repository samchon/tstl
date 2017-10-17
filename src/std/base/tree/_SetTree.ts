/// <reference path="../../API.ts" />

/// <reference path="_XTree.ts" />

namespace std.base
{
	/**
	 * @hidden
	 */
	export abstract class _SetTree<T, Source extends ISetContainer<T>>
		extends _XTree<SetIterator<T, Source>>
	{
		private source_: Source;
		private key_comp_: (x: T, y: T) => boolean;

		/* ---------------------------------------------------------
			CONSTRUCTOR
		--------------------------------------------------------- */
		/**
		 * Default Constructor.
		 */
        public constructor
			(
				set: Source, 
				compare: (x: T, y: T) => boolean,
				itCompare: (x: SetIterator<T, Source>, y: SetIterator<T, Source>) => boolean
			)
		{
			super(itCompare);

			this.source_ = set;
			this.key_comp_ = compare;
		}

		/* ---------------------------------------------------------
			FINDERS
		--------------------------------------------------------- */
		public abstract find_by_val(val: T): _XTreeNode<SetIterator<T, Source>>

		public lower_bound(val: T): SetIterator<T, Source>
		{
			let node: _XTreeNode<SetIterator<T, Source>> = this.find_by_val(val);

			if (node == null)
				return this.source_.end() as SetIterator<T, Source>;
			else if (this.key_comp()(node.value.value, val)) // it < key
				return node.value.next();
			else
				return node.value;
        }

		public abstract upper_bound(val: T): SetIterator<T, Source>;

		public equal_range(val: T): Pair<SetIterator<T, Source>, SetIterator<T, Source>>
		{
			return make_pair(this.lower_bound(val), this.upper_bound(val));
		}

		/* ---------------------------------------------------------
			ACCESSORS
		--------------------------------------------------------- */
		public source(): Source
		{
			return this.source_;
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