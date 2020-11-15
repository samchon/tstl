/**
 * @packageDocumentation
 * @module std.internal
 */
import { SetTree } from "./SetTree";
import { XTreeNode } from "./XTreeNode";
import { UniqueTreeSet } from "../container/associative/UniqueTreeSet";
import { SetElementList } from "../container/associative/SetElementList";
import { Comparator } from "../functional/Comparator";
export declare class UniqueSetTree<Key, Source extends UniqueTreeSet<Key, Source, SetElementList.Iterator<Key, true, Source>, SetElementList.ReverseIterator<Key, true, Source>>> extends SetTree<Key, true, Source> {
    constructor(source: Source, comp: Comparator<Key>);
    nearest_by_key(val: Key): XTreeNode<SetElementList.Iterator<Key, true, Source>> | null;
    upper_bound(val: Key): SetElementList.Iterator<Key, true, Source>;
}
//# sourceMappingURL=UniqueSetTree.d.ts.map