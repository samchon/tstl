/// <reference path="../../API.ts" />

/// <reference path="_MapTree.ts" />

namespace std.base
{
	export class _MultiMapTree<Key, T, Source extends IMultiMap<Key, T>>
		extends _MapTree<Key, T, Source>
	{
		/* ---------------------------------------------------------
			CONSTRUCTOR
		--------------------------------------------------------- */
		public constructor(source: Source, comp: (x: Key, y: Key) => boolean)
		{
			super(source, comp,
				function (x: MapIterator<Key, T, Source>, y: MapIterator<Key, T, Source>): boolean
				{
					let ret: boolean = comp(x.first, y.first);

					if (!ret && !comp(y.first, x.first))
						return (x as any).__get_m_iUID() < (y as any).__get_m_iUID();
					else
						return ret;
				}
			);
		}

		public insert(val: MapIterator<Key, T, Source>): void
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
				key: Key, 
				equal_mover: (node: _XTreeNode<MapIterator<Key, T, Source>>) => _XTreeNode<MapIterator<Key, T, Source>>
			): _XTreeNode<MapIterator<Key, T, Source>>
		{
			// NEED NOT TO ITERATE
			if (this.root_ == null)
				return null;

			//----
			// ITERATE
			//----
			let ret: _XTreeNode<MapIterator<Key, T, Source>> = this.root_;
			let matched: _XTreeNode<MapIterator<Key, T, Source>> = null;

			while (true)
			{
				let it: MapIterator<Key, T, Source> = ret.value;
				let my_node: _XTreeNode<MapIterator<Key, T, Source>> = null;

				// COMPARE
				if (this.key_comp()(key, it.first))
					my_node = ret.left;
				else if (this.key_comp()(it.first, key))
					my_node = ret.right;
				else
				{
					// EQUAL, RESERVE THAT POINT
					matched = ret;
					my_node = equal_mover(ret);
				}

				// ULTIL CHILD NODE EXISTS
				if (my_node == null)
					break;
				else
					ret = my_node;
			}

			// RETURNS -> MATCHED OR NOT
			return (matched != null) ? matched : ret;
		}

		public nearest_by_key(key: Key): _XTreeNode<MapIterator<Key, T, Source>>
		{
			return this._Nearest_by_key(key, function (node)
			{
				return node.left;
			});
		}

		public upper_bound(key: Key): MapIterator<Key, T, Source>
		{
			// FIND MATCHED NODE
			let node: _XTreeNode<MapIterator<Key, T, Source>> = this._Nearest_by_key(key, 
				function (node)
				{
					return node.right;
				});
			if (node == null) // NOTHING
				return this.source().end() as MapIterator<Key, T, Source>;

			// MUST BE it.first > key
			let it: MapIterator<Key, T, Source> = node.value;
			if (this.key_comp()(key, it.first))
				return it;
			else
				return it.next();
		}
	}
}