/**
 * @packageDocumentation
 * @module std.internal
 */
import { MapTree } from "./MapTree";
import { XTreeNode } from "./XTreeNode";
import { MultiTreeMap } from "../container/associative/MultiTreeMap";
import { MapElementList } from "../container/associative/MapElementList";
import { Comparator } from "../functional/Comparator";
export declare class MultiMapTree<Key, T, Source extends MultiTreeMap<Key, T, Source, MapElementList.Iterator<Key, T, false, Source>, MapElementList.ReverseIterator<Key, T, false, Source>>> extends MapTree<Key, T, false, Source> {
    constructor(source: Source, comp: Comparator<Key>);
    insert(val: MapElementList.Iterator<Key, T, false, Source>): void;
    private _Nearest_by_key;
    nearest_by_key(key: Key): XTreeNode<MapElementList.Iterator<Key, T, false, Source>> | null;
    upper_bound(key: Key): MapElementList.Iterator<Key, T, false, Source>;
}
//# sourceMappingURL=MultiMapTree.d.ts.map