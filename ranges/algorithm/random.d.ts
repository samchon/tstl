import { IForwardContainer } from "../container/IForwardContainer";
import { IForwardIterator } from "../../iterator/IForwardIterator";
import { IPointer } from "../../functional/IPointer";
import { Writeonly } from "../../internal/functional/Writeonly";
/**
 * Pick sample elements up.
 *
 * @param range An iterable ranged container.
 * @param output Output iterator of the first position.
 * @param n Number of elements to pick up.
 *
 * @return Output Iterator of the last position by advancing.
 */
export declare function sample<Range extends Array<any> | IForwardContainer<any>, OutputIterator extends Writeonly<IForwardIterator<IPointer.ValueType<OutputIterator>, OutputIterator>>>(range: Range, first: OutputIterator, n: number): OutputIterator;
//# sourceMappingURL=random.d.ts.map