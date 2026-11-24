//================================================================

/**
 * @packageDocumentation
 * @module std
 */
//================================================================
import { IPointer } from "../functional/IPointer";
import { Writeonly } from "../internal/functional/Writeonly";
import { IForwardIterator } from "../iterator/IForwardIterator";
import { distance } from "../iterator/global";

/**
 * Draw a random integer between integer bounds `x` and `y`, inclusive.
 *
 * @param x Minimum value.
 * @param y Maximum value.
 *
 * @return An integer in the inclusive interval.
 */
export function randint(x: number, y: number): number {
  const rand: number = Math.random() * (y - x + 1);
  return Math.floor(rand) + x;
}

/**
 * Select up to `n` elements without replacement and write them in input order.
 * The destination must be outside the input range. Runs in linear time with
 * constant extra storage.
 *
 * @param first Start of the range.
 * @param last Exclusive end of the range.
 * @param output Iterator to the start of the destination.
 * @param n Maximum number of elements to select.
 *
 * @return The iterator immediately after the last value written.
 */
export function sample<
  InputIterator extends Readonly<
    IForwardIterator<IPointer.ValueType<InputIterator>, InputIterator>
  >,
  OutputIterator extends Writeonly<
    IForwardIterator<IPointer.ValueType<InputIterator>, OutputIterator>
  >,
>(
  first: InputIterator,
  last: InputIterator,
  output: OutputIterator,
  n: number,
): OutputIterator {
  if (!(n > 0)) return output;

  let remaining = distance(first, last);
  let needed = Math.min(Math.ceil(n), remaining);
  for (; needed > 0; first = first.next(), --remaining) {
    // Every remaining element has the same chance of filling one of the open slots.
    if (needed === remaining || randint(0, remaining - 1) < needed) {
      output.value = first.value;
      output = output.next();
      --needed;
    }
  }
  return output;
}
