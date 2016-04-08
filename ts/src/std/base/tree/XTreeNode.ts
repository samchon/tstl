namespace std.base.tree
{
	/**
	 * <p> A node in an XTree. </p>
	 *
	 * @param <T> Type of elements.
	 * 
	 * @inventor Rudolf Bayer
	 * @see XTree
	 *
	 * @author Migrated by Jeongho Nam <http://samchon.org>
	 */
	export class XTreeNode<T>
	{
		/**
		 * Parent of the node.
		 */
		public parent: XTreeNode<T>;
		
		/**
		 * Left child in the node.
		 */
		public left: XTreeNode<T>;
		
		/**
		 * Right child in the node.
		 */
		public right: XTreeNode<T>;

		/**
		 * Value stored in the node.
		 */
		public value: T;

		/**
		 * Color of the node.
		 */
		public color: Color;

		/* ---------------------------------------------------------
			CONSTRUCTORS
		--------------------------------------------------------- */
		/**
		 * Construct from value and color of node. 
		 *
		 * @param value Value to be stored in.
		 * @param color Color of the node, red or black.
		 */
		public constructor(value: T, color: Color)
		{
			this.value = value;
			this.color = color;
			
			this.parent = null;
			this.left = null;
			this.right = null;
		}

		/**
		 * Get grand-parent.
		 */
		public get grand_parent(): XTreeNode<T>
		{
			return this.parent.parent;
		}

		/**
		 * Get sibling, opposite side node in same parent.
		 */
		public get sibling(): XTreeNode<T>
		{
			if (this == this.parent.left)
				return this.parent.right;
			else
				return this.parent.left;
		}

		/**
		 * Get uncle, parent's sibling.
		 */
		public get uncle(): XTreeNode<T>
		{
			return this.parent.sibling;
		}
	}
}