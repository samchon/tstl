/// <reference path="XTree.ts" />

namespace std.base.tree
{
	export class AtomicTree<T>
		extends XTree<SetIterator<T>>
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

		public find(val: T): XTreeNode<SetIterator<T>>;
		public find(it: SetIterator<T>): XTreeNode<SetIterator<T>>;

		public find(val: any): XTreeNode<SetIterator<T>>
		{
			if (val instanceof SetIterator && (<SetIterator<T>>val).value instanceof SetIterator == false)
				return super.find(val);
			else
				return this.findByVal(val);
		}

		private findByVal(val: T): XTreeNode<SetIterator<T>>
		{
			let node = this.root;

			if (node != null)
				while (true)
				{
					let newNode: XTreeNode<SetIterator<T>> = null;

					if (std.equals(val, node.value.value))
						break;
					else if (std.less(val, node.value.value))
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
			CONSTRUCTOR
		--------------------------------------------------------- */
		public isEquals(left: SetIterator<T>, right: SetIterator<T>): boolean
		{
			return std.equals(left, right);
		}

		public isLess(left: SetIterator<T>, right: SetIterator<T>): boolean
		{
			return std.less(left, right);
		}
	}
}