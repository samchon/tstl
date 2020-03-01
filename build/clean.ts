import * as fs from "fs";

function main(): void
{
    const PATH = __dirname + "/../dist";
    
    if (fs.existsSync(PATH))
        fs.rmdirSync(PATH, { recursive: true });
}
main();