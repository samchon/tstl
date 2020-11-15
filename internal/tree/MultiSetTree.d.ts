/**
 * @packageDocumentation
 * @module std.internal
 */
import { SetTree } from "./SetTree";
import { XTreeNode } from "./XTreeNode";
import { MultiTreeSet } from "../container/associative/MultiTreeSet";
import { SetElementList } from "../container/associative/SetElementList";
import { Comparator } from "../functional/Comparator";
export declare class MultiSetTree<Key, Source extends MultiTreeSet<Key, Source, SetElementList.Iterator<Key, false, Source>, SetElementList.ReverseIterator<Key, false, Source>>> extends SetTree<Key, false, Source> {
    constructor(source: Source, comp: Comparator<Key>);
    insert(val: SetElementList.Iterator<Key, false, Source>): void;
    private _Nearest_by_key;
    nearest_by_key(val: Key): XTreeNode<SetElementList.Iterator<Key, false, Source>> | null;
    upper_bound(val: Key): SetElementList.Iterator<Key, false, Source>;
}
//# sourceMappingURL=MultiSetTree.d.ts.map