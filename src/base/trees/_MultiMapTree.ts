import { _MapTree } from "./_MapTree";
import { _XTreeNode } from "./_XTreeNode";

import { MultiMap } from "../containers/MultiMap";
import { MapIterator } from "../iterators/MapIterator";

/** 
 * @hidden
 */
export class _MultiMapTree<Key, T, Source extends MultiMap<Key, T, Source>>
	extends _MapTree<Key, T, false, Source>
{
	/* ---------------------------------------------------------
		CONSTRUCTOR
	--------------------------------------------------------- */
	public constructor(source: Source, comp: (x: Key, y: Key) => boolean)
	{
		super(source, comp,
			function (x: MapIterator<Key, T, false, Source>, y: MapIterator<Key, T, false, Source>): boolean
			{
				let ret: boolean = comp(x.first, y.first);

				if (!ret && !comp(y.first, x.first))
					return (x as any).__get_m_iUID() < (y as any).__get_m_iUID();
				else
					return ret;
			}
		);
	}

	public insert(val: MapIterator<Key, T, false, Source>): void
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
			equal_mover: (node: _XTreeNode<MapIterator<Key, T, false, Source>>) => _XTreeNode<MapIterator<Key, T, false, Source>>
		): _XTreeNode<MapIterator<Key, T, false, Source>>
	{
		// NEED NOT TO ITERATE
		if (this.root_ === null)
			return null;

		//----
		// ITERATE
		//----
		let ret: _XTreeNode<MapIterator<Key, T, false, Source>> = this.root_;
		let matched: _XTreeNode<MapIterator<Key, T, false, Source>> = null;

		while (true)
		{
			let it: MapIterator<Key, T, false, Source> = ret.value;
			let my_node: _XTreeNode<MapIterator<Key, T, false, Source>> = null;

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
			if (my_node === null)
				break;
			else
				ret = my_node;
		}

		// RETURNS -> MATCHED OR NOT
		return (matched !== null) ? matched : ret;
	}

	public nearest_by_key(key: Key): _XTreeNode<MapIterator<Key, T, false, Source>>
	{
		return this._Nearest_by_key(key, function (node)
		{
			return node.left;
		});
	}

	public upper_bound(key: Key): MapIterator<Key, T, false, Source>
	{
		// FIND MATCHED NODE
		let node: _XTreeNode<MapIterator<Key, T, false, Source>> = this._Nearest_by_key(key, 
			function (node)
			{
				return node.right;
			});
		if (node === null) // NOTHING
			return this.source().end() as MapIterator<Key, T, false, Source>;

		// MUST BE it.first > key
		let it: MapIterator<Key, T, false, Source> = node.value;
		if (this.key_comp()(key, it.first))
			return it;
		else
			return it.next();
	}
}