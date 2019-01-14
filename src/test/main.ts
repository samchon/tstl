import * as fs from "fs";

const PATH = __dirname;

async function iterate(path: string): Promise<void>
{
    let file_list: string[] = fs.readdirSync(path);
    for (let file of file_list)
    {
        let current_path: string = path + "/" + file;
        let stat: fs.Stats = fs.lstatSync(current_path);
        
        if (stat.isDirectory() === true)
        {
            await iterate(current_path);
            continue;
        }
        else if (file.substr(-3) !== ".js" || current_path === PATH + "/main.js")
            continue;

        let external: any = await import(current_path.substr(0, current_path.length - 3));
        for (let key in external)
            if (key.substr(0, 5) === "test_")
            {
                console.log(key);
                await external[key]();
            }
    }
}

async function main(): Promise<void>
{
    await iterate(PATH);
}
main().then(() =>
{
    console.log("Success");
}).catch(e =>
{
    console.log(e);
    process.exit(1);
});