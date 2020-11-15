/**
 * @packageDocumentation
 * @module std
 */
import { IPointer } from "../functional/IPointer";
import { IForwardIterator } from "./IForwardIterator";
import { IBidirectionalIterator } from "./IBidirectionalIterator";
import { IEmpty } from "../internal/container/partial/IEmpty";
import { ISize } from "../internal/container/partial/ISize";
/**
 * Test whether a container is empty.
 *
 * @param source Target container.
 * @return Whether empty or not.
 */
export declare function empty(source: Array<any> | IEmpty): boolean;
/**
 * Get number of elements of a container.
 *
 * @param source Target container.
 * @return The number of elements in the container.
 */
export declare function size(source: Array<any> | ISize): number;
/**
 * Get distance between two iterators.
 *
 * @param first Input iteartor of the first position.
 * @param last Input iterator of the last position.
 *
 * @return The distance.
 */
export declare function distance<InputIterator extends Readonly<IForwardIterator<IPointer.ValueType<InputIterator>, InputIterator>>>(first: InputIterator, last: InputIterator): number;
/**
 * Advance iterator.
 *
 * @param it Target iterator to advance.
 * @param n Step to advance.
 *
 * @return The advanced iterator.
 */
export declare function advance<InputIterator extends IForwardIterator<IPointer.ValueType<InputIterator>, InputIterator>>(it: InputIterator, n: number): InputIterator;
/**
 * Get previous iterator.
 *
 * @param it Iterator to move.
 * @param n Step to move prev.
 * @return An iterator moved to prev *n* steps.
 */
export declare function prev<BidirectionalIterator extends IBidirectionalIterator<IPointer.ValueType<BidirectionalIterator>, BidirectionalIterator>>(it: BidirectionalIterator, n?: number): BidirectionalIterator;
/**
 * Get next iterator.
 *
 * @param it Iterator to move.
 * @param n Step to move next.
 * @return Iterator moved to next *n* steps.
 */
export declare function next<ForwardIterator extends IForwardIterator<IPointer.ValueType<ForwardIterator>, ForwardIterator>>(it: ForwardIterator, n?: number): ForwardIterator;
//# sourceMappingURL=global.d.ts.map