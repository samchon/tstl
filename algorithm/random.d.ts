/**
 * @packageDocumentation
 * @module std
 */
import { IForwardIterator } from "../iterator/IForwardIterator";
import { IPointer } from "../functional/IPointer";
import { Writeonly } from "../internal/functional/Writeonly";
/**
 * Generate random integer.
 *
 * @param x Minimum value.
 * @param y Maximum value.
 *
 * @return A random integer between [x, y].
 */
export declare function randint(x: number, y: number): number;
/**
 * Pick sample elements up.
 *
 * @param first Input iteartor of the first position.
 * @param last Input iterator of the last position.
 * @param output Output iterator of the first position.
 * @param n Number of elements to pick up.
 *
 * @return Output Iterator of the last position by advancing.
 */
export declare function sample<InputIterator extends Readonly<IForwardIterator<IPointer.ValueType<InputIterator>, InputIterator>>, OutputIterator extends Writeonly<IForwardIterator<IPointer.ValueType<InputIterator>, OutputIterator>>>(first: InputIterator, last: InputIterator, output: OutputIterator, n: number): OutputIterator;
//# sourceMappingURL=random.d.ts.map