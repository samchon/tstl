//================================================================

/**
 * @packageDocumentation
 * @module std
 */
//================================================================
import { InvalidArgument } from "../exception/InvalidArgument";
import { IPointer } from "../functional/IPointer";
import { IEmpty } from "../internal/container/partial/IEmpty";
import { ISize } from "../internal/container/partial/ISize";
import { IBidirectionalIterator } from "./IBidirectionalIterator";
import { IForwardIterator } from "./IForwardIterator";
import { IRandomAccessIterator } from "./IRandomAccessIterator";

/* =========================================================
    GLOBAL FUNCTIONS
        - ACCESSORS
        - MOVERS
        - FACTORIES
============================================================
    ACCESSORS
--------------------------------------------------------- */
/**
 * Report a container's emptiness. The current native-array branch returns
 * `true` for nonempty arrays.
 *
 * @param source Array or container to inspect.
 * @return For TSTL containers, the result of `source.empty()` . For native
 * arrays, whether `source.length` is nonzero.
 */
export function empty(source: Array<any> | IEmpty): boolean {
  if (source instanceof Array) return source.length !== 0;
  else return source.empty();
}

/**
 * Get the number of elements in an array or container.
 *
 * @param source Array or container to inspect.
 * @return The number of elements.
 */
export function size(source: Array<any> | ISize): number {
  if (source instanceof Array) return source.length;
  else return source.size();
}

/**
 * Measure the distance from `first` to `last` in traversal order. The iterator
 * must be able to reach `last` unless both positions support index-based
 * distance.
 *
 * @param first Starting position.
 * @param last Destination position.
 *
 * @return The number of steps, or a signed difference when using indexed
 * iterators.
 */
export function distance<
  InputIterator extends Readonly<
    IForwardIterator<IPointer.ValueType<InputIterator>, InputIterator>
  >,
>(first: InputIterator, last: InputIterator): number;

export function distance<
  InputIterator extends Readonly<
    IRandomAccessIterator<IPointer.ValueType<InputIterator>, InputIterator>
  >,
>(first: InputIterator, last: InputIterator): number {
  if (first.index instanceof Function) return _Distance_via_index(first, last);

  let ret: number = 0;
  for (; !first.equals(last); first = first.next()) ++ret;

  return ret;
}

function _Distance_via_index<
  RandomAccessIterator extends IRandomAccessIterator<
    IPointer.ValueType<RandomAccessIterator>,
    RandomAccessIterator
  >,
>(first: RandomAccessIterator, last: RandomAccessIterator): number {
  const x: number = first.index();
  const y: number = last.index();

  if ((first as any).base instanceof Function) return x - y;
  else return y - x;
}

/* ---------------------------------------------------------
    ACCESSORS
--------------------------------------------------------- */
/**
 * Return an iterator offset by `n` positions. A negative offset requires
 * backward traversal support.
 *
 * @param it Starting iterator.
 * @param n Signed number of steps in traversal order.
 *
 * @return The iterator reached after moving by `n` .
 */
export function advance<
  InputIterator extends IForwardIterator<
    IPointer.ValueType<InputIterator>,
    InputIterator
  >,
>(it: InputIterator, n: number): InputIterator;

export function advance<
  InputIterator extends IRandomAccessIterator<
    IPointer.ValueType<InputIterator>,
    InputIterator
  >,
>(it: InputIterator, n: number): InputIterator {
  if (n === 0) return it;
  else if (it.advance instanceof Function) return it.advance(n);

  let stepper: (it: InputIterator) => InputIterator;
  if (n < 0) {
    if (!(it.prev instanceof Function))
      throw new InvalidArgument(
        "Error on std.advance(): parametric iterator is not a bi-directional iterator, thus advancing to negative direction is not possible.",
      );

    stepper = (it) => it.prev();
    n = -n;
  } else stepper = (it) => it.next();

  while (n-- > 0) it = stepper(it);
  return it;
}

/**
 * Return an iterator `n` positions before `it` .
 *
 * @param it Starting iterator.
 * @param n Number of steps backward. Defaults to `1` .
 * @return The resulting iterator.
 */
export function prev<
  BidirectionalIterator extends IBidirectionalIterator<
    IPointer.ValueType<BidirectionalIterator>,
    BidirectionalIterator
  >,
>(it: BidirectionalIterator, n: number = 1): BidirectionalIterator {
  if (n === 1) return it.prev();
  else return advance(it, -n);
}

/**
 * Return an iterator `n` positions after `it` .
 *
 * @param it Starting iterator.
 * @param n Number of steps forward. Defaults to `1` .
 * @return The resulting iterator.
 */
export function next<
  ForwardIterator extends IForwardIterator<
    IPointer.ValueType<ForwardIterator>,
    ForwardIterator
  >,
>(it: ForwardIterator, n: number = 1): ForwardIterator {
  if (n === 1) return it.next();
  else return advance(it, n);
}
