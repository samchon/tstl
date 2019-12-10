import std = require("../..");

export function test_iterations(): void
{
    let elements: number[] = [];
    let x: std.Vector<number> = new std.Vector(elements);
    let y: std.Deque<number> = new std.Deque(elements);

    std.ranges.mismatch(x, y);
}