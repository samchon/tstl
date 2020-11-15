/**
 * @packageDocumentation
 * @module std.internal
 */
import { IContainer } from "../../base/container/IContainer";
import { ReverseIterator } from "./ReverseIterator";
/**
 * Basic List Iterator.
 *
 * @author Jeongho Nam - https://github.com/samchon
 */
export declare abstract class ListIterator<T extends Elem, SourceT extends IContainer<T, SourceT, IteratorT, ReverseIteratorT, Elem>, IteratorT extends ListIterator<T, SourceT, IteratorT, ReverseIteratorT, Elem>, ReverseIteratorT extends ReverseIterator<T, SourceT, IteratorT, ReverseIteratorT, Elem>, Elem> implements Readonly<IContainer.Iterator<T, SourceT, IteratorT, ReverseIteratorT, Elem>> {
    private prev_;
    private next_;
    protected value_: T;
    protected constructor(prev: IteratorT, next: IteratorT, value: T);
    /**
     * @inheritDoc
     */
    abstract reverse(): ReverseIteratorT;
    /**
     * @inheritDoc
     */
    abstract source(): SourceT;
    /**
     * @inheritDoc
     */
    prev(): IteratorT;
    /**
     * @inheritDoc
     */
    next(): IteratorT;
    /**
     * @inheritDoc
     */
    get value(): T;
    protected _Try_value(): void;
    /**
     * @inheritDoc
     */
    equals(obj: IteratorT): boolean;
}
//# sourceMappingURL=ListIterator.d.ts.map