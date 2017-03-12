/// <reference path="../../API.ts" />

namespace std.base
{
	/**
	 * @hidden
	 */
	export class _XTreeNode<T>
	{
		private static sequence: number = 0;
		public uid: number;

        public parent: _XTreeNode<T>;
		public left: _XTreeNode<T>;
		public right: _XTreeNode<T>;

		public value: T;
		public color: _Color;

		/* ---------------------------------------------------------
			CONSTRUCTORS
		--------------------------------------------------------- */
		public constructor(value: T, color: _Color)
		{
			this.uid = ++_XTreeNode.sequence;
			this.value = value;
			this.color = color;
			
			this.parent = null;
			this.left = null;
			this.right = null;
		}

		public get grandParent(): _XTreeNode<T>
		{
			return this.parent.parent;
		}

		public get sibling(): _XTreeNode<T>
		{
			if (this == this.parent.left)
				return this.parent.right;
			else
				return this.parent.left;
		}
        
		public get uncle(): _XTreeNode<T>
		{
			return this.parent.sibling;
		}
	}
}