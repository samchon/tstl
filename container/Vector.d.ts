/**
 * @packageDocumentation
 * @module std
 */
import { IArrayContainer } from "../base/container/IArrayContainer";
import { VectorContainer } from "../internal/container/linear/VectorContainer";
import { ArrayIterator } from "../internal/iterator/ArrayIterator";
import { ArrayReverseIterator } from "../internal/iterator/ArrayReverseIterator";
import { IForwardIterator } from "../iterator/IForwardIterator";
/**
 * Vector, an array with variable capacity.
 *
 * @author Jeongho Nam - https://github.com/samchon
 */
export declare class Vector<T> extends VectorContainer<T, Vector<T>, Vector<T>, Vector.Iterator<T>, Vector.ReverseIterator<T>> implements IArrayContainer<T, Vector<T>, Vector.Iterator<T>, Vector.ReverseIterator<T>> {
    /**
     * Default Constructor.
     */
    constructor();
    /**
     * Initializer Constructor.
     *
     * @param items Items to assign.
     */
    constructor(items: Array<T>);
    /**
     * Copy Constructor
     *
     * @param obj Object to copy.
     */
    constructor(obj: Vector<T>);
    /**
     * Fill Constructor.
     *
     * @param size Initial size.
     * @param val Value to fill.
     */
    constructor(n: number, val: T);
    /**
     * Range Constructor.
     *
     * @param first Input iterator of the first position.
     * @param last Input iteartor of the last position.
     */
    constructor(first: Readonly<IForwardIterator<T>>, last: Readonly<IForwardIterator<T>>);
    /**
     * Wrap an array into a vector.
     *
     * @param data Target array to be wrapped
     * @return A vector wrapping the parametric array.
     */
    static wrap<T>(data: Array<T>): Vector<T>;
    /**
     * @inheritDoc
     */
    nth(index: number): Vector.Iterator<T>;
    protected source(): Vector<T>;
}
/**
 *
 */
export declare namespace Vector {
    /**
     * Iterator of {@link Vector}
     */
    type Iterator<T> = ArrayIterator<T, Vector<T>>;
    /**
     * Reverse iterator of {@link Vector}
     */
    type ReverseIterator<T> = ArrayReverseIterator<T, Vector<T>>;
    const Iterator: typeof ArrayIterator;
    const ReverseIterator: typeof ArrayReverseIterator;
}
//# sourceMappingURL=Vector.d.ts.map