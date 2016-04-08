namespace std.base.tree
{
	/**
	 * Abstract Tree.
	 * 
	 * @param <T> Type of elements.
	 * 
	 * @author Jeongho Nam <http://samchon.org>
	 */
	export abstract class XTree<T>
	{
		/**
		 * Root node.
		 */
		protected root_: XTreeNode<T>;

		/* =========================================================
			CONSTRUCTOR
		========================================================= */
		/**
		 * Default Constructor.
		 */
		public constructor()
		{
			this.root_ = null;
		}

		/* =========================================================
			ACCESSORS
				- GETTERS
				- COMPARISON
		============================================================
			GETTERS
		--------------------------------------------------------- */
		/**
		 * Find a node from its contained value.
		 * 
		 * @param val Value to find.
		 */
		public find(val: T): XTreeNode<T>
		{
			if (this.root_ == null)
				return null;

			let node: XTreeNode<T> = this.root_;

			while (true)
			{
				let newNode: XTreeNode<T> = null;

				if (this.is_equals(val, node.value))
					break; // EQUALS, MEANS MATCHED, THEN TERMINATE
				else if (this.is_less(val, node.value))
					newNode = node.left; // LESS, THEN TO THE LEFT
				else //
					newNode = node.right; // GREATER, THEN TO THE RIGHT

				// ULTIL CHILD NODE EXISTS
				if (newNode == null)
					break;

				// SHIFT A NEW NODE TO THE NODE TO BE RETURNED
				node = newNode;
			}
			return node;
		}

		/**
		 * Fetch maximum (the rightes?) node from one. 
		 *
		 * @param node A node to fetch its maximum node.
		 * @return The maximum node.
		 */
		protected fetch_maximum(node: XTreeNode<T>): XTreeNode<T>
		{
			while (node.right != null)
				node = node.right;

			return node;
		}
		
		/* ---------------------------------------------------------
			COMPARISON
		--------------------------------------------------------- */
		public abstract is_equals(left: T, right: T): boolean;

		public abstract is_less(left: T, right: T): boolean;

		/* =========================================================
			ELEMENTS I/O
				- INSERT & ERASE
				- ROTATION
		============================================================
			INSERT & ERASE
		--------------------------------------------------------- */
		/**
		 * Insert an element with a new node.
		 * 
		 * @param val An element to insert.
		 */
		public abstract insert(val: T): void;

		/**
		 * Erase an element with its node.
		 * 
		 * @param val An element to erase.
		 */
		public abstract erase(val: T): void;

		/* ---------------------------------------------------------
			ROTATION
		--------------------------------------------------------- */
		/**
		 * Rotate a node left.
		 * 
		 * @param node Node to rotate left.
		 */
		protected rotate_left(node: XTreeNode<T>): void
		{
			let right = node.right;
			this.replace_node(node, right);

			node.right = right.left;
			if (right.left != null)
				right.left.parent = node;

			right.left = node;
			node.parent = right;
		}

		/**
		 * Rotate a node to right.
		 * 
		 * @param node A node to rotate right.
		 */
		protected rotate_right(node: XTreeNode<T>): void
		{
			let left = node.left;
			this.replace_node(node, left);

			node.left = left.right;
			if (left.right != null)
				left.right.parent = node;

			left.right = node;
			node.parent = left;
		}

		/**
		 * Replace a node.
		 * 
		 * @param oldNode Ordinary node to be replaced.
		 * @param newNode Target node to replace.
		 */
		protected replace_node(oldNode: XTreeNode<T>, newNode: XTreeNode<T>): void
		{
			if (oldNode.parent == null)
				this.root_ = newNode;
			else
			{
				if (oldNode == oldNode.parent.left)
					oldNode.parent.left = newNode;
				else
					oldNode.parent.right = newNode;
			}

			if (newNode != null)
				newNode.parent = oldNode.parent;
		}
	}
}