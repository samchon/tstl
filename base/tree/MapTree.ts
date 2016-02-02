/// <referecen path="Tree.ts" />

namespace std.base.tree
{
	export class MapTree<K, T>
		extends Tree<MapIterator<K, T>>
	{
		/* ---------------------------------------------------------
		    CONSTRUCTOR
	    --------------------------------------------------------- */
		public constructor()
		{
			super();
		}

		public find(key: K): TreeNode<MapIterator<K, T>>;
		public find(it: MapIterator<K, T>): TreeNode<MapIterator<K, T>>;

		public find(val: any): TreeNode<MapIterator<K, T>>
		{
			return null;
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