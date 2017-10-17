/// <reference path="../../API.ts" />

/// <reference path="_XTree.ts" />

namespace std.base
{
	/**
	 * @hidden
	 */
	export abstract class _MapTree<Key, T, Source extends IMapContainer<Key, T>>
		extends _XTree<MapIterator<Key, T, Source>>
	{
		private source_: Source;
		private key_compare_: (x: Key, y: Key) => boolean;
		private value_compare_: (x: Pair<Key, T>, y: Pair<Key, T>) => boolean;
		
		/* ---------------------------------------------------------
			CONSTRUCTOR
		--------------------------------------------------------- */
        public constructor
			(
				source: Source, 
				compare: (x: Key, y: Key) => boolean,
				itCompare: (x: MapIterator<Key, T, Source>, y: MapIterator<Key, T, Source>) => boolean
			)
		{
			super(itCompare);
			
			this.source_ = source;
			this.key_compare_ = compare;

			this.value_compare_ =
				function (x: Pair<Key, T>, y: Pair<Key, T>): boolean
				{
					return compare(x.first, y.first);
				};
		}

		/* ---------------------------------------------------------
			FINDERS
		--------------------------------------------------------- */
		public abstract find_by_key(key: Key): _XTreeNode<MapIterator<Key, T, Source>>;

		public lower_bound(key: Key): MapIterator<Key, T, Source>
		{
			let node: _XTreeNode<MapIterator<Key, T, Source>> = this.find_by_key(key);

			if (node == null)
				return this.source().end() as MapIterator<Key, T, Source>;
			else if (this.key_comp()(node.value.first, key)) // it < key
				return node.value.next();
			else
				return node.value;
		}

		public abstract upper_bound(key: Key): MapIterator<Key, T, Source>;

		public equal_range(key: Key): Pair<MapIterator<Key, T, Source>, MapIterator<Key, T, Source>>
		{
			return make_pair(this.lower_bound(key), this.upper_bound(key));
		}

		/* ---------------------------------------------------------
			ACCECSSORS
		--------------------------------------------------------- */
		public source(): Source
		{
			return this.source_;
		}

		public key_comp(): (x: Key, y: Key) => boolean
		{
			return this.key_compare_;
        }

		public value_comp(): (x: IPair<Key, T>, y: IPair<Key, T>) => boolean
		{
			return this.value_compare_;
		}
	}
}