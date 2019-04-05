import * as std from "../../index";

import { Atomic } from "../structures/Atomic";

export function test_associatives(): void
{
    //----
    // SET-CONTAINERS
    //----
    // UNIQUE-SETS
    _Test_unique_set(new std.HashSet<Atomic<number>>());
    _Test_unique_set(new std.TreeSet<Atomic<number>>());
    _Test_unique_set(new std.FlatSet<Atomic<number>>());

    // MULTI-SETS
    _Test_multi_set(new std.HashMultiSet<Atomic<number>>());
    _Test_multi_set(new std.TreeMultiSet<Atomic<number>>());
    _Test_multi_set(new std.FlatMultiSet<Atomic<number>>());

    //----
    // MAP-CONTAINERS
    //----
    // UNIQUE-MAPS
    _Test_unique_map(new std.HashMap<Atomic<string>, number>());
    _Test_unique_map(new std.TreeMap<Atomic<string>, number>());
    _Test_unique_map(new std.FlatMap<Atomic<string>, number>());

    // MULTI0-MAPS
    _Test_multi_map(new std.HashMultiMap<Atomic<string>, number>());
    _Test_multi_map(new std.TreeMultiMap<Atomic<string>, number>());
    _Test_multi_map(new std.FlatMultiMap<Atomic<string>, number>());
}

/* ---------------------------------------------------------
    SET CONTAINERS
--------------------------------------------------------- */
function _Test_unique_set<
        Unique extends boolean, 
        Source extends std.base.SetContainer<Atomic<number>, Unique, Source, IteratorT, ReverseT>,
        IteratorT extends std.base.ISetIterator<Atomic<number>, Unique, Source, IteratorT, ReverseT>,
        ReverseT extends std.base.ISetReverseIterator<Atomic<number>, Unique, Source, IteratorT, ReverseT>>
    (set: Source): void
{
    // CONSTRUCT ELEMENTS
    _Construct_set(set);

    // DUPLICATED ?
    if (set.size() !== 11)
        throw new std.LengthError("Wrong number of elements.");

    let sum: number = 0;
    for (let elem of set)
    {
        // TO VALIDATE
        sum += elem.value;

        // RE-FIND THE ELEMENT BY ITS KEY WITH FIND() FUNCTION.
        let it = set.find(elem);
        if (it.equals(set.end()) === true || it.value.equals(elem) === false)
            throw new std.OutOfRange("Failed to find the element by find() method.");
    }

    // RE-VALIDATE UNIQUENESS & RIGHT INSERTION
    if (sum !== 55)
        throw new std.LogicError("Elements are not fully inserted.");
}

function _Test_multi_set<
        Unique extends boolean, 
        Source extends std.base.SetContainer<Atomic<number>, Unique, Source, IteratorT, ReverseT>,
        IteratorT extends std.base.ISetIterator<Atomic<number>, Unique, Source, IteratorT, ReverseT>,
        ReverseT extends std.base.ISetReverseIterator<Atomic<number>, Unique, Source, IteratorT, ReverseT>>
    (set: Source): void
{
    // CONSTRUCT ELEMENTS
    _Construct_set(set);

    // DUPLICATED ?
    if (set.size() !== 3 * 11)
        throw new std.LengthError("Wrong number of elements.");

    let sum: number = 0;
    for (let elem of set)
    {
        // TO VALIDATE
        sum += elem.value;

        // RE-FIND THE ELEMENT BY ITS KEY WITH FIND() & COUNT() FUNCTION.
        let it = set.find(elem);
        let count = set.count(elem);

        if (it.equals(set.end()) === true || it.value.equals(elem) === false)
            throw new std.OutOfRange("Failed to find the element by find() method.");
        else if (count !== 3)
            throw new std.LengthError("Wrong number of duplicated items.");
    }

    // RE-VALIDATE DUPLICATION & RIGHT INSERTION
    if (sum !== 3 * 55)
        throw new std.LogicError("Elements are not fully inserted.");
}

function _Construct_set<
        Unique extends boolean, 
        Source extends std.base.SetContainer<Atomic<number>, Unique, Source, IteratorT, ReverseT>,
        IteratorT extends std.base.ISetIterator<Atomic<number>, Unique, Source, IteratorT, ReverseT>,
        ReverseT extends std.base.ISetReverseIterator<Atomic<number>, Unique, Source, IteratorT, ReverseT>>
    (set: Source): void
{
    // INSERT ELEMENTS
    for (let i: number = 0; i <= 10; ++i)
        for (let j: number = 0; j < 3; ++j)
            set.push(new Atomic<number>(i));

    // TEST SEQUENCE
    let vec = new std.Vector<Atomic<number>>(set.begin(), set.end());
    if (std.is_sorted(vec.begin(), vec.end()) === false)
        throw new std.LogicError("Elements are not correctly inserted.");
}

/* ---------------------------------------------------------
    MAP CONTAINERS
--------------------------------------------------------- */
function _Test_unique_map<
        Source extends std.base.UniqueMap<Atomic<string>, number, Source, IteratorT, ReverseT>,
        IteratorT extends std.base.IMapIterator<Atomic<string>, number, true, Source, IteratorT, ReverseT>,
        ReverseT extends std.base.IMapReverseIterator<Atomic<string>, number, true, Source, IteratorT, ReverseT>>
    (map: Source): void
{
    // CONSTRUCT ELEMENTS
    _Construct_map(map);

    // DUPLICATED ?
    if (map.size() !== 11)
        throw new std.LengthError("Wrong number of elements.");

    let sum: number = 0;
    for (let pair of map)
    {
        // TO VALIDATE
        sum += pair.second;

        // RE-FIND THE ELEMENT BY ITS KEY WITH FIND() FUNCTION.
        let it = map.find(pair.first);
        if (it.equals(map.end()) === true || it.first.equals(pair.first) === false)
            throw new std.OutOfRange("Failed to find the element by find() method.");
    }

    // RE-VALIDATE UNIQUENESS & RIGHT INSERTION
    if (sum !== 55)
        throw new std.LogicError("Elements are not fully inserted.");
}

function _Test_multi_map<
        Source extends std.base.MultiMap<Atomic<string>, number, Source, IteratorT, ReverseT>,
        IteratorT extends std.base.IMapIterator<Atomic<string>, number, false, Source, IteratorT, ReverseT>,
        ReverseT extends std.base.IMapReverseIterator<Atomic<string>, number, false, Source, IteratorT, ReverseT>>
    (map: Source): void
{
    // CONSTRUCT ELEMENTS
    _Construct_map(map);

    // DUPLICATED ?
    if (map.size() !== 3 * 11)
        throw new std.LengthError("Wrong number of elements.");

    let sum: number = 0;
    for (let pair of map)
    {
        // TO VALIDATE
        sum += pair.second;

        // RE-FIND THE ELEMENT BY ITS KEY WITH FIND() & COUNT() FUNCTION.
        let it = map.find(pair.first);
        let count = map.count(pair.first);

        if (it.equals(map.end()) === true || it.first.equals(pair.first) === false)
            throw new std.OutOfRange("Failed to find the element by find() method.");
        else if (count !== 3)
            throw new std.LengthError("Wrong number of duplicated items.");
    }

    // RE-VALIDATE UNIQUENESS & RIGHT INSERTION
    if (sum !== 3 * 55)
        throw new std.LogicError("Elements are not fully inserted.");
}

function _Construct_map<Unique extends boolean, 
        Source extends std.base.MapContainer<Atomic<string>, number, Unique, Source, IteratorT, ReverseT>,
        IteratorT extends std.base.IMapIterator<Atomic<string>, number, Unique, Source, IteratorT, ReverseT>,
        ReverseT extends std.base.IMapReverseIterator<Atomic<string>, number, Unique, Source, IteratorT, ReverseT>>
    (map: Source): void
{
    for (let i: number = 0; i <= 10; ++i)
        for (let j: number = 0; j < 3; ++j)
        {
            let key: Atomic<string> = new Atomic<string>(NUMBER_NAMES[i]);
            let value: number = i;

            map.push(std.make_pair(key, value));
        }
}

const NUMBER_NAMES: string[] = 
    [
        "Zero", 
        "First", "Second", "Third", "Fourth", 
        "Fifth", "Sixth", "Seventh", "Eighth", "Nineth", "Tenth"
    ];