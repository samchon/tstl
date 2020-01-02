import { FileSystem } from "./internal/FileSystem";
import { TreeSet } from "../container/TreeSet";
import { Pair } from "../utility/Pair";

async function load(path: string): Promise<TreeSet<Pair<string, string>>>
{
    let ret: TreeSet<Pair<string, string>> = new TreeSet();
    let directory: string[] = await FileSystem.dir(path);

    for (let file of directory)
    {
        if (file.substr(-3) !== ".js" || file === "index.js")
            continue;

        let name: string = file.substr(0, file.length - 3);
        let functions: IModule = await import(`${path}/${file}`);

        for (let func in functions)
            ret.insert(new Pair(name, func));
    }
    return ret;
}

export async function main(): Promise<string>
{
    let std: TreeSet<Pair<string, string>> = await load(__dirname + "/../algorithm");
    let ranges: TreeSet<Pair<string, string>> = await load(__dirname + "/../ranges/algorithm");

    let both: TreeSet<Pair<string, string>> = new TreeSet();
    both.push(...std);
    both.push(...ranges);

    let ret: string = "## `<algorithm>` \n"
        + " module | function | `std` | `std.ranges` \n"
        + "--------|----------|-------|--------------\n";
    for (let pair of both)
        ret += ` ${pair.first} | ${pair.second} | ${std.has(pair) ? "O" : "X"} | ${ranges.has(pair) ? "O" : "X"} \n`;
    return ret;
}

interface IModule
{
    [key: string]: Function | undefined;
}