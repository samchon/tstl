import { IBidirectionalContainer } from "../container/IBidirectionalContainer";
import { IForwardContainer } from "../container/IForwardContainer";
import { IForwardIterator } from "../../iterator/IForwardIterator";
import { Pair } from "../../utility/Pair";
import { UnaryPredicator } from "../../internal/functional/UnaryPredicator";
import { Writeonly } from "../../internal/functional/Writeonly";
/**
 * Test whether a range is partitioned.
 *
 * @param range An iterable ranged container.
 * @param pred An unary function predicates partition. Returns `true`, if an element belongs to the first section, otherwise `false` which means the element belongs to the second section.
 *
 * @return Whether the range is partition or not.
 */
export declare function is_partitioned<Range extends Array<any> | IForwardContainer<any>>(range: Range, pred: UnaryPredicator<IForwardContainer.ValueType<Range>>): boolean;
/**
 * Get partition point.
 *
 * @param range An iterable ranged container.
 * @param pred An unary function predicates partition. Returns `true`, if an element belongs to the first section, otherwise `false` which means the element belongs to the second section.
 *
 * @return Iterator to the first element of the second section.
 */
export declare function partition_point<Range extends Array<any> | IForwardContainer<any>>(range: Range, pred: UnaryPredicator<IForwardContainer.ValueType<Range>>): IForwardContainer.IteratorType<Range>;
/**
 * Partition a range into two sections.
 *
 * @param range An iterable ranged container.
 * @param pred An unary function predicates partition. Returns `true`, if an element belongs to the first section, otherwise `false` which means the element belongs to the second section.
 *
 * @return Iterator to the first element of the second section.
 */
export declare function partition<Range extends Array<any> | IBidirectionalContainer<any, any>>(range: Range, pred: UnaryPredicator<IForwardContainer.ValueType<Range>>): IBidirectionalContainer.IteratorType<Range>;
/**
 * Partition a range into two sections with stable ordering.
 *
 * @param range An iterable ranged container.
 * @param pred An unary function predicates partition. Returns `true`, if an element belongs to the first section, otherwise `false` which means the element belongs to the second section.
 *
 * @return Iterator to the first element of the second section.
 */
export declare function stable_partition<Range extends Array<any> | IBidirectionalContainer<any, any>>(range: Range, pred: UnaryPredicator<IForwardContainer.ValueType<Range>>): IBidirectionalContainer.IteratorType<Range>;
/**
 * Partition a range into two outputs.
 *
 * @param range An iterable ranged container.
 * @param output_true Output iterator to the first position for the first section.
 * @param output_false Output iterator to the first position for the second section.
 * @param pred An unary function predicates partition. Returns `true`, if an element belongs to the first section, otherwise `false` which means the element belongs to the second section.
 *
 * @return Iterator to the first element of the second section.
 */
export declare function partition_copy<Range extends Array<any> | IForwardContainer<any>, OutputIterator1 extends Writeonly<IForwardIterator<IForwardContainer.ValueType<Range>, OutputIterator1>>, OutputIterator2 extends Writeonly<IForwardIterator<IForwardContainer.ValueType<Range>, OutputIterator2>>>(range: Range, output_true: OutputIterator1, output_false: OutputIterator2, pred: UnaryPredicator<IForwardContainer.ValueType<Range>>): Pair<OutputIterator1, OutputIterator2>;
//# sourceMappingURL=partition.d.ts.map