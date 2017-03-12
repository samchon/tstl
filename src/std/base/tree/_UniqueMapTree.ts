/// <reference path="../../API.ts" />

/// <reference path="_MapTree.ts" />

namespace std.base
{
	/**
	 * @hidden
	 */
	export class _UniqueMapTree<Key, T>
		extends _MapTree<Key, T>
	{
		/* ---------------------------------------------------------
			CONSTRUCTOR
		--------------------------------------------------------- */
		public constructor(map: TreeMap<Key, T>, compare: (x: Key, y: Key) => boolean)
		{
			super
			(
				map,
				compare,
				function (x: MapIterator<Key, T>, y: MapIterator<Key, T>): boolean
				{
					return compare(x.first, y.first);
				}
			);
		}

		/* ---------------------------------------------------------
			FINDERS
		--------------------------------------------------------- */
		public find_by_key(key: Key): _XTreeNode<MapIterator<Key, T>>
		{
			let node: _XTreeNode<MapIterator<Key, T>> = this.root_;
			if (node == null)
				return null;

			while (true)
			{
				let it: MapIterator<Key, T> = node.value;
				let myNode: _XTreeNode<MapIterator<Key, T>> = null;
				
				if (equal_to(key, it.first))
					break;
				else if (this.key_comp()(key, it.first))
					myNode = node.left;
				else
					myNode = node.right;

				// ULTIL CHILD NODE EXISTS
				if (myNode == null)
					break;
				
				// SHIFT A NEW NODE TO THE NODE TO BE RETURNED
				node = myNode;
			}
			return node;
		}

		public upper_bound(key: Key): MapIterator<Key, T>
		{
			//--------
			// FIND MATCHED NODE
			//--------
			let node: _XTreeNode<MapIterator<Key, T>> = this.find_by_key(key);
			if (node == null)
				return this.map().end();

			//--------
			// RETURN BRANCH
			//--------
			let it: MapIterator<Key, T> = node.value;
			if (equal_to(it.first, key) || this.key_comp()(it.first, key)) // it.first <= key
				return it.next();
			else // it.first > key
				return it;
        }
	}
}