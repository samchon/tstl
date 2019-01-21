//================================================================ 
/** @module std.base */
//================================================================
import { _Color } from "./_Color";

/**
 * @hidden
 */
export class _XTreeNode<T>
{
	public parent: _XTreeNode<T> | null;
	public left: _XTreeNode<T> | null;
	public right: _XTreeNode<T> | null;

	public value: T;
	public color: _Color;

	/* ---------------------------------------------------------
		CONSTRUCTORS
	--------------------------------------------------------- */
	public constructor(value: T, color: _Color)
	{
		this.value = value;
		this.color = color;
		
		this.parent = null;
		this.left = null;
		this.right = null;
	}

	public get grand(): _XTreeNode<T> | null
	{
		return this.parent!.parent;
	}

	public get sibling(): _XTreeNode<T>  | null
	{
		if (this === this.parent!.left)
			return this.parent!.right;
		else
			return this.parent!.left;
	}
	
	public get uncle(): _XTreeNode<T>  | null
	{
		return this.parent!.sibling;
	}
}