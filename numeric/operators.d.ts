/**
 * @packageDocumentation
 * @module std
 */
import { INegatable } from "./INegatable";
import { IComputable } from "./IComputable";
declare type PlusParam<Y, Ret> = number | string | Pick<IComputable<Y, Ret>, "plus">;
declare type Param<Y, Ret, Key extends keyof IComputable<Y, Ret>> = number | Pick<IComputable<Y, Ret>, Key>;
export declare function plus<X extends PlusParam<Y, Ret>, Y = X, Ret = X>(x: X, y: Y): Ret;
export declare function minus<X extends Param<Y, Ret, "minus">, Y = X, Ret = X>(x: X, y: Y): Ret;
export declare function negate<X extends number | INegatable<Ret>, Ret = X>(x: X): Ret;
export declare function multiplies<X extends Param<Y, Ret, "multiplies">, Y = X, Ret = X>(x: X, y: Y): Ret;
export declare function divides<X extends Param<Y, Ret, "divides">, Y = X, Ret = X>(x: X, y: Y): Ret;
export declare function modules<X extends Param<Y, Ret, "modules">, Y = X, Ret = X>(x: X, y: Y): Ret;
export {};
//# sourceMappingURL=operators.d.ts.map