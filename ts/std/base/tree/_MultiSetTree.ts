/// <reference path="../../API.ts" />

/// <reference path="_SetTree.ts" />

namespace std.base
{
	/**
	 * @hidden
	 */
	export class _MultiSetTree<T>
		extends _SetTree<T>
	{
		/* ---------------------------------------------------------
			CONSTRUCTOR
		--------------------------------------------------------- */
		public constructor(set: TreeMultiSet<T>, compare: (x: T, y: T) => boolean)
		{
			super
			(
				set, 
				compare, 
				function (x: SetIterator<T>, y: SetIterator<T>): boolean
				{
					if (equal_to(x.value, y.value))
						return (x as any).__get_m_iUID() < (y as any).__get_m_iUID();
					else
						return compare(x.value, y.value);
				}
			);
		}

		/* ---------------------------------------------------------
			FINDERS
		--------------------------------------------------------- */
		public find_by_val(val: T): _XTreeNode<SetIterator<T>>
		{
			let node: _XTreeNode<SetIterator<T>> = this.root_;
			if (node == null)
				return null;

			// FOR THE DUPLICATE VALUE
			let matched: _XTreeNode<SetIterator<T>> = null;

			while (true)
			{
				let it: SetIterator<T> = node.value;
				let myNode: _XTreeNode<SetIterator<T>> = null;
				
				if (equal_to(val, it.value))
				{
					matched = node;
					myNode = node.left;
				}
				else if (this.key_comp()(val, it.value))
					myNode = node.left;
				else
					myNode = node.right;

				// ULTIL CHILD NODE EXISTS
				if (myNode == null)
					break;
				
				// SHIFT A NEW NODE TO THE NODE TO BE RETURNED
				node = myNode;
			}

			// RETURN BRANCH
			if (matched != null)
				return matched;
			else
				return node;
		}

		public upper_bound(val: T): SetIterator<T>
		{
			//--------
			// FIND MATCHED NODE
			//--------
			let node: _XTreeNode<SetIterator<T>> = this.root_;
			if (node == null)
				return this.set().end();

			// FOR THE DUPLICATE VALUE
			let matched: _XTreeNode<SetIterator<T>> = null;

			while (true)
			{
				let myNode: _XTreeNode<SetIterator<T>> = null;

				if (equal_to(val, node.value.value))
				{
					matched = node;
					myNode = node.right;
				}
				else if (this.key_comp()(val, node.value.value))
					myNode = node.left; // LESS, THEN TO THE LEFT
				else
					myNode = node.right; // GREATER, THEN TO THE RIGHT

				// ULTIL CHILD NODE EXISTS
				if (myNode == null)
					break;
				
				// SHIFT A NEW NODE TO THE NODE TO BE RETURNED
				node = myNode;
			}

			//--------
			// RETURN BRANCH
			//--------
			if (matched != null) // MATCHED KEY EXISTS
				return matched.value.next();

			let it: SetIterator<T> = node.value;
			if (equal_to(it.value, val) || this.key_comp()(it.value, val)) // it.first <= key
				return it.next();
			else // it.first > key
				return it;
        }
	}
}