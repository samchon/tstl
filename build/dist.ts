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

const substitude = 
    (content: string) => 
        content.replace(
            /(import|export)(.*)from "(.\/|..\/)(.*)"/g, 
            str => {
                const to: number = str.lastIndexOf(`"`);
                return [
                    str.substring(0, to),
                    `.mjs"`,
                    str.substring(to + 1)
                ].join("");
            }
        );

async function module(): Promise<void> {
    const declaration = async (location: string)=> {
        const content = substitude(
            await fs.promises.readFile(location, "utf8")
        );
        await fs.promises.unlink(location);
        await fs.promises.writeFile(
            `${location.substring(0, location.length - 5)}.d.mts`, 
            content, 
            "utf8"
        );
    };
    const javascript = async (location: string, file: string) => {
        const content = substitude(
                await fs.promises.readFile(location, "utf8")
            )
            .replace(
                `//# sourceMappingURL=${file}.map`, 
                `//# sourceMappingURL=${file.substring(0, file.length - 3)}.mjs.map`
            );
        await fs.promises.unlink(location);
        await fs.promises.writeFile(
            `${location.substring(0, location.length - 3)}.mjs`, 
            content, 
            "utf8"
        );
    };
    const mapper = async (location: string) => {
        const content: string = await fs.promises.readFile(location, "utf8");
        const parsed: {file: string } = JSON.parse(content);
        parsed.file = parsed.file.substring(0, parsed.file.length - 3) + ".mjs";

        await fs.promises.unlink(location);
        await fs.promises.writeFile(
            `${location.substring(0, location.length - 7)}.mjs.map`, 
            JSON.stringify(parsed), 
            "utf8"
        );
    };

    const iterate = async (path: string): Promise<void> => {
        const directory: string[] = await fs.promises.readdir(path);
        for (const file of directory) {
            const location: string = `${path}/${file}`;
            const stats: fs.Stats = await fs.promises.stat(location);

            if (stats.isDirectory()) await iterate(location);
            else if (location.substr(-3) === ".js")
                await javascript(location, file);
            else if (location.substr(-5) === ".d.ts")
                await declaration(location);
            else if (location.substr(-7) === ".js.map")
                await mapper(location);
        }
    };

    cp.execSync(`npx tsc -p tsconfig.module.json`, { stdio: "inherit" });
    await iterate(DIST);
}

async function main(): Promise<void> {
    cp.execSync(`npx rimraf ${DIST}`, { stdio: "inherit" });
    await fs.promises.mkdir(DIST);

    await documents();
    await module();
    cp.execSync(`npx tsc -p tsconfig.json`, { stdio: "inherit" });
}
main();
