/**
 * @packageDocumentation
 * @module std
 */
import { IBidirectionalContainer } from "../ranges/container/IBidirectionalContainer";
import { IReversableIterator } from "./IReversableIterator";
import { IReverseIterator } from "./IReverseIterator";
import { IPointer } from "../functional/IPointer";
import { IForwardContainer } from "../ranges/container/IForwardContainer";
import { IInsert } from "../internal/container/partial/IInsert";
import { IPushFront } from "../internal/container/partial/IPushFront";
import { IPushBack } from "../internal/container/partial/IPushBack";
import { InsertIterator } from "./InsertIterator";
import { FrontInsertIterator } from "./FrontInsertIterator";
import { BackInsertIterator } from "./BackInsertIterator";
import { IForwardIterator } from "./IForwardIterator";
/**
 * Iterator to the first element.
 *
 * @param container Target container.
 * @return Iterator to the first element.
 */
export declare function begin<Container extends Array<any> | IForwardContainer<any>>(container: Container): IForwardContainer.IteratorType<Container>;
/**
 * Iterator to the end.
 *
 * @param container Target container.
 * @return Iterator to the end.
 */
export declare function end<Container extends Array<any> | IForwardContainer<any>>(container: Container): IForwardContainer.IteratorType<Container>;
/**
 * Get reverse iterator to the first element in reverse.
 *
 * @param container Target container.
 * @return The reverse iterator to the first.
 */
export declare function rbegin<Container extends Array<any> | IBidirectionalContainer<any, any>>(container: Container): IBidirectionalContainer.ReverseIteratorType<Container>;
/**
 * Get reverse iterator to the reverse end.
 *
 * @param container Target container.
 * @return The reverse iterator to the end.
 */
export declare function rend<Container extends Array<any> | IBidirectionalContainer<any, any>>(container: Container): IBidirectionalContainer.ReverseIteratorType<Container>;
/**
 * Construct reverse iterator.
 *
 * @param it Target iterator that reversable.
 * @return The reverse iterator object.
 */
export declare function make_reverse_iterator<IteratorT extends IReversableIterator<IPointer.ValueType<IteratorT>, IteratorT, ReverseT>, ReverseT extends IReverseIterator<IPointer.ValueType<IteratorT>, IteratorT, ReverseT>>(it: IteratorT): ReverseT;
/**
 * Construct insert iterator.
 *
 * @param container Target container.
 * @param it Iterator to the first insertion position.
 * @return The {@link InsertIterator insert iterator} object.
 */
export declare function inserter<Container extends IInsert<Iterator>, Iterator extends IForwardIterator<IPointer.ValueType<Iterator>, Iterator>>(container: Container, it: Iterator): InsertIterator<Container, Iterator>;
/**
 * Construct front insert iterator.
 *
 * @param source Target container.
 * @return The {@link FrontInsertIterator front insert iterator} object.
 */
export declare function front_inserter<Source extends IPushFront<FrontInsertIterator.ValueType<Source>>>(source: Source): FrontInsertIterator<Source>;
/**
 * Construct back insert iterator.
 *
 * @param source Target container.
 * @return The {@link back insert iterator} object.
 */
export declare function back_inserter<Source extends Array<any> | IPushBack<any>>(source: Source): BackInsertIterator<BackInsertIterator.SourceType<Source>>;
//# sourceMappingURL=factory.d.ts.map