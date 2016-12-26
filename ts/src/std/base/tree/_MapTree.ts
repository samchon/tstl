/// <reference path="../../API.ts" />

/// <reference path="_XTree.ts" />

namespace std.base
{
	/**
	 * @hidden
	 */
	export class _MapTree<Key, T>
		extends _XTree<MapIterator<Key, T>>
	{
		private map_: ITreeMap<Key, T>;
		private compare_: (x: Key, y: Key) => boolean;

		/* ---------------------------------------------------------
			CONSTRUCTOR
		--------------------------------------------------------- */
        public constructor(map: ITreeMap<Key, T>, compare: (x: Key, y: Key) => boolean = std.less)
		{
			super();
			
			this.map_ = map;
			this.compare_ = compare;
		}

		/* ---------------------------------------------------------
			FINDERS
		--------------------------------------------------------- */
		public find(key: Key): _XTreeNode<MapIterator<Key, T>>;

		public find(it: MapIterator<Key, T>): _XTreeNode<MapIterator<Key, T>>;

		public find(val: any): _XTreeNode<MapIterator<Key, T>>
		{
			if (val instanceof MapIterator && (<MapIterator<Key, T>>val).first instanceof SetIterator == false)
				return super.find(val);
			else
				return this._Find_by_key(val);
		}
        
		private _Find_by_key(key: Key): _XTreeNode<MapIterator<Key, T>>
		{
			if (this.root_ == null)
				return null;

			let node: _XTreeNode<MapIterator<Key, T>> = this.root_;

			while (true)
			{
				let newNode: _XTreeNode<MapIterator<Key, T>> = null;

				if (std.equal_to(key, node.value.first))
					break; // EQUALS, MEANS MATCHED, THEN TERMINATE
				else if (this.compare_(key, node.value.first))
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
		public lower_bound(key: Key): MapIterator<Key, T>
		{
			let node: base._XTreeNode<MapIterator<Key, T>> = this.find(key);

			if (node == null)
				return this.map_.end();
			else if (this.compare_(node.value.first, key))
				return node.value.next();
			else
			{
				let it = node.value;
				while (!std.equal_to(it, this.map_.end()) && this.compare_(it.first, key))
					it = it.next();

				return it;
			}
        }

		public upper_bound(key: Key): MapIterator<Key, T>
		{
			let node: base._XTreeNode<MapIterator<Key, T>> = this.find(key);
			
			if (node == null)
				return this.map_.end();
			else
			{
				let it = node.value;
				while (!std.equal_to(it, this.map_.end()) && (std.equal_to(it.first, key) || this.compare_(it.first, key)))
					it = it.next();

				return it;
			}
        }

		public equal_range(key: Key): Pair<MapIterator<Key, T>, MapIterator<Key, T>>
		{
			return std.make_pair(this.lower_bound(key), this.upper_bound(key));
		}

		/* ---------------------------------------------------------
			COMPARISON
		--------------------------------------------------------- */
		public key_comp(): (x: Key, y: Key) => boolean
		{
			return this.compare_;
        }

		public value_comp(): (x: Pair<Key, T>, y: Pair<Key, T>) => boolean
		{
			let compare = this.compare_;

			let fn = function (x: Pair<Key, T>, y: Pair<Key, T>): boolean
			{
				return compare(x.first, y.first);
			}
			return fn;
		}
        
		public is_equal_to(left: MapIterator<Key, T>, right: MapIterator<Key, T>): boolean
		{
			return std.equal_to(left.first, right.first);
        }

		public is_less(left: MapIterator<Key, T>, right: MapIterator<Key, T>): boolean
		{
			return this.compare_(left.first, right.first);
		}
	}
}