import * as fs from "fs";

function main(): void
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
            fs.linkSync(`${ROOT}/${file}`, `${DIST}/${file}`);
}
main();