import * as fs from "fs";
import { StringUtil } from "../benchmark/internal/StringUtil";

const PATH = __dirname;

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
        else if (file.substr(-3) !== ".ts" || current_path === `${PATH}/index.ts`)
            continue;

        let external: IModule = await import(current_path.substr(0, current_path.length - 3));
        for (let key in external)
        {
            // WHETHER TESTING TARGET OR NOT
            if (key.substr(0, 5) !== "test_")
                continue;
            else if (process.argv[2] && key.replace("test_", "") !== process.argv[2])
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

    let time: number = await measure(() => iterate(PATH));
    
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