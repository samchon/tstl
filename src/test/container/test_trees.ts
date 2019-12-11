import * as std from "../../index";

import { Temporary } from "../../base/Temporary";
import { test_binary_searches } from "../algorithm/test_binary_searches";

export function test_trees(): void
{
    _Test_tree_set(new std.TreeSet<number>());
    _Test_tree_set(new std.experimental.FlatSet<number>());
    _Test_tree_set(new std.TreeMultiSet<number>());
    _Test_tree_set(new std.experimental.FlatMultiSet<number>());

    _Test_tree_map(new std.TreeMap<number, number>());
    _Test_tree_map(new std.experimental.FlatMap<number, number>());
    _Test_tree_map(new std.TreeMultiMap<number, number>());
    _Test_tree_map(new std.experimental.FlatMultiMap<number, number>());

    _Test_tree_set_inserts_and_erases();
    _Test_bounds();
}

function _Test_tree_set_inserts_and_erases(): void
{
    for (let k = 0; k < 100; ++k)
    {
        let set: std.TreeSet<number> = new std.TreeSet();
        for (let i = 0; i < 100; ++i)
            set.insert(std.randint(0, 10000));

        for (let val of set)
            if (set.has(val) === false)
                console.log("something wrong.");

        while (!set.empty())
        {
            let advance: number = std.randint(0, set.size() - 1);
            let it: std.TreeSet.Iterator<number> = std.advance(set.begin(), advance);

            set.erase(it);
            if (set.has(it.value))
                console.log("something wrong.");
        }
    }
}

function _Test_tree_set<Unique extends boolean, 
        Source extends std.base.ITreeSet<number, Unique, Source, IteratorT, ReverseT>,
        IteratorT extends std.base.ISetIterator<number, Unique, Source, IteratorT, ReverseT>,
        ReverseT extends std.base.ISetReverseIterator<number, Unique, Source, IteratorT, ReverseT>>
    (set: Source): void
{
    for (let i: number = 0; i < 1000; ++i)
        set.push(Math.floor(Math.random() * 100));

    // VALIDATE SORTING
    if (std.is_sorted(set.begin() as Temporary, set.end()) === false)
        throw new std.DomainError("Order of TreeSet or TreeMultiSet is wrong.");

    // VALIDATE FIND
    for (let i: number = 0; i < 10000; ++i)
    {
        let val: number = Math.floor(Math.random() * 100);

        let alg_it = std.find(set.begin() as Temporary, set.end(), val);
        let set_it = set.find(val);

        if (alg_it === set.end())
            if (set_it === set.end())
                continue;
            else
                throw new std.DomainError("find() of TreeSet or TreeMultiSet is wrong; invalid out of range.");
        else if (alg_it.value !== set_it.value)
            throw new std.DomainError("find() of TreeSet or TreeMultiSet is wrong; different value.");
    }
}

function _Test_tree_map<Unique extends boolean, 
        Source extends std.base.ITreeMap<number, number, Unique, Source, IteratorT, ReverseT>,
        IteratorT extends std.base.IMapIterator<number, number, Unique, Source, IteratorT, ReverseT>,
        ReverseT extends std.base.IMapReverseIterator<number, number, Unique, Source, IteratorT, ReverseT>>
    (map: Source): void
{
    for (let i: number = 0; i < 1000; ++i)
        map.push(std.make_pair(Math.floor(Math.random() * 100), 0));

    // VALIDATE SORTING
    if (std.is_sorted(map.begin() as Temporary, map.end()) === false)
        throw new std.DomainError("Order of TreeMap or TreeMultiMap is wrong.");

    // VALIDATE FIND
    for (let i: number = 0; i < 10000; ++i)
    {
        let val: number = Math.floor(Math.random() * 100);

        let alg_it = std.find_if(map.begin() as Temporary, map.end(), entry => val === (entry as any).first);
        let set_it = map.find(val);

        if (alg_it === map.end())
            if (set_it === map.end())
                continue;
            else
                throw new std.DomainError("find() of TreeMap or TreeMultiMap is wrong; invalid out of range.");
        else if (alg_it.first !== set_it.first)
            throw new std.DomainError("find() of TreeMap or TreeMultiMap is wrong; different value.");
    }
}

function _Test_bounds(): void
{
    // test tree container and algorithms' binary search at the same time
    test_binary_searches();
}