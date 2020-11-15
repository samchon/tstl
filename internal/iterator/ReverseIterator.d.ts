/**
 * @packageDocumentation
 * @module std.base
 */
import { IContainer } from "../../base/container/IContainer";
/**
 * Basic reverse iterator.
 *
 * @author Jeongho Nam - https://github.com/samchon
 */
export declare abstract class ReverseIterator<T extends PElem, Source extends IContainer<T, Source, Base, This, PElem>, Base extends IContainer.Iterator<T, Source, Base, This, PElem>, This extends ReverseIterator<T, Source, Base, This, PElem>, PElem = T> implements IContainer.ReverseIterator<T, Source, Base, This, PElem> {
    protected base_: Base;
    /**
     * Initializer Constructor.
     *
     * @param base The base iterator.
     */
    constructor(base: Base);
    protected abstract _Create_neighbor(base: Base): This;
    /**
     * Get source container.
     *
     * @return The source container.
     */
    source(): Source;
    /**
     * @inheritDoc
     */
    base(): Base;
    /**
     * @inheritDoc
     */
    get value(): T;
    /**
     * @inheritDoc
     */
    prev(): This;
    /**
     * @inheritDoc
     */
    next(): This;
    /**
     * @inheritDoc
     */
    equals(obj: This): boolean;
}
//# sourceMappingURL=ReverseIterator.d.ts.map