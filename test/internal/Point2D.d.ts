import * as std from "../../index";
export declare class Point2D implements Pick<std.IComparable<Point2D>, "equals">, Pick<std.IComputable<number | Point2D, Point2D>, "plus" | "minus" | "multiplies"> {
    x: number;
    y: number;
    constructor(x?: number, y?: number);
    equals(obj: Point2D): boolean;
    plus(val: number | Point2D): Point2D;
    minus(val: number | Point2D): Point2D;
    multiplies(val: number | Point2D): Point2D;
}
//# sourceMappingURL=Point2D.d.ts.map