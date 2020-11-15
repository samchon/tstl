export declare class Cube {
    width: number;
    height: number;
    length: number;
    x: number;
    y: number;
    z: number;
    constructor();
    constructor(width: number, height: number, length: number);
    constructor(width: number, height: number, length: number, x: number, y: number, z: number);
    get volume(): number;
    less(obj: Cube): boolean;
}
export declare namespace Cube {
    function compare_volume(x: Cube, y: Cube): boolean;
    function compare_position(left: Cube, right: Cube): boolean;
}
//# sourceMappingURL=Cube.d.ts.map