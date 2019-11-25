import { FileSystem } from "./internal/FileSystem";

export async function main(): Promise<string>
{
    const STD_PATH: string = __dirname + "/../algorithm";
    const RANGES_PATH: string = __dirname + "/../ranges/algorithm";

    let ret: string = "## `<algorithm>` \n"
        + " module | function | `std` | `std.ranges` \n"
        + "--------|------|-------|--------------\n";

    let directory: string[] = await FileSystem.dir(STD_PATH);

    for (let file of directory)
    {
        if (file.substr(-3) !== ".js" || file === "index.js")
            continue;

        let name: string = file.substr(0, file.length - 3);
        let std: IModule = await import(`${STD_PATH}/${file}`);
        let ranges: IModule = await import(`${RANGES_PATH}/${file}`);
        
        for (let key in std)
            ret += ` ${name} | ${key} | O | ${ranges[key] !== undefined ? "O" : "X"} \n`;
    }
    return ret;
}

interface IModule
{
    [key: string]: Function | undefined;
}