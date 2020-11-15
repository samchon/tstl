/**
 * @packageDocumentation
 * @module std
 */
import { IPair } from "./IPair";
import { IComparable } from "../functional/IComparable";
/**
 * Pair of two elements.
 *
 * @author Jeongho Nam - https://github.com/samchon
 */
export declare class Pair<First, Second> implements IPair<First, Second>, IComparable<Pair<First, Second>> {
    /**
     * @inheritDoc
     */
    first: First;
    /**
     * @inheritDoc
     */
    second: Second;
    /**
     * Initializer Constructor.
     *
     * @param first The first element.
     * @param second The second element.
     */
    constructor(first: First, second: Second);
    /**
     * @inheritDoc
     */
    equals<U1 extends First, U2 extends Second>(pair: Pair<U1, U2>): boolean;
    /**
     * @inheritDoc
     */
    less<U1 extends First, U2 extends Second>(pair: Pair<U1, U2>): boolean;
    /**
     * @inheritDoc
     */
    hashCode(): number;
}
/**
 * Create a {@link Pair}.
 *
 * @param first The 1st element.
 * @param second The 2nd element.
 *
 * @return A {@link Pair} object.
 */
export declare function make_pair<First, Second>(first: First, second: Second): Pair<First, Second>;
//# sourceMappingURL=Pair.d.ts.map