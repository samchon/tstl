//================================================================ 
/** @module std.base */
//================================================================
import { _XTreeNode } from "./_XTreeNode";
import { _Color } from "./_Color";

//--------
// The Red-Black Tree
//
// Referenceh: https://en.wikipedia.org/w/index.php?title=Red%E2%80%93black_tree
// Inventor: Rudolf Bayer
//--------
/**
 * @hidden
 */
export abstract class _XTree<T>
{
	protected root_: _XTreeNode<T> | null;

	private comp_: (x: T, y: T) => boolean;
	private equal_: (x: T, y: T) => boolean;

	/* ---------------------------------------------------------
		CONSTRUCTOR
	--------------------------------------------------------- */
	protected constructor(comp: (x: T, y: T) => boolean)
	{
		this.root_ = null;

		this.comp_ = comp;
		this.equal_ = function (x: T, y: T): boolean
		{
			return !comp(x, y) && !comp(y, x);
		};
	}

	public clear(): void
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
	public root(): _XTreeNode<T> | null
	{
		return this.root_;
	}

	public get(val: T): _XTreeNode<T> | null
	{
		let ret = this.nearest(val);
		if (ret === null || !this.equal_(val, ret.value))
			return null;
		else
			return ret;

		// let ret: _XTreeNode<T> = this.root_;

		// while (ret !== null)
		// {
		// 	if (this.comp_(val, ret.value))
		// 		ret = ret.left;
		// 	else if (this.comp_(ret.value, val))
		// 		ret = ret.right;
		// 	else
		// 		return ret; // MATCHED VALUE
		// }
		// return ret; // NULL -> UNABLE TO FIND THE MATCHED VALUE
	}

	public nearest(val: T): _XTreeNode<T> | null
	{
		// NEED NOT TO ITERATE
		if (this.root_ === null)
			return null;

		//----
		// ITERATE
		//----
		let ret: _XTreeNode<T> | null = this.root_;

		while (true) // UNTIL MEET THE MATCHED VALUE OR FINAL BRANCH
		{
			let my_node: _XTreeNode<T> | null = null;

			// COMPARE
			if (this.comp_(val, ret.value))
				my_node = ret.left;
			else if (this.comp_(ret.value, val))
				my_node = ret.right;
			else
				return ret; // MATCHED VALUE

			// FINAL BRANCH? OR KEEP GOING
			if (my_node !== null)
				ret = my_node;
			else
				break;
		}
		return ret; // DIFFERENT NODE
	}

	protected _Fetch_maximum(node: _XTreeNode<T>): _XTreeNode<T>
	{
		while (node.right !== null)
			node = node.right;

		return node;
	}
	
	/* =========================================================
		ELEMENTS I/O
			- INSERT
			- ERASE
			- COLOR
			- ROTATION
	============================================================
		INSERT
	--------------------------------------------------------- */
	public insert(val: T): void
	{
		let parent = this.nearest(val);
		let node = new _XTreeNode<T>(val, _Color.RED);

		if (parent === null)
			this.root_ = node;
		else
		{
			node.parent = parent;

			if (this.comp_(node.value, parent.value))
				parent.left = node;
			else
				parent.right = node;
		}

		this._Insert_case1(node);
	}

	private _Insert_case1(n: _XTreeNode<T>): void
	{
		if (n.parent === null)
			n.color = _Color.BLACK;
		else
			this._Insert_case2(n);
	}

	private _Insert_case2(n: _XTreeNode<T>): void
	{
		if (this._Fetch_color(n.parent) === _Color.BLACK)
			return;
		else
			this._Insert_case3(n);
	}

	private _Insert_case3(n: _XTreeNode<T>): void
	{
		if (this._Fetch_color(n.uncle) === _Color.RED)
		{
			n.parent!.color = _Color.BLACK;
			n.uncle!.color = _Color.BLACK;
			n.grand!.color = _Color.RED;

			this._Insert_case1(n.grand!);
		}
		else
			this._Insert_case4(n);
	}

	private _Insert_case4(n: _XTreeNode<T>): void
	{
		if (n === n.parent!.right && n.parent === n.grand!.left)
		{
			this._Rotate_left(n.parent!);
			n = n.left!;
		}
		else if (n === n.parent!.left && n.parent === n.grand!.right)
		{
			this._Rotate_right(n.parent!);
			n = n.right!;
		}

		this._Insert_case5(n);
	}

	private _Insert_case5(n: _XTreeNode<T>): void
	{
		n.parent!.color = _Color.BLACK;
		n.grand!.color = _Color.RED;

		if (n === n.parent!.left && n.parent === n.grand!.left)
			this._Rotate_right(n.grand!);
		else
			this._Rotate_left(n.grand!);
	}

	/* ---------------------------------------------------------
		ERASE
	--------------------------------------------------------- */
	public erase(val: T): void
	{
		let node: _XTreeNode<T> | null = this.get(val);
		if (node === null)
			return; // UNABLE TO FIND THE MATCHED NODE

		if (node.left !== null && node.right !== null)
		{
			let pred: _XTreeNode<T> = this._Fetch_maximum(node.left);

			node.value = pred.value;
			node = pred;
		}

		let child = (node.right === null) ? node.left : node.right;
		if (this._Fetch_color(node) === _Color.BLACK)
		{
			node.color = this._Fetch_color(child);
			this._Erase_case1(node);
		}
		this._Replace_node(node, child);

		if (this._Fetch_color(this.root_) === _Color.RED)
			this.root_!.color = _Color.BLACK;
	}

	private _Erase_case1(n: _XTreeNode<T>): void
	{
		if (n.parent === null)
			return;
		else
			this._Erase_case2(n);
	}

	private _Erase_case2(n: _XTreeNode<T>): void
	{
		if (this._Fetch_color(n.sibling) === _Color.RED)
		{
			n.parent!.color = _Color.RED;
			n.sibling!.color = _Color.BLACK;

			if (n === n.parent!.left)
				this._Rotate_left(n.parent!);
			else
				this._Rotate_right(n.parent!);
		}

		this._Erase_case3(n);
	}

	private _Erase_case3(n: _XTreeNode<T>): void
	{
		if (this._Fetch_color(n.parent) === _Color.BLACK &&
			this._Fetch_color(n.sibling) === _Color.BLACK &&
			this._Fetch_color(n.sibling!.left) === _Color.BLACK &&
			this._Fetch_color(n.sibling!.right) === _Color.BLACK)
		{
			n.sibling!.color = _Color.RED;
			this._Erase_case1(n.parent!);
		}
		else
			this._Erase_case4(n);
	}

	private _Erase_case4(N: _XTreeNode<T>): void
	{
		if (this._Fetch_color(N.parent) === _Color.RED &&
			N.sibling !== null &&
			this._Fetch_color(N.sibling) === _Color.BLACK &&
			this._Fetch_color(N.sibling.left) === _Color.BLACK &&
			this._Fetch_color(N.sibling.right) === _Color.BLACK)
		{
			N.sibling.color = _Color.RED;
			N.parent!.color = _Color.BLACK;
		}
		else
			this._Erase_case5(N);
	}

	private _Erase_case5(n: _XTreeNode<T>): void
	{
		if (n === n.parent!.left &&
			n.sibling !== null &&
			this._Fetch_color(n.sibling) === _Color.BLACK &&
			this._Fetch_color(n.sibling.left) === _Color.RED &&
			this._Fetch_color(n.sibling.right) === _Color.BLACK)
		{
			n.sibling.color = _Color.RED;
			n.sibling.left!.color = _Color.BLACK;

			this._Rotate_right(n.sibling);
		}
		else if (n === n.parent!.right &&
			n.sibling !== null &&
			this._Fetch_color(n.sibling) === _Color.BLACK &&
			this._Fetch_color(n.sibling.left) === _Color.BLACK &&
			this._Fetch_color(n.sibling.right) === _Color.RED)
		{
			n.sibling.color = _Color.RED;
			n.sibling.right!.color = _Color.BLACK;

			this._Rotate_left(n.sibling);
		}
		this._Erase_case6(n);
	}
	
	private _Erase_case6(n: _XTreeNode<T>): void
	{
		n.sibling!.color = this._Fetch_color(n.parent);
		n.parent!.color = _Color.BLACK;

		if (n === n.parent!.left)
		{
			n.sibling!.right!.color = _Color.BLACK;
			this._Rotate_left(n.parent!);
		}
		else
		{
			n.sibling!.left!.color = _Color.BLACK;
			this._Rotate_right(n.parent!);
		}
	}

	/* ---------------------------------------------------------
		ROTATION
	--------------------------------------------------------- */
	protected _Rotate_left(node: _XTreeNode<T>): void
	{
		let right = node.right;
		this._Replace_node(node, right);

		node.right = right!.left;
		if (right!.left !== null)
			right!.left!.parent = node;

		right!.left = node;
		node.parent = right;
	}

	protected _Rotate_right(node: _XTreeNode<T>): void
	{
		let left = node.left;
		this._Replace_node(node, left);

		node.left = left!.right;
		if (left!.right !== null)
			left!.right!.parent = node;

		left!.right = node;
		node.parent = left;
	}

	protected _Replace_node(oldNode: _XTreeNode<T>, newNode: _XTreeNode<T> | null): void
	{
		if (oldNode.parent === null)
			this.root_ = newNode;
		else
		{
			if (oldNode === oldNode.parent.left)
				oldNode.parent.left = newNode;
			else
				oldNode.parent.right = newNode;
		}

		if (newNode !== null)
			newNode.parent = oldNode.parent;
	}

	/* ---------------------------------------------------------
		COLOR
	--------------------------------------------------------- */
	private _Fetch_color(node: _XTreeNode<T> | null): _Color
	{
		if (node === null)
			return _Color.BLACK;
		else
			return node.color;
	}
}