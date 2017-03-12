/// <reference path="../../API.ts" />

/// <reference path="_XTree.ts" />

namespace std.base
{
	/**
	 * @hidden
	 */
	export abstract class _MapTree<Key, T>
		extends _XTree<MapIterator<Key, T>>
	{
		private map_: ITreeMap<Key, T>;
		private key_compare_: (x: Key, y: Key) => boolean;
		private value_compare_: (x: Pair<Key, T>, y: Pair<Key, T>) => boolean;
		
		/* ---------------------------------------------------------
			CONSTRUCTOR
		--------------------------------------------------------- */
        public constructor
			(
				map: ITreeMap<Key, T>, 
				compare: (x: Key, y: Key) => boolean,
				itCompare: (x: MapIterator<Key, T>, y: MapIterator<Key, T>) => boolean
			)
		{
			super(itCompare);
			
			this.map_ = map;
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
		public abstract find_by_key(key: Key): _XTreeNode<MapIterator<Key, T>>;

		public lower_bound(key: Key): MapIterator<Key, T>
		{
			let node: _XTreeNode<MapIterator<Key, T>> = this.find_by_key(key);

			if (node == null)
				return this.map().end();
			else if (this.key_comp()(node.value.first, key)) // it < key
				return node.value.next();
			else
				return node.value;
		}

		public abstract upper_bound(key: Key): MapIterator<Key, T>;

		public equal_range(key: Key): Pair<MapIterator<Key, T>, MapIterator<Key, T>>
		{
			return make_pair(this.lower_bound(key), this.upper_bound(key));
		}

		/* ---------------------------------------------------------
			ACCECSSORS
		--------------------------------------------------------- */
		public map(): ITreeMap<Key, T>
		{
			return this.map_;
		}

		public key_comp(): (x: Key, y: Key) => boolean
		{
			return this.key_compare_;
        }

		public value_comp(): (x: Pair<Key, T>, y: Pair<Key, T>) => boolean
		{
			return this.value_compare_;
		}
	}
}