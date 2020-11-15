/**
 * @packageDocumentation
 * @module std
 */
import { IForwardIterator } from "../iterator/IForwardIterator";
import { IBidirectionalIterator } from "../iterator/IBidirectionalIterator";
import { IPointer } from "../functional/IPointer";
import { General } from "../internal/functional/General";
import { Pair } from "../utility/Pair";
import { UnaryPredicator } from "../internal/functional/UnaryPredicator";
import { Writeonly } from "../internal/functional/Writeonly";
/**
 * Test whether a range is partitioned.
 *
 * @param first Forward iterator of the first position.
 * @param last Forward iterator of the last position.
 * @param pred An unary function predicates partition. Returns `true`, if an element belongs to the first section, otherwise `false` which means the element belongs to the second section.
 *
 * @return Whether the range is partition or not.
 */
export declare function is_partitioned<ForwardIterator extends Readonly<IForwardIterator<IPointer.ValueType<ForwardIterator>, ForwardIterator>>>(first: ForwardIterator, last: ForwardIterator, pred: UnaryPredicator<IPointer.ValueType<ForwardIterator>>): boolean;
/**
 * Get partition point.
 *
 * @param first Forward iterator of the first position.
 * @param last Forward iterator of the last position.
 * @param pred An unary function predicates partition. Returns `true`, if an element belongs to the first section, otherwise `false` which means the element belongs to the second section.
 *
 * @return Iterator to the first element of the second section.
 */
export declare function partition_point<ForwardIterator extends Readonly<IForwardIterator<IPointer.ValueType<ForwardIterator>, ForwardIterator>>>(first: ForwardIterator, last: ForwardIterator, pred: UnaryPredicator<IPointer.ValueType<ForwardIterator>>): ForwardIterator;
/**
 * Partition a range into two sections.
 *
 * @param first Bidirectional iterator of the first position.
 * @param last Bidirectional iterator of the last position.
 * @param pred An unary function predicates partition. Returns `true`, if an element belongs to the first section, otherwise `false` which means the element belongs to the second section.
 *
 * @return Iterator to the first element of the second section.
 */
export declare function partition<BidirectionalIterator extends General<IBidirectionalIterator<IPointer.ValueType<BidirectionalIterator>, BidirectionalIterator>>>(first: BidirectionalIterator, last: BidirectionalIterator, pred: UnaryPredicator<IPointer.ValueType<BidirectionalIterator>>): BidirectionalIterator;
/**
 * Partition a range into two sections with stable ordering.
 *
 * @param first Bidirectional iterator of the first position.
 * @param last Bidirectional iterator of the last position.
 * @param pred An unary function predicates partition. Returns `true`, if an element belongs to the first section, otherwise `false` which means the element belongs to the second section.
 *
 * @return Iterator to the first element of the second section.
 */
export declare function stable_partition<BidirectionalIterator extends General<IBidirectionalIterator<IPointer.ValueType<BidirectionalIterator>, BidirectionalIterator>>>(first: BidirectionalIterator, last: BidirectionalIterator, pred: UnaryPredicator<IPointer.ValueType<BidirectionalIterator>>): BidirectionalIterator;
/**
 * Partition a range into two outputs.
 *
 * @param first Bidirectional iterator of the first position.
 * @param last Bidirectional iterator of the last position.
 * @param output_true Output iterator to the first position for the first section.
 * @param output_false Output iterator to the first position for the second section.
 * @param pred An unary function predicates partition. Returns `true`, if an element belongs to the first section, otherwise `false` which means the element belongs to the second section.
 *
 * @return Iterator to the first element of the second section.
 */
export declare function partition_copy<InputIterator extends Readonly<IForwardIterator<IPointer.ValueType<InputIterator>, InputIterator>>, OutputIterator1 extends Writeonly<IForwardIterator<IPointer.ValueType<InputIterator>, OutputIterator1>>, OutputIterator2 extends Writeonly<IForwardIterator<IPointer.ValueType<InputIterator>, OutputIterator2>>>(first: InputIterator, last: InputIterator, output_true: OutputIterator1, output_false: OutputIterator2, pred: UnaryPredicator<IPointer.ValueType<InputIterator>>): Pair<OutputIterator1, OutputIterator2>;
//# sourceMappingURL=partition.d.ts.map