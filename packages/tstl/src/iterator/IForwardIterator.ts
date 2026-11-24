//================================================================

/**
 * @packageDocumentation
 * @module std
 */
//================================================================
import { IComparable } from "../functional/IComparable";
import { IPointer } from "../functional/IPointer";

/**
 * Iterator that advances through a range one position at a time.
 *
 * @author Jeongho Nam - https://github.com/samchon
 */
export interface IForwardIterator<
  T,
  Iterator extends IForwardIterator<T, Iterator> = IForwardIterator<T, any>,
> extends IPointer<T>,
    Pick<IComparable<Iterator>, "equals"> {
  /**
   * Return an iterator one position forward without changing this iterator.
   *
   * @return The following iterator.
   */
  next(): Iterator;

  /**
   * Test whether two iterators designate the same position.
   *
   * @param obj Iterator to compare with this position.
   * @return Whether the iterators designate the same position.
   */
  equals(obj: Iterator): boolean;
}
