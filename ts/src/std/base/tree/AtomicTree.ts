/// <reference path="RBTree.ts" />

namespace std.base.tree
{
	export class AtomicTree<T>
		extends RBTree<SetIterator<T>>
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

		/**
		 * @hidden
		 */
		private findByVal(val: T): XTreeNode<SetIterator<T>>
		{
			if (this.root_ == null)
				return null;

			let node: XTreeNode<SetIterator<T>> = this.root_;

			while (true)
			{
				let newNode: XTreeNode<SetIterator<T>> = null;

				if (std.equals(val, node.value.value))
					break; // EQUALS, MEANS MATCHED, THEN TERMINATE
				else if (std.less(val, node.value.value))
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
			CONSTRUCTOR
		--------------------------------------------------------- */
		public is_equals(left: SetIterator<T>, right: SetIterator<T>): boolean
		{
			return std.equals(left, right);
		}

		public is_less(left: SetIterator<T>, right: SetIterator<T>): boolean
		{
			return std.less(left.value, right.value);
		}
	}
}