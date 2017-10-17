/// <reference path="../../API.ts" />

/// <reference path="_MapTree.ts" />

namespace std.base
{
	/**
	 * @hidden
	 */
	export class _UniqueMapTree<Key, T, Source extends IUniqueMap<Key, T>>
		extends _MapTree<Key, T, Source>
	{
		/* ---------------------------------------------------------
			CONSTRUCTOR
		--------------------------------------------------------- */
		public constructor(map: Source, compare: (x: Key, y: Key) => boolean)
		{
			super
			(
				map,
				compare,
				function (x: MapIterator<Key, T, Source>, y: MapIterator<Key, T, Source>): boolean
				{
					return compare(x.first, y.first);
				}
			);
		}

		/* ---------------------------------------------------------
			FINDERS
		--------------------------------------------------------- */
		public find_by_key(key: Key): _XTreeNode<MapIterator<Key, T, Source>>
		{
			let node: _XTreeNode<MapIterator<Key, T, Source>> = this.root_;
			if (node == null)
				return null;

			while (true)
			{
				let it: MapIterator<Key, T, Source> = node.value;
				let myNode: _XTreeNode<MapIterator<Key, T, Source>> = null;
				
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

		public upper_bound(key: Key): MapIterator<Key, T, Source>
		{
			//--------
			// FIND MATCHED NODE
			//--------
			let node: _XTreeNode<MapIterator<Key, T, Source>> = this.find_by_key(key);
			if (node == null)
				return this.source().end() as MapIterator<Key, T, Source>;

			//--------
			// RETURN BRANCH
			//--------
			let it: MapIterator<Key, T, Source> = node.value;
			if (equal_to(it.first, key) || this.key_comp()(it.first, key)) // it.first <= key
				return it.next();
			else // it.first > key
				return it;
        }
	}
}