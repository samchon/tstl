namespace std.base.tree
{
	/**
	 * <p> Red-black Tree. </p>
	 *
	 *
	 * <h3> Definition in Wekipedia </h3>
	 *
	 * <p> A red–black tree is a kind of self-balancing binary search tree. Each node of the binary tree has an 
	 * extra bit, and that bit is often interpreted as the color (red or black) of the node. These color bits are 
	 * used to ensure the tree remains approximately balanced during insertions and deletions. </p>
	 *
	 * <p> Balance is preserved by painting each node of the tree with one of two colors (typically called 'red' 
	 * and 'black') in a way that satisfies certain properties, which collectively constrain how unbalanced the 
	 * tree can become in the worst case. When the tree is modified, the new tree is subsequently rearranged and 
	 * repainted to restore the coloring properties. The properties are designed in such a way that this 
	 * rearranging and recoloring can be performed efficiently. </p>
	 *
	 * <p> The balancing of the tree is not perfect but it is good enough to allow it to guarantee searching in 
	 * O(log n) time, where n is the total number of elements in the tree. The insertion and deletion operations, 
	 * along with the tree rearrangement and recoloring, are also performed in O(log n) time. </p>
	 *
	 * <p> Tracking the color of each node requires only 1 bit of information per node because there are only two 
	 * colors. The tree does not contain any other data specific to its being a red–black tree so its memory 
	 * footprint is almost identical to a classic (uncolored) binary search tree. In many cases the additional bit 
	 * of information can be stored at no additional memory cost. </p>
	 *
	 * <h4> Properties </h4>
	 * <p> In addition to the requirements imposed on a binary search tree the following must be satisfied by a 
	 * red–black tree: </p>
	 *
	 * <ol>
	 *	<li> A node is either red or black. </li>
	 *	<li> The root is black. This rule is sometimes omitted. Since the root can always be changed from red to 
	 *		 black, but not necessarily vice versa, this rule has little effect on analysis. </li>
	 *	<li> All leaves (NIL; <code>null</code>) are black. </li>
	 *  <li> If a node is red, then both its children are black. </li>
	 *  <li> Every path from a given node to any of its descendant NIL nodes contains the same number of black 
	 *		 nodes. Some definitions: the number of black nodes from the root to a node is the node's black depth; 
	 *		 the uniform number of black nodes in all paths from root to the leaves is called the black-height of 
	 *		 the red–black tree. </li>
	 * </ol>
	 * 
	 * <p> These constraints enforce a critical property of red–black trees: the path from the root to the 
	 * farthest leaf is no more than twice as long as the path from the root to the nearest leaf. The result is 
	 * that the tree is roughly height-balanced. Since operations such as inserting, deleting, and finding values 
	 * require worst-case time proportional to the height of the tree, this theoretical upper bound on the height 
	 * allows red–black trees to be efficient in the worst case, unlike ordinary binary search trees. </p>
	 * 
	 * <p> To see why this is guaranteed, it suffices to consider the effect of properties 4 and 5 together. For a 
	 * red–black tree T, let B be the number of black nodes in property 5. Let the shortest possible path from the 
	 * root of T to any leaf consist of B black nodes. Longer possible paths may be constructed by inserting red 
	 * nodes. However, property 4 makes it impossible to insert more than one consecutive red node. Therefore, 
	 * ignoring any black NIL leaves, the longest possible path consists of 2*B nodes, alternating black and red 
	 * (this is the worst case). Counting the black NIL leaves, the longest possible path consists of 2*B-1 nodes. </p>
	 * 
	 * <p> The shortest possible path has all black nodes, and the longest possible path alternates between red 
	 * and black nodes. Since all maximal paths have the same number of black nodes, by property 5, this shows 
	 * that no path is more than twice as long as any other path. </p>
	 *
	 * <ul>
	 *	<li> Reference: https://en.wikipedia.org/w/index.php?title=Red%E2%80%93black_tree&redirect=no </li>
	 * </ul>
	 *
	 * @inventor Rudolf Bayer
	 * @author Migrated by Jeongho Nam
	 */
	export abstract class XTree<T>
	{
		protected root: XTreeNode<T>;

		/* =========================================================
			CONSTRUCTOR
		========================================================= */
		/**
		 * Default Constructor.
		 */
		public constructor()
		{
			this.root = null;

			//this.size_ = 0;
		}

		/* =========================================================
			ACCESSORS
				- GETTERS
				- COMPARISON
		============================================================
			GETTERS
		--------------------------------------------------------- */
		//public size(): number
		//{
		//	return  this.size_;
		//}

		public find(val: T): XTreeNode<T>
		{
			if (this.root == null)
				return null;

			let node: XTreeNode<T> = this.root;

			while(true)
			{
				let newNode: XTreeNode<T> = null;

				if (this.isEquals(val, node.value))
					break; // EQUALS, MEANS MATCHED, THEN TERMINATE
				else if (this.isLess(val, node.value)) 
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

		private fetchMaximum(node: XTreeNode<T>): XTreeNode<T>
		{
			while (node.right != null)
				node = node.right;

			return node;
		}

		/* ---------------------------------------------------------
			COMPARISON
		--------------------------------------------------------- */
		public abstract isEquals(left: T, right: T): boolean;

		public abstract isLess(left: T, right: T): boolean;

		/* =========================================================
			ELEMENTS I/O
				- INSERT
				- ERASE
				- ROTATION
		============================================================
			INSERT
		--------------------------------------------------------- */
		public insert(val: T): void
		{
			let parent = this.find(val);
			let node = new XTreeNode<T>(val, Color.RED);

			if (parent == null)
				this.root = node;
			else
			{
				node.parent = parent;

				if (this.isLess(node.value, parent.value))
					parent.left = node;
				else
					parent.right = node;
			}

			this.insertCase1(node);
		}

		private insertCase1(node: XTreeNode<T>): void
		{
			if (node.parent == null)
				node.color = Color.BLACK;
			else
				this.insertCase2(node);
		}

		private insertCase2(node: XTreeNode<T>): void
		{
			if (this.fetchColor(node.parent) == Color.BLACK)
				return;
			else
				this.insertCase3(node);
		}

		private insertCase3(node: XTreeNode<T>): void
		{
			if (this.fetchColor(node.uncle) == Color.RED)
			{
				node.parent.color = Color.BLACK;
				node.uncle.color = Color.BLACK;
				node.grandParent.color = Color.RED;

				this.insertCase1(node.grandParent);
			}
			else
			{
				this.insertCase4(node);
			}
		}

		private insertCase4(node: XTreeNode<T>): void
		{
			if (node == node.parent.right && node.parent == node.grandParent.left)
			{
				this.rotateLeft(node.parent);
				node = node.left;
			}
			else if (node == node.parent.left && node.parent == node.grandParent.right)
			{
				this.rotateRight(node.parent);
				node = node.right;
			}

			this.insertCase5(node);
		}

		private insertCase5(node: XTreeNode<T>): void
		{
			node.parent.color = Color.BLACK;
			node.grandParent.color = Color.RED;

			if (node == node.parent.left && node.parent == node.grandParent.left)
				this.rotateRight(node.grandParent);
			else
				this.rotateLeft(node.grandParent);
		}

		/* ---------------------------------------------------------
			ERASE
		--------------------------------------------------------- */
		public erase(val: T): void
		{
			let node = this.find(val);
			if (node == null || this.isEquals(val, node.value) == false)
				return;

			if (node.left != null && node.right != null)
			{
				let pred: XTreeNode<T> = this.fetchMaximum(node.left);

				node.value = pred.value;
				node = pred;
			}

			let child = (node.right == null) ? node.left : node.right;
			
			if (this.fetchColor(node) == Color.BLACK)
			{
				node.color = this.fetchColor(child);
				this.eraseCase1(node);
			}

			this.replaceNode(node, child);

			//this.size_--;
		}

		private eraseCase1(node: XTreeNode<T>): void
		{
			if (node.parent == null)
				return;
			else
				this.eraseCase2(node);
		}

		private eraseCase2(node: XTreeNode<T>): void
		{
			if (this.fetchColor(node.sibling) == Color.RED)
			{
				node.parent.color = Color.RED;
				node.sibling.color = Color.BLACK;

				if (node == node.parent.left)
					this.rotateLeft(node.parent);
				else
					this.rotateRight(node.parent);
			}

			this.eraseCase3(node);
		}

		private eraseCase3(node: XTreeNode<T>): void
		{
			if (this.fetchColor(node.parent) == Color.BLACK &&
				this.fetchColor(node.sibling) == Color.BLACK &&
				this.fetchColor(node.sibling.left) == Color.BLACK &&
				this.fetchColor(node.sibling.right) == Color.BLACK)
			{
				node.sibling.color = Color.RED;

				this.eraseCase1(node.parent);
			}
			else
				this.eraseCase4(node);
		}

		private eraseCase4(node: XTreeNode<T>): void
		{
			if (this.fetchColor(node.parent) == Color.RED &&
				node.sibling != null &&
				this.fetchColor(node.sibling) == Color.BLACK &&
				this.fetchColor(node.sibling.left) == Color.BLACK &&
				this.fetchColor(node.sibling.right) == Color.BLACK)
			{
				node.sibling.color = Color.RED;
				node.parent.color = Color.BLACK;
			}
			else
				this.eraseCase5(node);
		}

		private eraseCase5(node: XTreeNode<T>): void
		{
			if (node == node.parent.left &&
				node.sibling != null &&
				this.fetchColor(node.sibling) == Color.BLACK &&
				this.fetchColor(node.sibling.left) == Color.RED &&
				this.fetchColor(node.sibling.right) == Color.BLACK)
			{
				node.sibling.color = Color.RED;
				node.sibling.left.color = Color.BLACK;

				this.rotateRight(node.sibling);
			}
			else if (node == node.parent.right &&
				node.sibling != null &&
				this.fetchColor(node.sibling) == Color.BLACK &&
				this.fetchColor(node.sibling.left) == Color.BLACK &&
				this.fetchColor(node.sibling.right) == Color.RED)
			{
				node.sibling.color = Color.RED;
				node.sibling.right.color = Color.BLACK;

				this.rotateLeft(node.sibling);
			}
		}

		private eraseCase6(node: XTreeNode<T>): void
		{
			node.sibling.color = this.fetchColor(node.parent);
			node.parent.color = Color.BLACK;

			if (node == node.parent.left)
			{
				node.sibling.right.color = Color.BLACK;

				this.rotateLeft(node.parent);
			}
			else
			{
				node.sibling.left.color = Color.BLACK;
				
				this.rotateRight(node.parent);
			}
		}

		/* ---------------------------------------------------------
			ROTATION
		--------------------------------------------------------- */
		private rotateLeft(node: XTreeNode<T>): void
		{
			let right = node.right;
			this.replaceNode(node, right);

			node.right = right.left;
			if (right.left != null)
				right.left.parent = node;

			right.left = node;
			node.parent = right;
		}

		private rotateRight(node: XTreeNode<T>): void
		{
			let left = node.left;
			this.replaceNode(node, left);

			node.left = left.right;
			if (left.right != null)
				left.right.parent = node;

			left.right = node;
			node.parent = left;
		}

		private replaceNode(oldNode: XTreeNode<T>, newNode: XTreeNode<T>): void
		{
			if (oldNode.parent == null)
				this.root = newNode;
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

		private fetchColor(node: XTreeNode<T>): boolean
		{
			if (node == null)
				return Color.BLACK;
			else
				return node.color;
		}
	}
}

