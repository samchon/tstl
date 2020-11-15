/**
 * @packageDocumentation
 * @module std.internal
 */
import { XTree } from "./XTree";
import { XTreeNode } from "./XTreeNode";
import { ITreeMap } from "../../base/container/ITreeMap";
import { MapElementList } from "../container/associative/MapElementList";
import { IPair } from "../../utility/IPair";
import { Pair } from "../../utility/Pair";
import { Comparator } from "../functional/Comparator";
export declare abstract class MapTree<Key, T, Unique extends boolean, Source extends ITreeMap<Key, T, Unique, Source, MapElementList.Iterator<Key, T, Unique, Source>, MapElementList.ReverseIterator<Key, T, Unique, Source>>> extends XTree<MapElementList.Iterator<Key, T, Unique, Source>> {
    private source_;
    private key_compare_;
    private key_eq_;
    private value_compare_;
    constructor(source: Source, comp: Comparator<Key>, it_comp: Comparator<MapElementList.Iterator<Key, T, Unique, Source>>);
    get_by_key(key: Key): XTreeNode<MapElementList.Iterator<Key, T, Unique, Source>> | null;
    abstract nearest_by_key(key: Key): XTreeNode<MapElementList.Iterator<Key, T, Unique, Source>> | null;
    lower_bound(key: Key): MapElementList.Iterator<Key, T, Unique, Source>;
    abstract upper_bound(key: Key): MapElementList.Iterator<Key, T, Unique, Source>;
    equal_range(key: Key): Pair<MapElementList.Iterator<Key, T, Unique, Source>, MapElementList.Iterator<Key, T, Unique, Source>>;
    source(): Source;
    key_comp(): Comparator<Key>;
    key_eq(): Comparator<Key>;
    value_comp(): Comparator<IPair<Key, T>>;
}
//# sourceMappingURL=MapTree.d.ts.map