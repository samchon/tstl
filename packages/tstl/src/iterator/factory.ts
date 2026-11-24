//================================================================

/**
 * @packageDocumentation
 * @module std
 */
//================================================================
import { Vector } from "../container/Vector";
import { IPointer } from "../functional/IPointer";
import { IInsert } from "../internal/container/partial/IInsert";
import { IPushBack } from "../internal/container/partial/IPushBack";
import { IPushFront } from "../internal/container/partial/IPushFront";
import { IBidirectionalContainer } from "../ranges/container/IBidirectionalContainer";
import { IForwardContainer } from "../ranges/container/IForwardContainer";
import { BackInsertIterator } from "./BackInsertIterator";
import { FrontInsertIterator } from "./FrontInsertIterator";
import { IForwardIterator } from "./IForwardIterator";
import { IReversableIterator } from "./IReversableIterator";
import { IReverseIterator } from "./IReverseIterator";
import { InsertIterator } from "./InsertIterator";

/* ---------------------------------------------------------
    ITERATORS
--------------------------------------------------------- */
// BEGIN & END
//----
/**
 * Get the start of an array or container range.
 *
 * @param container Array or container to traverse.
 * @return The first iterator, equal to the end iterator when the range is
 * empty.
 */
export function begin<Container extends Array<any> | IForwardContainer<any>>(
  container: Container,
): IForwardContainer.IteratorType<Container>;

export function begin<T>(container: Array<T> | Vector<T>): Vector.Iterator<T> {
  if (container instanceof Array) container = Vector.wrap(container);
  return container.begin();
}

/**
 * Get the past-the-end iterator for an array or container.
 *
 * @param container Array or container to traverse.
 * @return The exclusive end of the range.
 */
export function end<Container extends Array<any> | IForwardContainer<any>>(
  container: Container,
): IForwardContainer.IteratorType<Container>;

export function end<T>(container: Array<T> | Vector<T>): Vector.Iterator<T> {
  if (container instanceof Array) container = Vector.wrap(container);
  return container.end();
}

/**
 * Get the start of reverse traversal.
 *
 * @param container Array or reversible container to traverse.
 * @return The reverse iterator to the last element, or the reverse end for an
 * empty range.
 */
export function rbegin<
  Container extends Array<any> | IBidirectionalContainer<any, any>,
>(container: Container): IBidirectionalContainer.ReverseIteratorType<Container>;

export function rbegin<T>(
  container: Array<T> | Vector<T>,
): Vector.ReverseIterator<T> {
  if (container instanceof Array) container = Vector.wrap(container);
  return container.rbegin();
}

/**
 * Get the past-the-end iterator for reverse traversal.
 *
 * @param container Array or reversible container to traverse.
 * @return The exclusive end of the reverse range.
 */
export function rend<
  Container extends Array<any> | IBidirectionalContainer<any, any>,
>(container: Container): IBidirectionalContainer.ReverseIteratorType<Container>;

export function rend<T>(
  container: Array<T> | Vector<T>,
): Vector.ReverseIterator<T> {
  if (container instanceof Array) container = Vector.wrap(container);
  return container.rend();
}

/**
 * Construct a reverse iterator from its underlying forward position.
 *
 * @param it Forward iterator that supplies a reverse iterator.
 * @return A reverse iterator with `it` as its base.
 */
export function make_reverse_iterator<
  IteratorT extends IReversableIterator<
    IPointer.ValueType<IteratorT>,
    IteratorT,
    ReverseT
  >,
  ReverseT extends IReverseIterator<
    IPointer.ValueType<IteratorT>,
    IteratorT,
    ReverseT
  >,
>(it: IteratorT): ReverseT {
  return it.reverse();
}

/* ---------------------------------------------------------
    INSERTERS
--------------------------------------------------------- */
/**
 * Create an output iterator that inserts assigned values at the given
 * position.
 *
 * @param container Container receiving the inserted values.
 * @param it Position before which to insert the first value.
 * @return An insertion iterator for the container.
 */
export function inserter<
  Container extends IInsert<Iterator>,
  Iterator extends IForwardIterator<IPointer.ValueType<Iterator>, Iterator>,
>(container: Container, it: Iterator): InsertIterator<Container, Iterator> {
  return new InsertIterator(container, it);
}

/**
 * Create an output iterator that prepends each assigned value.
 *
 * @param source Container receiving the prepended values.
 * @return A front insertion iterator for the destination.
 */
export function front_inserter<
  Source extends IPushFront<FrontInsertIterator.ValueType<Source>>,
>(source: Source): FrontInsertIterator<Source> {
  return new FrontInsertIterator(source);
}

/**
 * Create an output iterator that appends each assigned value.
 *
 * @param source Array or container receiving the appended values.
 * @return A back insertion iterator for the destination.
 */
export function back_inserter<Source extends Array<any> | IPushBack<any>>(
  source: Source,
): BackInsertIterator<BackInsertIterator.SourceType<Source>>;

export function back_inserter<T>(
  source: Array<T> | Vector<T>,
): BackInsertIterator<Vector<T>> {
  if (source instanceof Array) source = Vector.wrap(source);
  return new BackInsertIterator(source);
}
