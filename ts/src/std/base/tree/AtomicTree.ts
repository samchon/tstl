/// <reference path="XTree.ts" />

namespace std.base.tree
{
	/**
	 * @author Jeongho Nam <http://samchon.org>
	 */
	export class AtomicTree<T>
		extends XTree<SetIterator<T>>
	{
		private compare_: (left: T, right: T) => boolean;

		/* ---------------------------------------------------------
			CONSTRUCTOR
		--------------------------------------------------------- */
		/**
		 * Default Constructor.
		 */
		public constructor(compare: (left: T, right: T) => boolean = std.less)
		{
			super();

			this.compare_ = compare;
		}

		public find(val: T): XTreeNode<SetIterator<T>>;
		public find(it: SetIterator<T>): XTreeNode<SetIterator<T>>;

		public find(val: any): XTreeNode<SetIterator<T>>
		{
			if (val instanceof SetIterator && (<SetIterator<T>>val).value instanceof SetIterator == false)
				return super.find(val);
			else
				return this.find_by_val(val);
		}

		/**
		 * @hidden
		 */
		private find_by_val(val: T): XTreeNode<SetIterator<T>>
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
		/**
		 * @inheritdoc
		 */
		public is_equals(left: SetIterator<T>, right: SetIterator<T>): boolean
		{
			return std.equals(left, right);
		}

		/**
		 * @inheritdoc
		 */
		public is_less(left: SetIterator<T>, right: SetIterator<T>): boolean
		{
			return this.compare_(left.value, right.value);
		}
	}
}