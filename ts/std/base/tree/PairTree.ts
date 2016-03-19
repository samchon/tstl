/// <reference path="RBTree.ts" />

namespace std.base.tree
{
	export class PairTree<Key, T>
		extends RBTree<MapIterator<Key, T>>
	{
		/* ---------------------------------------------------------
			CONSTRUCTOR
		--------------------------------------------------------- */
		/**
		 * Default Constructor.
		 */
		public constructor()
		{
			super();
		}

		public find(key: Key): XTreeNode<MapIterator<Key, T>>;
		public find(it: MapIterator<Key, T>): XTreeNode<MapIterator<Key, T>>;

		public find(val: any): XTreeNode<MapIterator<Key, T>>
		{
			if (val instanceof MapIterator && (<MapIterator<Key, T>>val).first instanceof SetIterator == false)
				return super.find(val);
			else
				return this.findByKey(val);
		}

		private findByKey(key: Key): XTreeNode<MapIterator<Key, T>>
		{
			if (this.root == null)
				return null;

			let node: XTreeNode<MapIterator<Key, T>> = this.root;

			while (true)
			{
				let newNode: XTreeNode<MapIterator<Key, T>> = null;

				if (std.equals(key, node.value.first))
					break; // EQUALS, MEANS MATCHED, THEN TERMINATE
				else if (std.less(key, node.value.first))
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
			COMPARISON
		--------------------------------------------------------- */
		public isEquals(left: MapIterator<Key, T>, right: MapIterator<Key, T>): boolean
		{
			return std.equals(left.first, right.first);
		}

		public isLess(left: MapIterator<Key, T>, right: MapIterator<Key, T>): boolean
		{
			return std.less(left.first, right.first);
		}
	}
}