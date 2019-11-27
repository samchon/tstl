import * as std from "../../index";

export function test_heaps(): void
{
    for (let i: number = 0; i < 100; ++i)
    {
        let elems: std.Vector<number> = _Create_elements();
        std.make_heap(elems.begin(), elems.end());

        if (std.is_heap(elems.begin(), elems.end()) === false)
            throw new std.DomainError("Error on std.push_heap() or std.is_heap().");

        std.sort_heap(elems.begin(), elems.end());
        if (std.is_sorted(elems.begin(), elems.end()) === false)
            throw new std.DomainError("Error on std.pop_heap().");
    }

    _Test_c_plus_plus();
    _Test_cpp_reference();
}

function _Create_elements(): std.Vector<number>
{
    let ret: std.Vector<number> = new std.Vector();
    let size: number = std.randint(20, 80);

    for (let i: number = 0; i < size; ++i)
        ret.push_back(Math.random() * 100.0);

    return ret;
}

function _Test_c_plus_plus(): void
{
    let v: std.Vector<number> = new std.Vector([10, 20, 30, 5, 15]);

    std.make_heap(v.begin(), v.end());
    if (v.front() !== 30 || std.is_heap(v.begin(), v.end()) === false)
        throw new std.DomainError("Error on std.make_heap()");

    std.pop_heap(v.begin(), v.end());
    v.pop_back();
    if (v.front() !== 20)
        throw new std.DomainError("Error on std.pop_heap()");

    v.push_back(99);
    std.push_heap(v.begin(), v.end());
    if (v.front() !== 99)
        throw new std.DomainError("Error on std.push_heap()");

    std.sort_heap(v.begin(), v.end());
    if (std.is_sorted(v.begin(), v.end()) === false)
        throw new std.DomainError("Error on std.sort_heap()");
}

function _Test_cpp_reference(): void
{
    let v: std.Vector<number> = new std.Vector();
    v.push(3, 1, 4, 1, 5, 9);

    std.make_heap(v.begin(), v.end());
    if (std.equal(v.begin(), v.end(), std.begin(std.Vector.wrap([9, 5, 4, 1, 1, 3]))) === false)
        throw new std.DomainError("Error on std.make_heap()");

    std.pop_heap(v.begin(), v.end());
    if (v.back() !== 9)
        throw new std.DomainError("Error on std.pop_heap()");

    v.pop_back();
    if (std.equal(v.begin(), v.end(), std.begin(std.Vector.wrap([5, 3, 4, 1, 1]))) === false)
        throw new std.DomainError("Error on std.pop_heap() & Vector.pop()");
}