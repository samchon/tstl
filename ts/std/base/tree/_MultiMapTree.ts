/// <reference path="../../API.ts" />

/// <reference path="_MapTree.ts" />

namespace std.base
{
	export class _MultiMapTree<Key, T>
		extends _MapTree<Key, T>
	{
		/* ---------------------------------------------------------
			CONSTRUCTOR
		--------------------------------------------------------- */
		public constructor(map: TreeMultiMap<Key, T>, compare: (x: Key, y: Key) => boolean)
		{
			super
			(
				map,
				compare,
				function (x: MapIterator<Key, T>, y: MapIterator<Key, T>): boolean
				{
					if (equal_to(x.first, y.first))
						return (x as any).__get_m_iUID() < (y as any).__get_m_iUID();
					else
						return compare(x.first, y.first);
				}
			);
		}

		public insert(val: MapIterator<Key, T>): void
		{
			// ISSUE UID BEFORE INSERTION
			(val as any).__get_m_iUID();

			super.insert(val);
		}

		/* ---------------------------------------------------------
			FINDERS
		--------------------------------------------------------- */
		public find_by_key(key: Key): _XTreeNode<MapIterator<Key, T>>
		{
			let node: _XTreeNode<MapIterator<Key, T>> = this.root_;
			if (node == null)
				return null;

			// FOR THE DUPLICATE KEY
			let matched: _XTreeNode<MapIterator<Key, T>> = null;

			while (true)
			{
				let myNode: _XTreeNode<MapIterator<Key, T>> = null;

				if (equal_to(key, node.value.first))
				{
					matched = node;
					myNode = node.left;
				}
				else if (this.key_comp()(key, node.value.first))
					myNode = node.left; // LESS, THEN TO THE LEFT
				else
					myNode = node.right; // GREATER, THEN TO THE RIGHT

				// ULTIL CHILD NODE EXISTS
				if (myNode == null)
					break;
				
				// SHIFT A NEW NODE TO THE NODE TO BE RETURNED
				node = myNode;
			}

			// RETURN BRANCH
			if (matched != null)
				return matched;
			else
				return node;
		}

		public upper_bound(key: Key): MapIterator<Key, T>
		{
			//--------
			// FIND MATCHED NODE
			//--------
			let node: _XTreeNode<MapIterator<Key, T>> = this.root_;
			if (node == null)
				return this.map().end();

			// FOR THE DUPLICATE KEY
			let matched: _XTreeNode<MapIterator<Key, T>> = null;

			while (true)
			{
				let myNode: _XTreeNode<MapIterator<Key, T>> = null;

				if (equal_to(key, node.value.first))
				{
					matched = node;
					myNode = node.right;
				}
				else if (this.key_comp()(key, node.value.first))
					myNode = node.left; // LESS, THEN TO THE LEFT
				else
					myNode = node.right; // GREATER, THEN TO THE RIGHT

				// ULTIL CHILD NODE EXISTS
				if (myNode == null)
					break;
				
				// SHIFT A NEW NODE TO THE NODE TO BE RETURNED
				node = myNode;
			}

			//--------
			// RETURN BRACH
			//--------
			if (matched != null) // MATCHED KEY EXISTS
				return matched.value.next();

			let it: MapIterator<Key, T> = node.value;
			if (this.key_comp()(it.first, key) || equal_to(it.first, key)) // it.first <= key
				return it.next();
			else // it.first > key
				return it;
		}
	}
}