/// <reference path="../../API.ts" />

/// <reference path="_SetTree.ts" />

namespace std.base
{
	/**
	 * @hidden
	 */
	export class _UniqueSetTree<T, Source extends UniqueSet<T, Source>>
		extends _SetTree<T, Source>
	{
		/* ---------------------------------------------------------
			CONSTRUCTOR
		--------------------------------------------------------- */
		public constructor(source: Source, comp: (x: T, y: T) => boolean)
		{
			super(source, comp, 
				function (x: SetIterator<T, Source>, y: SetIterator<T, Source>): boolean
				{
					return comp(x.value, y.value);
				}
			);
		}

		/* ---------------------------------------------------------
			FINDERS
		--------------------------------------------------------- */
		public nearest_by_key(val: T): _XTreeNode<SetIterator<T, Source>>
		{
			// NEED NOT TO ITERATE
			if (this.root_ === null)
				return null;

			//----
			// ITERATE
			//----
			let ret: _XTreeNode<SetIterator<T, Source>> = this.root_;

			while (true) // UNTIL MEET THE MATCHED VALUE OR FINAL BRANCH
			{
				let it: SetIterator<T, Source> = ret.value;
				let my_node: _XTreeNode<SetIterator<T, Source>> = null;

				// COMPARE
				if (this.key_comp()(val, it.value))
					my_node = ret.left;
				else if (this.key_comp()(it.value, val))
					my_node = ret.right;
				else
					return ret; // MATCHED VALUE

				// FINAL BRANCH? OR KEEP GOING
				if (my_node === null)
					break;
				else
					ret = my_node;
			}
			return ret; // DIFFERENT NODE
		}

		public upper_bound(val: T): SetIterator<T, Source>
		{
			//--------
			// FIND MATCHED NODE
			//--------
			let node: _XTreeNode<SetIterator<T, Source>> = this.nearest_by_key(val);
			if (node === null)
				return this.source().end() as SetIterator<T, Source>;

			//--------
			// RETURN BRANCH
			//--------
			let it: SetIterator<T, Source> = node.value;

			// MUST BE it.value > key
			if (this.key_comp()(val, it.value))
				return it; 
			else
				return it.next();
        }
	}
}