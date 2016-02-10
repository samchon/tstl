namespace std.base.tree
{
	/**
	 * Reference: http://jiniya.net/tt/444
	 */
	export class XTreeNode<T>
	{
		public parent: XTreeNode<T>;
		public left: XTreeNode<T>;
		public right: XTreeNode<T>;

		public value: T;

		public color: boolean;

		/* ---------------------------------------------------------
			CONSTRUCTORS
		--------------------------------------------------------- */
		/**
		 * Construct from value and color of node. 
		 *
		 * @param value Value to be stored in.
		 * @param color Color of the node, red or black.
		 */
		public constructor(value: T, color: boolean)
		{
			this.value = value;
			this.color = color;

			this.parent = null;
			this.left = null;
			this.right = null;
		}

		public get grandParent(): XTreeNode<T>
		{
			return this.parent.parent;
		}
		public get sibling(): XTreeNode<T>
		{
			if (this == this.parent.left)
				return this.parent.right;
			else
				return this.parent.left;
		}
		public get uncle(): XTreeNode<T>
		{
			return this.parent.sibling;
		}

		//public debug(header: string = "ROOT", level: number = 0): void
		//{
		//	// TABS
		//	let tab: string = "";
		//	for (let i = 0; i < level; i++)
		//		tab += "\t";
			
		//	console.log(tab + header + ": " + this.value);

		//	// LEFT AND  RIGHT
		//	if (this.left != null)
		//		this.left.debug("Left", level + 1);

		//	if (this.right != null)
		//		this.right.debug("Right", level + 1);
		//}
	}
}