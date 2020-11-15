/**
 * @packageDocumentation
 * @module std.internal
 */
import { IForwardIterator } from "../../../iterator/IForwardIterator";
/**
 * Adaptor for `for ... of` iteration.
 *
 * @author Jeongho Nam - https://github.com/samchon
 */
export declare class ForOfAdaptor<T, InputIterator extends Readonly<IForwardIterator<T, InputIterator>>> implements IterableIterator<T> {
    private it_;
    private last_;
    /**
     * Initializer Constructor.
     *
     * @param first Input iteartor of the first position.
     * @param last Input iterator of the last position.
     */
    constructor(first: InputIterator, last: InputIterator);
    /**
     * @inheritDoc
     */
    next(): IteratorResult<T>;
    /**
     * @inheritDoc
     */
    [Symbol.iterator](): IterableIterator<T>;
}
//# sourceMappingURL=ForOfAdaptor.d.ts.map