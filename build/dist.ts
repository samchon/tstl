import * as fs from "fs";

async function main(): Promise<void>
{
    const FILES = [
        ".npmignore",
        "CODE_OF_CONDUCT.md",
        "CONTRIBUTING.md",
        "LICENSE",
        "package.json",
        "README.md"
    ];
    const ROOT = `${__dirname}/..`;
    const DIST = `${ROOT}/dist`;

    for (let file of FILES)
        if (fs.existsSync(`${DIST}/${file}`) === false)
            await fs.promises.link(`${ROOT}/${file}`, `${DIST}/${file}`);
}
main();