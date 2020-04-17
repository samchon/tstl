import * as std from "../../index";

const CHARACTERS = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

function random_characters(length: number): string
{
    let ret: string = "";
    for (let i: number = 0; i < length; ++i)
    {
        let index: number = std.randint(9, CHARACTERS.length - 1);
        ret += CHARACTERS[index];
    }
    return ret;
}

export function test_hash_maps(): void
{
    type Key = std.Pair<std.Pair<object, string>, std.Pair<object, string>>;
    const Key = std.Pair;

    let dict: std.HashMap<Key, number> = new std.HashMap();
    let tuples: Array<[Key, number]> = [];

    for (let i: number = 0; i < 100; ++i)
    {
        let key: Key = new Key(new std.Pair(new Object(), random_characters(3)), new std.Pair(new Object(), random_characters(7)));
        let value: number = std.randint(0, 5000);

        dict.emplace(key, value);
        tuples.push([key, value]);
    }
    std.ranges.shuffle(tuples);

    for (let t of tuples)
    {
        let key: Key = t[0];
        let value: number = t[1];

        let it: std.HashMap.Iterator<Key, number> = dict.find(key);
        if (it.first !== key || it.second !== value)
            throw new Error("Error on hash algorithm, maybe.");
    }
}