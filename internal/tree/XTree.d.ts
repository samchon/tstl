/**
 * @packageDocumentation
 * @module std.internal
 */
import { XTreeNode } from "./XTreeNode";
import { Comparator } from "../functional/Comparator";
/**
 * Red-Black Tree
 *
 * @reference https://en.wikipedia.org/w/index.php?title=Red%E2%80%93black_tree
 * @inventor Rudolf Bayer
 * @author Jeongho Nam - https://github.com/samchon
 */
export declare abstract class XTree<T> {
    protected root_: XTreeNode<T> | null;
    private comp_;
    private equal_;
    protected constructor(comp: Comparator<T>);
    clear(): void;
    root(): XTreeNode<T> | null;
    get(val: T): XTreeNode<T> | null;
    nearest(val: T): XTreeNode<T> | null;
    private _Fetch_maximum;
    insert(val: T): void;
    private _Insert_case1;
    private _Insert_case2;
    private _Insert_case3;
    private _Insert_case4;
    private _Insert_case5;
    erase(val: T): void;
    private _Erase_case1;
    private _Erase_case2;
    private _Erase_case3;
    private _Erase_case4;
    private _Erase_case5;
    private _Erase_case6;
    private _Rotate_left;
    private _Rotate_right;
    private _Replace_node;
    private _Fetch_color;
}
//# sourceMappingURL=XTree.d.ts.map