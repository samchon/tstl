import { _XTree } from "./_XTree";
import { _XTreeNode } from "./_XTreeNode";

import { MapContainer } from "../containers/MapContainer";
import { MapIterator } from "../iterators/MapIterator";

import { IPair } from "../../utilities/IPair";
import { Pair } from "../../utilities/Pair";

/**
 * @hidden
 */
export abstract class _MapTree<Key, T, Source extends MapContainer<Key, T, Source>>
	extends _XTree<MapIterator<Key, T, Source>>
{
	private source_: Source;

	private key_compare_: (x: Key, y: Key) => boolean;
	private key_eq_: (x: Key, y: Key) => boolean;
	private value_compare_: (x: IPair<Key, T>, y: IPair<Key, T>) => boolean;
	
	/* ---------------------------------------------------------
		CONSTRUCTOR
	--------------------------------------------------------- */
	public constructor
		(
			source: Source, 
			comp: (x: Key, y: Key) => boolean,
			it_comp: (x: MapIterator<Key, T, Source>, y: MapIterator<Key, T, Source>) => boolean
		)
	{
		super(it_comp);
		this.source_ = source;

		this.key_compare_ = comp;
		this.key_eq_ = function (x: Key, y: Key): boolean
		{
			return !comp(x, y) && !comp(y, x);
		};
		this.value_compare_ = function (x: IPair<Key, T>, y: IPair<Key, T>): boolean
		{
			return comp(x.first, y.first);
		};
	}

	/* ---------------------------------------------------------
		FINDERS
	--------------------------------------------------------- */
	public get_by_key(key: Key): _XTreeNode<MapIterator<Key, T, Source>>
	{
		let ret = this.nearest_by_key(key);
		if (ret == null || !this.key_eq_(key, ret.value.first))
			return null;
		else
			return ret;
	}
	public abstract nearest_by_key(key: Key): _XTreeNode<MapIterator<Key, T, Source>>;

	public lower_bound(key: Key): MapIterator<Key, T, Source>
	{
		let node: _XTreeNode<MapIterator<Key, T, Source>> = this.nearest_by_key(key);

		if (node == null)
			return this.source().end() as MapIterator<Key, T, Source>;
		else if (this.key_comp()(node.value.first, key)) // it < key
			return node.value.next();
		else
			return node.value;
	}

	public abstract upper_bound(key: Key): MapIterator<Key, T, Source>;

	public equal_range(key: Key): Pair<MapIterator<Key, T, Source>, MapIterator<Key, T, Source>>
	{
		return new Pair(this.lower_bound(key), this.upper_bound(key));
	}

	/* ---------------------------------------------------------
		ACCECSSORS
	--------------------------------------------------------- */
	public source(): Source
	{
		return this.source_;
	}

	public key_comp(): (x: Key, y: Key) => boolean
	{
		return this.key_compare_;
	}
	public key_eq(): (x: Key, y: Key) => boolean
	{
		return this.key_eq_;	
	}
	
	public value_comp(): (x: IPair<Key, T>, y: IPair<Key, T>) => boolean
	{
		return this.value_compare_;
	}
}