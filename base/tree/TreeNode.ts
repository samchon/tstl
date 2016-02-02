namespace std.base.tree
{
	/**
	 * Reference: http://jiniya.net/tt/444
	 */
	export class TreeNode<T>
	{
		public parent: TreeNode<T>;
		public left: TreeNode<T>;
		public right: TreeNode<T>;

		public value: T;

		public color: boolean;

		/* ---------------------------------------------------------
		    CONSTRUCTORS
	    --------------------------------------------------------- */
		public constructor(value: T, color: boolean)
		{
			this.value = value;
			this.color = color;

			this.parent = null;
			this.left = null;
			this.right = null;
		}

		public get grandParent(): TreeNode<T>
		{
			return this.parent.parent;
		}
		public get sibling(): TreeNode<T>
		{
			if (this == this.parent.left)
				return this.parent.right;
			else
				return this.parent.left;
		}
		public get uncle(): TreeNode<T>
		{
			return this.parent.sibling;
		}

		public debug(header: string = "ROOT", level: number = 0): void
		{
			// TABS
			let tab: string = "";
			for (let i = 0; i < level; i++)
				tab += "\t";
			
			console.log(tab + header + ": " + this.value);

			// LEFT AND  RIGHT
			if (this.left != null)
				this.left.debug("Left", level + 1);

			if (this.right != null)
				this.right.debug("Right", level + 1);
		}
	}
}