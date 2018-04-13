/// <reference path="../../API.ts" />

/// <reference path="_SetTree.ts" />

namespace std.base
{
	/**
	 * @hidden
	 */
	export class _MultiSetTree<T, Source extends MultiSet<T, Source>>
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
					let ret: boolean = comp(x.value, y.value);
					if (!ret && !comp(y.value, x.value))
						return (x as any).__get_m_iUID() < (y as any).__get_m_iUID();
					else
						return ret;
				}
			);
		}

		public insert(val: SetIterator<T, Source>): void
		{
			// ISSUE UID BEFORE INSERTION
			(val as any).__get_m_iUID();

			super.insert(val);
		}

		/* ---------------------------------------------------------
			FINDERS
		--------------------------------------------------------- */
		private _Nearest_by_key
			(
				val: T, 
				equal_mover: (node: _XTreeNode<SetIterator<T, Source>>) => _XTreeNode<SetIterator<T, Source>>
			): _XTreeNode<SetIterator<T, Source>>
		{
			// NEED NOT TO ITERATE
			if (this.root_ === null)
				return null;

			//----
			// ITERATE
			//----
			let ret: _XTreeNode<SetIterator<T, Source>> = this.root_;
			let matched: _XTreeNode<SetIterator<T, Source>> = null;

			while (true)
			{
				let it: SetIterator<T, Source> = ret.value;
				let my_node: _XTreeNode<SetIterator<T, Source>> = null;

				// COMPARE
				if (this.key_comp()(val, it.value))
					my_node = ret.left;
				else if (this.key_comp()(it.value, val))
					my_node = ret.right;
				else
				{
					// EQUAL, RESERVE THAT POINT
					matched = ret;
					my_node = equal_mover(ret);
				}

				// ULTIL CHILD NODE EXISTS
				if (my_node === null)
					break;
				else
					ret = my_node;
			}

			// RETURNS -> MATCHED OR NOT
			return (matched !== null) ? matched : ret;
		}

		public nearest_by_key(val: T): _XTreeNode<SetIterator<T, Source>>
		{
			return this._Nearest_by_key(val, function (node)
			{
				return node.left;
			});
		}

		public upper_bound(val: T): SetIterator<T, Source>
		{
			// FIND MATCHED NODE
			let node: _XTreeNode<SetIterator<T, Source>> = this._Nearest_by_key(val, 
				function (node)
				{
					return node.right;
				});
			if (node === null) // NOTHING
				return this.source().end() as SetIterator<T, Source>;

			// MUST BE it.first > key
			let it: SetIterator<T, Source> = node.value;
			
			if (this.key_comp()(val, it.value))
				return it;
			else
				return it.next();
        }
	}
}