/// <reference path="XTree.ts" />

namespace std.base.tree
{
	export class PairTree<K, T>
		extends XTree<MapIterator<K, T>>
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

		public find(key: K): XTreeNode<MapIterator<K, T>>;
		public find(it: MapIterator<K, T>): XTreeNode<MapIterator<K, T>>;

		public find(val: any): XTreeNode<MapIterator<K, T>>
		{
			if (val instanceof MapIterator && (<MapIterator<K, T>>val).first instanceof SetIterator == false)
				return super.find(val);
			else
				return this.findByKey(val);
		}

		private findByKey(key: K): XTreeNode<MapIterator<K, T>>
		{
			let node = this.root;

			if (node != null)
				while (true)
				{
					let newNode: XTreeNode<MapIterator<K, T>> = null;

					if (std.equals(key, node.value.first))
						break;
					else if (std.less(key, node.value.first))
						newNode = node.left;
					else
						newNode = node.right;

					if (newNode == null)
						break;
					else
						node = newNode;
				}

			return node;
		}

		/* ---------------------------------------------------------
			COMPARISON
		--------------------------------------------------------- */
		public isEquals(left: MapIterator<K, T>, right: MapIterator<K, T>): boolean
		{
			return std.equals(left.first, right.first);
		}

		public isLess(left: MapIterator<K, T>, right: MapIterator<K, T>): boolean
		{
			return std.less(left.first, right.first);
		}
	}
}