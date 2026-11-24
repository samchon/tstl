//================================================================

/**
 * @packageDocumentation
 * @module std
 */
//================================================================
import { tgamma } from "./gamma";

/**
 * Evaluate the beta function for `x` and `y` .
 *
 * @reference https://en.wikipedia.org/wiki/Beta_function
 */
export function beta(x: number, y: number): number {
  return (tgamma(x) * tgamma(y)) / tgamma(x + y);
}
