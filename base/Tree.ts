namespace std.base
{
	export class Tree<T>
	{
		protected root: TreeNode<T>;

		/* ---------------------------------------------------------
		    CONSTRUCTOR
	    --------------------------------------------------------- */
		/**
		 * Default Constructor
		 */
		public constructor()
		{
			this.root = null;
		}

		/* ---------------------------------------------------------
		    ACCESSORS
	    --------------------------------------------------------- */
		public find(val: T): TreeNode<T>
		{
			var node = this.findNearest(val);

			if (std.equals(node.getValue(), val) == false)
				return null;
			else
				return node;
		}
		
		public findNearest(val: T): TreeNode<T>
		{
			var node: TreeNode<T> = this.root;

			while (node != null && std.equals(val, node.getValue()) == false)
			{
				if (std.less(val, node.getValue()) == true)
					node = node.getLeft();
				else
					node = node.getRight();
			}

			return node;
		}

		/* ---------------------------------------------------------
		    ELEMENT I/O
	    --------------------------------------------------------- */
		public insert(val: T): void
		{
			if (this.root == null)
			{
				this.root = new TreeNode<T>(val);
			}
			else
			{
				// SET PARENT
				let parent: TreeNode<T> = this.findNearest(val);
				if (std.equals(parent.getValue(), val) == true)
					return;

				parent.insert(val);
			}
		}

		public erase(val: T): void
		{

		}
	}
}