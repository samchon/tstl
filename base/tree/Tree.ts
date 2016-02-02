namespace std.base.tree
{
	export class Color
	{
		public static get BLACK(): boolean { return false; }
		public static get RED(): boolean { return true; }
	}

	export abstract class Tree<T>
	{
		protected root: TreeNode<T>;

		protected size_: number;

		/* =========================================================
		    CONSTRUCTOR
	    ========================================================= */
		/**
		 * Default Constructor
		 */
		public constructor()
		{
			this.root = null;

			this.size_ = 0;
		}

		/* =========================================================
		    ACCESSORS
				- GETTERS
				- COMPARISON
	    ============================================================
			GETTERS
		--------------------------------------------------------- */
		public size(): number
		{
			return  this.size_;
		}

		public find(val: T): TreeNode<T>
		{
			let node = this.root;

			if (node != null)
				while(true)
				{
					let newNode: TreeNode<T> = null;

					if (this.isEquals(val, node.value))
						break;
					else if (this.isLess(val, node.value))
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

		private fetchMaximum(node: TreeNode<T>): TreeNode<T>
		{
			while (node.right != null)
				node = node.right;

			return node;
		}

		public debug(): void
		{
			if (this.root != null)
				this.root.debug();
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
			let node = new TreeNode<T>(val, Color.RED);

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

			this.size_++;
		}

		private insertCase1(node: TreeNode<T>): void
		{
			if (node.parent == null)
				node.color = Color.BLACK;
			else
				this.insertCase2(node);
		}

		private insertCase2(node: TreeNode<T>): void
		{
			if (this.fetchColor(node.parent) == Color.BLACK)
				return;
			else
				this.insertCase3(node);
		}

		private insertCase3(node: TreeNode<T>): void
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

		private insertCase4(node: TreeNode<T>): void
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

		private insertCase5(node: TreeNode<T>): void
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
				let pred: TreeNode<T> = this.fetchMaximum(node.left);

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

			this.size_--;
		}

		private eraseCase1(node: TreeNode<T>): void
		{
			if (node.parent == null)
				return;
			else
				this.eraseCase2(node);
		}

		private eraseCase2(node: TreeNode<T>): void
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

		private eraseCase3(node: TreeNode<T>): void
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

		private eraseCase4(node: TreeNode<T>): void
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

		private eraseCase5(node: TreeNode<T>): void
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

		private eraseCase6(node: TreeNode<T>): void
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
		private rotateLeft(node: TreeNode<T>): void
		{
			let right = node.right;
			this.replaceNode(node, right);

			node.right = right.left;
			if (right.left != null)
				right.left.parent = node;

			right.left = node;
			node.parent = right;
		}

		private rotateRight(node: TreeNode<T>): void
		{
			let left = node.left;
			this.replaceNode(node, left);

			node.left = left.right;
			if (left.right != null)
				left.right.parent = node;

			left.right = node;
			node.parent = left;
		}

		private replaceNode(oldNode: TreeNode<T>, newNode: TreeNode<T>): void
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

		private fetchColor(node: TreeNode<T>): boolean
		{
			if (node == null)
				return Color.BLACK;
			else
				return node.color;
		}
	}
}

