//================================================================

/**
 * @packageDocumentation
 * @module std
 */
//================================================================
import { tgamma } from "./gamma";

/**
 * Evaluate the beta function for `x` and `y`.
 *
 * @param x First argument to the beta function.
 * @param y Second argument to the beta function.
 * @return `tgamma(x) * tgamma(y) / tgamma(x + y)`.
 *
 * @reference https://en.wikipedia.org/wiki/Beta_function
 */
export function beta(x: number, y: number): number {
  return (tgamma(x) * tgamma(y)) / tgamma(x + y);
}
