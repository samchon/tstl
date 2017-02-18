/// <reference path="../../API.ts" />

//--------
// The Red-Black Tree
//
// Referenceh: https://en.wikipedia.org/w/index.php?title=Red%E2%80%93black_tree
// Inventor: Rudolf Bayer
//--------

namespace std.base
{
	/**
	 * @hidden
	 */
	export abstract class _XTree<T>
	{
		protected root_: _XTreeNode<T>;

		private compare_: (x: T, y: T) => boolean;

		/* ---------------------------------------------------------
			CONSTRUCTOR
		--------------------------------------------------------- */
		protected constructor();

		protected constructor(compare: (x: T, y: T) => boolean);

		protected constructor(compare: (x: T, y: T) => boolean = less)
		{
			this.root_ = null;
			this.compare_ = compare;
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
		public root(): _XTreeNode<T>
		{
			return this.root_;
		}

		public find(val: T): _XTreeNode<T>
		{
			if (this.root_ == null)
				return null;

			let node: _XTreeNode<T> = this.root_;

			while (true)
			{
				let newNode: _XTreeNode<T> = null;

				if (equal_to(val, node.value))
					break; // EQUALS, MEANS MATCHED, THEN TERMINATE
				else if (this.compare_(val, node.value))
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

		protected _Fetch_maximum(node: _XTreeNode<T>): _XTreeNode<T>
		{
			while (node.right != null)
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
			let parent = this.find(val);
			let node = new _XTreeNode<T>(val, _Color.RED);

			if (parent == null)
				this.root_ = node;
			else
			{
				node.parent = parent;

				if (this.compare_(node.value, parent.value))
					parent.left = node;
				else
					parent.right = node;
			}

			this._Insert_case1(node);
        }

		private _Insert_case1(N: _XTreeNode<T>): void
		{
			if (N.parent == null)
				N.color = _Color.BLACK;
			else
				this._Insert_case2(N);
        }

		private _Insert_case2(N: _XTreeNode<T>): void
		{
			if (this._Fetch_color(N.parent) == _Color.BLACK)
				return;
			else
				this._Insert_case3(N);
        }

		private _Insert_case3(N: _XTreeNode<T>): void
		{
			if (this._Fetch_color(N.uncle) == _Color.RED)
			{
				N.parent.color = _Color.BLACK;
				N.uncle.color = _Color.BLACK;
				N.grandParent.color = _Color.RED;

				this._Insert_case1(N.grandParent);
			}
			else
			{
				this._Insert_case4(N);
			}
        }

		private _Insert_case4(node: _XTreeNode<T>): void
		{
			if (node == node.parent.right && node.parent == node.grandParent.left)
			{
				this._Rotate_left(node.parent);
				node = node.left;
			}
			else if (node == node.parent.left && node.parent == node.grandParent.right)
			{
				this._Rotate_right(node.parent);
				node = node.right;
			}

			this._Insert_case5(node);
        }

		private _Insert_case5(node: _XTreeNode<T>): void
		{
			node.parent.color = _Color.BLACK;
			node.grandParent.color = _Color.RED;

			if (node == node.parent.left && node.parent == node.grandParent.left)
				this._Rotate_right(node.grandParent);
			else
				this._Rotate_left(node.grandParent);
		}

		/* ---------------------------------------------------------
			ERASE
		--------------------------------------------------------- */
		public erase(val: T): void
		{
			let node = this.find(val);
			if (node == null || equal_to(val, node.value) == false)
				return;

			if (node.left != null && node.right != null)
			{
				let pred: _XTreeNode<T> = this._Fetch_maximum(node.left);

				node.value = pred.value;
				node = pred;
			}

			let child = (node.right == null) ? node.left : node.right;
			
			if (this._Fetch_color(node) == _Color.BLACK)
			{
				node.color = this._Fetch_color(child);
				this._Erase_case1(node);
			}

			this._Replace_node(node, child);
        }

		private _Erase_case1(N: _XTreeNode<T>): void
		{
			if (N.parent == null)
				return;
			else
				this._Erase_case2(N);
        }

		private _Erase_case2(N: _XTreeNode<T>): void
		{
			if (this._Fetch_color(N.sibling) == _Color.RED)
			{
				N.parent.color = _Color.RED;
				N.sibling.color = _Color.BLACK;

				if (N == N.parent.left)
					this._Rotate_left(N.parent);
				else
					this._Rotate_right(N.parent);
			}

			this._Erase_case3(N);
        }

		private _Erase_case3(N: _XTreeNode<T>): void
		{
			if (this._Fetch_color(N.parent) == _Color.BLACK &&
				this._Fetch_color(N.sibling) == _Color.BLACK &&
				this._Fetch_color(N.sibling.left) == _Color.BLACK &&
				this._Fetch_color(N.sibling.right) == _Color.BLACK)
			{
				N.sibling.color = _Color.RED;

				this._Erase_case1(N.parent);
			}
			else
				this._Erase_case4(N);
        }

		private _Erase_case4(N: _XTreeNode<T>): void
		{
			if (this._Fetch_color(N.parent) == _Color.RED &&
				N.sibling != null &&
				this._Fetch_color(N.sibling) == _Color.BLACK &&
				this._Fetch_color(N.sibling.left) == _Color.BLACK &&
				this._Fetch_color(N.sibling.right) == _Color.BLACK)
			{
				N.sibling.color = _Color.RED;
				N.parent.color = _Color.BLACK;
			}
			else
				this._Erase_case5(N);
        }

		private _Erase_case5(N: _XTreeNode<T>): void
		{
			if (N == N.parent.left &&
				N.sibling != null &&
				this._Fetch_color(N.sibling) == _Color.BLACK &&
				this._Fetch_color(N.sibling.left) == _Color.RED &&
				this._Fetch_color(N.sibling.right) == _Color.BLACK)
			{
				N.sibling.color = _Color.RED;
				N.sibling.left.color = _Color.BLACK;

				this._Rotate_right(N.sibling);
			}
			else if (N == N.parent.right &&
				N.sibling != null &&
				this._Fetch_color(N.sibling) == _Color.BLACK &&
				this._Fetch_color(N.sibling.left) == _Color.BLACK &&
				this._Fetch_color(N.sibling.right) == _Color.RED)
			{
				N.sibling.color = _Color.RED;
				N.sibling.right.color = _Color.BLACK;

				this._Rotate_left(N.sibling);
			}
		}
        
		private _Erase_case6(node: _XTreeNode<T>): void
		{
			node.sibling.color = this._Fetch_color(node.parent);
			node.parent.color = _Color.BLACK;

			if (node == node.parent.left)
			{
				node.sibling.right.color = _Color.BLACK;

				this._Rotate_left(node.parent);
			}
			else
			{
				node.sibling.left.color = _Color.BLACK;
				
				this._Rotate_right(node.parent);
			}
		}

		/* ---------------------------------------------------------
			ROTATION
		--------------------------------------------------------- */
		protected _Rotate_left(node: _XTreeNode<T>): void
		{
			let right = node.right;
			this._Replace_node(node, right);

			node.right = right.left;
			if (right.left != null)
				right.left.parent = node;

			right.left = node;
			node.parent = right;
        }

		protected _Rotate_right(node: _XTreeNode<T>): void
		{
			let left = node.left;
			this._Replace_node(node, left);

			node.left = left.right;
			if (left.right != null)
				left.right.parent = node;

			left.right = node;
			node.parent = left;
        }

		protected _Replace_node(oldNode: _XTreeNode<T>, newNode: _XTreeNode<T>): void
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

		/* ---------------------------------------------------------
			COLOR
		--------------------------------------------------------- */
		private _Fetch_color(node: _XTreeNode<T>): _Color
		{
			if (node == null)
				return _Color.BLACK;
			else
				return node.color;
		}
	}
}