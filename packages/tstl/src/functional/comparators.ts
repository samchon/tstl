//================================================================

/**
 * @packageDocumentation
 * @module std
 */
//================================================================
import { IComparable } from "./IComparable";
import { get_uid } from "./uid";

/**
 * Test whether `x` equals `y` using `x.equals(y)` when available, or strict
 * equality otherwise.
 *
 * @param x Left-hand operand.
 * @param y Right-hand operand.
 * @return Whether the two values are equivalent.
 */
export function equal_to<T>(x: T, y: T): boolean {
  // CONVERT TO PRIMITIVE TYPE
  x = x ? ((x as any).valueOf() as T) : x;
  y = y ? ((y as any).valueOf() as T) : y;

  // DO COMPARE
  if (
    x instanceof Object &&
    ((<any>x) as IComparable<T>).equals instanceof Function
  )
    return ((<any>x) as IComparable<T>).equals(y);
  else return x === y;
}

/**
 * Test whether the library's default equality comparison considers the values
 * unequal.
 *
 * @param x Left-hand operand.
 * @param y Right-hand operand.
 * @return Whether the two values are unequal.
 */
export function not_equal_to<T>(x: T, y: T): boolean {
  return !equal_to(x, y);
}

/**
 * Test whether `x` precedes `y` . Use `x.less(y)` when available. Other
 * objects are ordered by their internal identifiers, and primitive values use
 * JavaScript's `<` operator.
 *
 * @param x Left-hand operand.
 * @param y Right-hand operand.
 * @return Whether `x` precedes `y` .
 */
export function less<T>(x: T, y: T): boolean {
  // CONVERT TO PRIMITIVE TYPE
  x = (x as any).valueOf() as T;
  y = (y as any).valueOf() as T;

  // DO COMPARE
  if (x instanceof Object)
    if (((<any>x) as IComparable<T>).less instanceof Function)
      // has less()
      return ((<any>x) as IComparable<T>).less(y);
    else return get_uid(<any>x) < get_uid(<any>y);
  else return x < y;
}

/**
 * Test whether `x` precedes or equals `y` .
 *
 * @param x Left-hand operand.
 * @param y Right-hand operand.
 * @return Whether `x` precedes or equals `y` .
 */
export function less_equal<T>(x: T, y: T): boolean {
  return less(x, y) || equal_to(x, y);
}

/**
 * Test whether `x` is neither less than nor equal to `y` according to the
 * library's default comparisons.
 *
 * @param x Left-hand operand.
 * @param y Right-hand operand.
 * @return Whether both the less-than and equality tests return `false` .
 */
export function greater<T>(x: T, y: T): boolean {
  return !less_equal(x, y);
}

/**
 * Test whether `x` does not precede `y` according to the library's default
 * comparison.
 *
 * @param x Left-hand operand.
 * @param y Right-hand operand.
 * @return Whether the less-than test returns `false` .
 */
export function greater_equal<T>(x: T, y: T): boolean {
  return !less(x, y);
}
