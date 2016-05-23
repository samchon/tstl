/// <reference path="XTree.ts" />

namespace std.base
{
	/**
	 * <p> A red-black Tree storing {@link SetIterator SetIterators}. </p>
	 * 
	 * <p> <img src="../assets/images/design/set_containers.png" width="100%" /> </p>
	 * 
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

		/* ---------------------------------------------------------
			FINDERS
		--------------------------------------------------------- */
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

				if (std.equal_to(val, node.value.value))
					break; // EQUALS, MEANS MATCHED, THEN TERMINATE
				else if (this.compare_(val, node.value.value))
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
		public get_compare(): (left: T, right: T) => boolean
		{
			return this.compare_;
		}

		/**
		 * @inheritdoc
		 */
		public is_equal_to(left: SetIterator<T>, right: SetIterator<T>): boolean
		{
			return std.equal_to(left, right);
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