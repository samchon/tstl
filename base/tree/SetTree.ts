/// <referecen path="Tree.ts" />

namespace std.base.tree
{
	export class SetTree<T>
		extends Tree<SetIterator<T>>
	{
		/* ---------------------------------------------------------
		    CONSTRUCTOR
	    --------------------------------------------------------- */
		public constructor()
		{
			super();
		}

		public find(val: T): TreeNode<SetIterator<T>>;
		public find(it: SetIterator<T>): TreeNode<SetIterator<T>>;

		public find(val: any): TreeNode<SetIterator<T>>
		{
			if (val instanceof SetIterator && (<SetIterator<T>>val).value instanceof SetIterator == false)
				return super.find(val);
			else
				return this.findByVal(val);
		}

		private findByVal(val: T): TreeNode<SetIterator<T>>
		{
			let node = this.root;

			if (node != null)
				while (true)
				{
					let newNode: TreeNode<SetIterator<T>> = null;

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