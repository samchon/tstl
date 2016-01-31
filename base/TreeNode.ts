namespace std.base
{
	/**
	 * Reference: http://jiniya.net/tt/444
	 */
	export class TreeNode<T>
	{
		public static get BLACK(): number { return 0; }
		public static get RED(): number { return 1; }

		private parent: TreeNode<T>;
		private left: TreeNode<T>;
		private right: TreeNode<T>;

		private value: T;

		private color: number;

		/* ---------------------------------------------------------
		    CONSTRUCTORS
	    --------------------------------------------------------- */
		public constructor(value: T, color: number = TreeNode.BLACK)
		{
			this.value = value;
			this.color = color;

			this.parent = null;
			this.left = null;
			this.right = null;
		}

		/* ---------------------------------------------------------
		    ELEMENT I/O
	    --------------------------------------------------------- */
		public insert(val: T): void
		{
			// CONSTRUCT THE NEW NODE
			var node: TreeNode<T> = new TreeNode<T>(val, TreeNode.RED);
			if (std.less(val, this.value) == true)
				this.setLeft(node);
			else
				this.setRight(node);

			// SOLVE THE DOUBLE_RED_PROBLEM
			node.solveDRP();
		}

		public erase(val: T): void
		{
		}

		/* ---------------------------------------------------------
		    BALANCERS
	    --------------------------------------------------------- */
		private solveDRP(): void
		{
			if (this.parent == null || this.parent.color != TreeNode.RED || this.parent.getSibling() == null)
				return;

			if (this.parent.getSibling().color == TreeNode.BLACK)
			{
				let middle = this.restructure();

				if (middle.color == TreeNode.RED)
				{
					middle.color = TreeNode.BLACK;

					middle.left.color = TreeNode.RED;
					middle.right.color = TreeNode.RED;
				}
			}
			else
			{
				if (this.parent.recolorDRP() && this.parent.parent.color == TreeNode.RED)
					this.parent.parent.solveDRP();
			}
		}

		private restructure(): TreeNode<T>
		{
			let p = this.parent;
			let pp = this.parent.parent;
			let ppp = this.parent.parent.parent;

			let mid: TreeNode<T>;

			if (pp.left == p)
			{
				if (p.left == this)
				{
					//     pp  ||
					//    /    ||
					//   p     ||
					//  /      ||
					// c       ||

					// ROTATE_RIGHT
					pp.setLeft(p.right);
					p.setRight(pp);

					mid = p;
				}
				else
				{
					//     pp ||        c
					//    /   ||    /       \
					//   p    ||  p          pp
					//    \   ||   \        /
					//     c  ||   left    right
					let left = this.left;
					let right = this.right;

					this.setLeft(p);
					this.setRight(pp);
					pp.setLeft(right);
					p.setRight(left);

					mid = this;
				}
			}
			else
			{
				if (p.left == this)
				{
					// pp     ||        c
					//  \     ||      /   \
					//   p    ||     pp    p
					//  /     ||    /  \
					// c      || right  left
					let left = this.left;
					let right = this.right;

					this.setLeft(pp);
					this.setRight(p);
					pp.setLeft(right);
					pp.setRight(left);
				}
				else
				{
					// pp
					//  \
					//   p
					//    \
					//     c
					pp.setRight(p.left);
					p.setLeft(pp);

					mid = p;
				}
			}

			if (ppp != null)
				if (ppp.right == pp)
					ppp.setRight(mid);
				else
					ppp.setLeft(mid);
			else
			{
				//root = mid
			}

			return mid;
		}

		private recolorDRP(): boolean
		{
			return false;
		}

		/* ---------------------------------------------------------
		    SETTERS
	    --------------------------------------------------------- */
		public setParent(parent: TreeNode<T>): void
		{
			this.parent = parent;
		}
		public setLeft(left: TreeNode<T>): void
		{
			this.left = left;

			if(left != null)
				left.parent = this;
		}
		public setRight(right: TreeNode<T>): void
		{
			this.right = right;

			if (right != null)
				right.parent = this;
		}

		public setValue(value: T): void
		{
			this.value = value;
		}

		public setColor(color: number): void
		{
			this.color = color;
		}
		
		/* ---------------------------------------------------------
		    GETTERS
	    --------------------------------------------------------- */
		public getParent(): TreeNode<T>
		{
			return this.parent;
		}
		public getLeft(): TreeNode<T>
		{
			return this.left;
		}
		public getRight(): TreeNode<T>
		{
			return this.right;
		}
		public getSibling(): TreeNode<T>
		{
			if (this.parent == null)
				return null;

			if (this.parent.left == this)
				return this.parent.right;
			else
				return this.parent.left;
		}

		public getValue(): T
		{
			return this.value;
		}

		public getColor(): number
		{
			return this.color;
		}
		public isInteral(): boolean
		{
			return !(this.left == null && this.right == null);
		}
	}
}