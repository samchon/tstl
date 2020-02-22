const EXTENSION = __filename.substr(-2);
if (EXTENSION === "js")
    require("source-map-support").install();

import * as cli from "cli";
import * as fs from "fs";

import { StringUtil } from "../benchmark/internal/StringUtil";

interface ICommand
{
    target?: string;
    exclude?: string;
}
interface IModule
{
    [key: string]: ()=>Promise<void>;
}

async function measure(job: ()=>Promise<void>): Promise<number>
{
    let time: number = Date.now();
    await job();

    return Date.now() - time;
}

async function iterate(command: ICommand, path: string): Promise<void>
{
    let fileList: string[] = fs.readdirSync(path);
    for (let file of fileList)
    {
        let currentPath: string = path + "/" + file;
        let stat: fs.Stats = fs.lstatSync(currentPath);
        
        if (stat.isDirectory() === true && file !== "internal")
        {
            await iterate(command, currentPath);
            continue;
        }
        else if (file.substr(-3) !== `.${EXTENSION}` || currentPath === `${__dirname}/index.${EXTENSION}`)
            continue;
        else if (file.substr(0, 5) !== "test_")
            continue;

        let external: IModule = await import(currentPath.substr(0, currentPath.length - 3));
        for (let key in external)
        {
            // WHETHER TESTING TARGET OR NOT
            if (key.substr(0, 5) !== "test_")
                continue;

            if (command.exclude && command.exclude === key.substr(5))
                continue;
            if (command.target && command.target !== key.substr(5))
                continue;
            
            // PRINT TITLE & ELAPSED TIME
            process.stdout.write("  - " + key);
            let time: number = await measure(() => external[key]());

            console.log(`: ${StringUtil.numberFormat(time)} ms`);
        }
    }
}

async function main(): Promise<void>
{
    //----
    // DO TEST
    //----
    console.log("==========================================================");
    console.log(" TSTL Test Automation Program");
    console.log("==========================================================");

    let command: ICommand = cli.parse();
    if (process.argv[2] && process.argv[2][0] !== '-')
        command.target = process.argv[2];

    let time: number = await measure(() => iterate(command, __dirname));
    
    //----
    // TRACE BENCHMARK
    //----
    // ELAPSED TIME
    console.log("----------------------------------------------------------");
    console.log("Success");
    console.log(`  - elapsed time: ${StringUtil.numberFormat(time)} ms`);

    // MEMORY USAGE
    let memory: NodeJS.MemoryUsage = process.memoryUsage();
    for (let property in memory)
    {
        let amount: number = memory[property as keyof NodeJS.MemoryUsage] / 10**6;
        console.log(`  - ${property}: ${StringUtil.numberFormat(amount)} MB`);
    }
    console.log("----------------------------------------------------------\n");
}
main().catch(e =>
{
    console.log(e);
    process.exit(1);
});