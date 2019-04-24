import * as fs from "fs";
import { StringUtil } from "./internal/StringUtil";

const PATH = __dirname;

interface IModule
{
    [key: string]: ()=>Promise<void>;
}

async function iterate(path: string): Promise<void>
{
    let file_list: string[] = fs.readdirSync(path);
    for (let file of file_list)
    {
        let current_path: string = path + "/" + file;
        let stat: fs.Stats = fs.lstatSync(current_path);
        
        if (stat.isDirectory() === true && file !== "internal")
        {
            await iterate(current_path);
            continue;
        }
        else if (file.substr(-3) !== ".js" || current_path === PATH + "/index.js")
            continue;

        let external: IModule = await import(current_path.substr(0, current_path.length - 3));
        for (let key in external)
            if (key.substr(0, 5) === "test_")
            {
                // WHEN SPECIALIZED
                if (process.argv[2] && key.replace("test_", "") !== process.argv[2])
                    continue;

                // DO TEST
                console.log(key);
                await external[key]();
            }
    }
}

async function main(): Promise<void>
{
    //----
    // DO TEST
    //----
    let time: number = Date.now();
    await iterate(PATH);
    
    //----
    // TRACE BENCHMARK
    //----
    // ELAPSED TIME
    console.log("----------------------------------------------------------");
    console.log("Success");
    console.log(`  - elapsed time: ${StringUtil.numberFormat(Date.now() - time)} ms`);

    // MEMORY USAGE
    let memory: NodeJS.MemoryUsage = process.memoryUsage();
    for (let property in memory)
    {
        let amount: number = memory[property as keyof NodeJS.MemoryUsage] / 10**6;
        console.log(`  - ${property}: ${StringUtil.numberFormat(amount)} MB`);
    }
}
main().catch(e =>
{
    console.log(e);
    process.exit(1);
});