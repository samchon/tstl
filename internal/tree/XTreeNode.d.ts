/**
 * @packageDocumentation
 * @module std.internal
 */
import { Color } from "./Color";
/**
 * Node of {@link XTree}
 *
 * @author Jeongho Nam - https://github.com/samchon
 */
export declare class XTreeNode<T> {
    parent: XTreeNode<T> | null;
    left: XTreeNode<T> | null;
    right: XTreeNode<T> | null;
    value: T;
    color: Color;
    constructor(value: T, color: Color);
    get grand(): XTreeNode<T> | null;
    get sibling(): XTreeNode<T> | null;
    get uncle(): XTreeNode<T> | null;
}
//# sourceMappingURL=XTreeNode.d.ts.map