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
 * Generate random integer.
 *
 * @param x Minimum value.
 * @param y Maximum value.
 *
 * @return A random integer between [x, y].
 */
export function randint(x: number, y: number): number {
  const rand: number = Math.random() * (y - x + 1);
  return Math.floor(rand) + x;
}

/**
 * Sample without replacement in the input's order.
 *
 * @param first Input iterator of the first position.
 * @param last Input iterator of the last position.
 * @param output Output iterator of the first position.
 * @param n Number of elements to pick up.
 *
 * @return Output Iterator of the last position by advancing.
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
