//================================================================

/**
 * @packageDocumentation
 * @module std
 */
//================================================================
import { IPointer } from "../functional/IPointer";
import { Writeonly } from "../internal/functional/Writeonly";
import { IForwardIterator } from "../iterator/IForwardIterator";
import { advance, distance } from "../iterator/global";

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
  const length = distance(first, last);
  const remaining: number[] = [];
  for (let i = 0; i < length; ++i) remaining.push(i);

  const selected: number[] = [];
  n = Math.min(n, length);
  for (let i: number = 0; i < n; ++i) {
    const index = randint(0, remaining.length - 1);
    selected.push(remaining.splice(index, 1)[0]);
  }
  selected.sort((a, b) => a - b);

  let offset = 0;
  for (const index of selected) {
    first = advance(first, index - offset);
    offset = index;
    output.value = first.value;
    output = output.next();
  }
  return output;
}
