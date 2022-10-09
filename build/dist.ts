import cp from "child_process";
import fs from "fs";

const ROOT = `${__dirname}/..`;
const DIST = `${ROOT}/dist`;

async function documents(): Promise<void> {
    const FILES = [
        ".npmignore",
        "CODE_OF_CONDUCT.md",
        "CONTRIBUTING.md",
        "LICENSE",
        "package.json",
        "README.md",
    ];

    for (const file of FILES)
        await fs.promises.link(`${ROOT}/${file}`, `${DIST}/${file}`);
}

async function compile(mode: "CommonJS" | "EsModule"): Promise<void> {
    const extension: string = mode === "CommonJS" ? "cjs" : "mjs";
    const file: string = `${ROOT}/tsconfig.${
        mode === "CommonJS" ? "" : "module."
    }json`;
    cp.execSync(`tsc -p ${file}`, { stdio: "inherit" });

    if (mode === "CommonJS") return;
    const iterate = async (path: string): Promise<void> => {
        const directory: string[] = await fs.promises.readdir(path);
        for (const file of directory) {
            const location: string = `${path}/${file}`;
            const stats: fs.Stats = await fs.promises.stat(location);

            if (stats.isDirectory()) await iterate(location);
            else if (location.substr(-3) === ".js")
                await fs.promises.rename(
                    location,
                    `${location.substr(0, location.length - 3)}.${extension}`,
                );
            else if (location.substr(-7) === ".js.map")
                await fs.promises.rename(
                    location,
                    `${location.substr(
                        0,
                        location.length - 7,
                    )}.${extension}.map`,
                );
        }
    };
    await iterate(DIST);
}

async function main(): Promise<void> {
    cp.execSync(`rimraf ${DIST}`, { stdio: "inherit" });
    await fs.promises.mkdir(DIST);

    await documents();
    await compile("EsModule");
    await compile("CommonJS");
}
main();
