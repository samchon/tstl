const EXTENSION = __filename.substr(-2);
if (EXTENSION === "js")
    require("source-map-support").install();

import { FileSystem } from "./internal/FileSystem";

interface IModule
{
    main(): Promise<string>;
}
const EXPORT_PATH: string = __dirname + "/../assets/benchmarks";

async function benchmark(feature: string): Promise<void>
{
    //----
    // MAIN PROCESS
    //----
    // LAZY CONSTRUCTION OF THE TARGET MODULE
    let instance: IModule = await import(`${__dirname}/${feature}`);
    let time: number = Date.now();

    // CONTENT FROM THE SPEICAL MODULE
    let content: string = await instance.main();
    time = Date.now() - time;

    //----
    // REPORT MEMORY USAGE
    //----
    let memory: NodeJS.MemoryUsage = global.process.memoryUsage();
    let performance: string = "> ## Performance \n"
        + `>  - Elapsed time: ${time} ms\n`;
    
    for (let key in memory)
    {
        let amount: number = memory[key as keyof NodeJS.MemoryUsage] / (10**6);
        performance += `>  - ${key}: ${amount} MB\n`;
    }
    content = performance + "\n\n" + content;

    //----
    // DO ARCHIVE
    //----
    await FileSystem.write(`${EXPORT_PATH}/${feature}.md`, content);
}

async function main(): Promise<void>
{
    await FileSystem.mkdir(EXPORT_PATH);

    if (process.argv[2])
    {
        // SPECIFIED FEATURE EXISTS
        await benchmark(process.argv[2]);
    }
    else
    {
        // ITERATE ALL FEATURES
        let directory: string[] = await FileSystem.dir(__dirname);
        for (let file of directory)
        {
            if (file.substr(-3) !== ".js" || file === "index.js")
                    continue;

            file = file.substr(0, file.length - 3);
            await benchmark(file);
        }
    }
}
main();