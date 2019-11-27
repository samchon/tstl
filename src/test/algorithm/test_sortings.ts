import * as std from "../../index";

import { Cube } from "../internal/Cube";

export function test_sortings(): void
{
    _Test_atomic_sorting();
    _Test_object_sorting();
}

function _Test_atomic_sorting(): void
{
    let array: std.Vector<number> = new std.Vector<number>();
    for (let i: number = 1; i <= 15; ++i)
        for (let j: number = 0; j < 3; ++j)
            array.push_back(i);

    std.shuffle(std.begin(array), std.end(array));
    std.stable_sort(std.begin(array), std.end(array));
    
    if (std.is_sorted(std.begin(array), std.end(array)) === false)
        throw new std.DomainError("Wrong sorting in atoms.");
}

function _Test_object_sorting(): void
{
    //----
    // CONSTRUCT ITEMS
    //----
    let cubes: std.Deque<Cube> = new std.Deque<Cube>();
    for (let i: number = 0; i < 1000; ++i)
        cubes.push_back(new Cube());

    //----
    // SORT BY Cube.less
    //----
    // DO SORT
    std.sort(cubes.begin(), cubes.end());
    
    // VALIDATION
    if (std.is_sorted(cubes.begin(), cubes.end()) === false)
        throw new std.DomainError("Wrong sorting in objects.");

    //----
    // SORT BY inline function
    //----
    // DECLARE INLINE FUNCTION
    let inline_function = (cx: Cube, cy: Cube) =>
    {
        if (cx.x !== cy.x) return cx.x < cy.x;
        else if (cx.y !== cy.y) return cx.y < cy.y;
        else return cx.z < cy.z;
    };

    // DO SORT
    std.sort(cubes.begin(), cubes.end(), inline_function);

    // VALIDATION
    if (std.is_sorted(cubes.begin(), cubes.end(), inline_function) === false)
        throw new std.DomainError("Wrong sorting in objects.");
}