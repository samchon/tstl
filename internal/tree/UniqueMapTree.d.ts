/**
 * @packageDocumentation
 * @module std.internal
 */
import { MapTree } from "./MapTree";
import { XTreeNode } from "./XTreeNode";
import { UniqueTreeMap } from "../container/associative/UniqueTreeMap";
import { MapElementList } from "../container/associative/MapElementList";
import { Comparator } from "../functional/Comparator";
export declare class UniqueMapTree<Key, T, Source extends UniqueTreeMap<Key, T, Source, MapElementList.Iterator<Key, T, true, Source>, MapElementList.ReverseIterator<Key, T, true, Source>>> extends MapTree<Key, T, true, Source> {
    constructor(source: Source, comp: Comparator<Key>);
    nearest_by_key(key: Key): XTreeNode<MapElementList.Iterator<Key, T, true, Source>> | null;
    upper_bound(key: Key): MapElementList.Iterator<Key, T, true, Source>;
}
//# sourceMappingURL=UniqueMapTree.d.ts.map