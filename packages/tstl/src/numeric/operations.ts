//================================================================

/**
 * @packageDocumentation
 * @module std
 */
//================================================================
import { IPointer } from "../functional/IPointer";
import { General } from "../internal/functional/General";
import { Writeonly } from "../internal/functional/Writeonly";
import { IForwardIterator } from "../iterator/IForwardIterator";
import { minus, multiplies, plus } from "./operators";

/**
 * Return the nonnegative greatest common divisor of two integers. The result
 * is zero when both operands are zero.
 */
export function gcd(x: number, y: number): number {
  y = y.valueOf(); // `Number` to `number`
  while (y !== 0) [x, y] = [y, x % y];

  return Math.abs(x);
}

/**
 * Return the nonnegative least common multiple of two integers. The result is
 * zero when either operand is zero.
 */
export function lcm(x: number, y: number): number {
  if (x === 0 || y === 0) return 0;
  return Math.abs((x / gcd(x, y)) * y);
}

/* ---------------------------------------------------------
    COMMON ALGORITHMS
--------------------------------------------------------- */
export function iota<
  ForwardIterator extends General<IForwardIterator<number, ForwardIterator>>,
>(first: ForwardIterator, last: ForwardIterator, value: number): void {
  for (; !first.equals(last); first = first.next()) first.value = value++;
}

export function accumulate<
  InputIterator extends General<
    IForwardIterator<IPointer.ValueType<InputIterator>, InputIterator>
  >,
>(
  first: InputIterator,
  last: InputIterator,
  init: IPointer.ValueType<InputIterator>,
  op: Operator<InputIterator, InputIterator> = <any>plus,
): IPointer.ValueType<InputIterator> {
  for (; !first.equals(last); first = first.next())
    init = op(init, first.value);

  return init;
}

export function inner_product<
  InputIterator1 extends General<
    IForwardIterator<IPointer.ValueType<InputIterator1>, InputIterator1>
  >,
  InputIterator2 extends General<
    IForwardIterator<IPointer.ValueType<InputIterator2>, InputIterator2>
  >,
>(
  first1: InputIterator1,
  last1: InputIterator1,
  first2: InputIterator2,
  value: IPointer.ValueType<InputIterator1>,
  adder: Operator<InputIterator1, InputIterator1> = <any>plus,
  multiplier: Operator<InputIterator1, InputIterator2> = <any>multiplies,
): IPointer.ValueType<InputIterator1> {
  for (; !first1.equals(last1); first1 = first1.next()) {
    value = adder(value, multiplier(first1.value, first2.value));
    first2 = first2.next();
  }
  return value;
}

export function adjacent_difference<
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
  subtracter: Operator<InputIterator, InputIterator> = <any>minus,
): OutputIterator {
  if (first.equals(last)) return output;

  // INITIALIZE
  let before: IPointer.ValueType<InputIterator>;
  [first, output, before] = _Initialize<InputIterator, OutputIterator>(
    first,
    output,
  );

  // COMPUTE OPERATIONS
  for (; !first.equals(last); first = first.next()) {
    const current = first.value;
    output.value = subtracter(current, before);
    before = current;
    output = output.next();
  }
  return output;
}

export function partial_sum<
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
  adder: Operator<InputIterator, InputIterator> = <any>plus,
): OutputIterator {
  if (first.equals(last)) return output;

  // INITIALIZE
  let sum: IPointer.ValueType<InputIterator>;
  [first, output, sum] = _Initialize<InputIterator, OutputIterator>(
    first,
    output,
  );

  // COMPUTE OPERATIONS
  for (; !first.equals(last); first = first.next()) {
    sum = adder(sum, first.value);

    output.value = sum;
    output = output.next();
  }
  return output;
}

/* ---------------------------------------------------------
    PREFIX SUMS
--------------------------------------------------------- */
export function inclusive_scan<
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
  adder: Operator<InputIterator, InputIterator> = <any>plus,
  init?: IPointer.ValueType<InputIterator>,
): OutputIterator {
  return transform_inclusive_scan(
    first,
    last,
    <any>output,
    adder,
    (val) => val,
    init,
  );
}

export function exclusive_scan<
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
  init: IPointer.ValueType<InputIterator>,
  op: Operator<InputIterator, InputIterator> = <any>plus,
): OutputIterator {
  return transform_exclusive_scan(
    first,
    last,
    <any>output,
    init,
    op,
    (val) => val,
  );
}

/**
 * Write each prefix reduction of the transformed input. When an initial value
 * is supplied, apply `unary` to it and combine it before the first transformed
 * element. The output can begin at the input's first position.
 */
export function transform_inclusive_scan<
  InputIterator extends Readonly<
    IForwardIterator<IPointer.ValueType<InputIterator>, InputIterator>
  >,
  OutputIterator extends Writeonly<
    IForwardIterator<IPointer.ValueType<OutputIterator>, OutputIterator>
  >,
>(
  first: InputIterator,
  last: InputIterator,
  output: OutputIterator,
  binary: Operator<OutputIterator, OutputIterator>,
  unary: Transformer<InputIterator, OutputIterator>,
  init?: IPointer.ValueType<InputIterator>,
): OutputIterator {
  if (first.equals(last)) return output;

  let sum =
    init === undefined
      ? unary(first.value)
      : binary(unary(init), unary(first.value));
  output.value = sum;
  output = output.next();

  for (first = first.next(); !first.equals(last); first = first.next()) {
    sum = binary(sum, unary(first.value));
    output.value = sum;
    output = output.next();
  }
  return output;
}

/**
 * Write the reduction of `unary(init)` and the transformed input preceding
 * each position. The first output is `unary(init)`. The output can begin at
 * the input's first position.
 */
export function transform_exclusive_scan<
  InputIterator extends Readonly<
    IForwardIterator<IPointer.ValueType<InputIterator>, InputIterator>
  >,
  OutputIterator extends Writeonly<
    IForwardIterator<IPointer.ValueType<OutputIterator>, OutputIterator>
  >,
>(
  first: InputIterator,
  last: InputIterator,
  output: OutputIterator,
  init: IPointer.ValueType<InputIterator>,
  binary: Operator<OutputIterator, OutputIterator>,
  unary: Transformer<InputIterator, OutputIterator>,
): OutputIterator {
  if (first.equals(last)) return output;

  let previous = unary(first.value);
  let sum = unary(init);
  output.value = sum;
  output = output.next();

  for (first = first.next(); !first.equals(last); first = first.next()) {
    sum = binary(sum, previous);
    previous = unary(first.value);
    output.value = sum;
    output = output.next();
  }
  return output;
}

/* ---------------------------------------------------------
    BACK-GROUNDS
--------------------------------------------------------- */
type Operator<
  Iterator1 extends Readonly<
    IForwardIterator<IPointer.ValueType<Iterator1>, Iterator1>
  >,
  Iterator2 extends Readonly<
    IForwardIterator<IPointer.ValueType<Iterator2>, Iterator2>
  >,
> = (
  x: IPointer.ValueType<Iterator1>,
  y: IPointer.ValueType<Iterator2>,
) => IPointer.ValueType<Iterator1>;

type Transformer<
  InputIterator extends Readonly<
    IForwardIterator<IPointer.ValueType<InputIterator>, InputIterator>
  >,
  OutputIterator extends Writeonly<
    IForwardIterator<IPointer.ValueType<OutputIterator>, OutputIterator>
  >,
> = (
  val: IPointer.ValueType<InputIterator>,
) => IPointer.ValueType<OutputIterator>;

function _Initialize<
  InputIterator extends Readonly<
    IForwardIterator<IPointer.ValueType<InputIterator>, InputIterator>
  >,
  OutputIterator extends Writeonly<
    IForwardIterator<IPointer.ValueType<InputIterator>, OutputIterator>
  >,
>(
  first: InputIterator,
  output: OutputIterator,
): [InputIterator, OutputIterator, IPointer.ValueType<InputIterator>] {
  const value = first.value;
  output.value = value;
  return [first.next(), output.next(), value];
}
