import * as fs from "fs";

export namespace FileSystem
{
    /* ----------------------------------------------------------------
        ACCESSORS
    ---------------------------------------------------------------- */
    export function exists(path: string): Promise<boolean>
    {
        return new Promise(resolve =>
        {
            fs.exists(path, resolve);
        });
    }

    export function dir(path: string): Promise<string[]>
    {
        return new Promise((resolve, reject) =>
        {
            fs.readdir(path, (err, ret) =>
            {
                if (err)
                    reject(err);
                else
                    resolve(ret);
            });
        });
    }

    export function lstat(path: string): Promise<fs.Stats>
    {
        return new Promise((resolve, reject) =>
        {
            fs.lstat(path, (err, stat) =>
            {
                if (err)
                    reject(err);
                else
                    resolve(stat);
            })
        });
    }

    export function read(path: string): Promise<Buffer>;
    export function read(path: string, encoding: string): Promise<string>;

    export function read(path: string, encoding?: string): Promise<Buffer | string>
    {
        return new Promise((resolve, reject) => 
        {
            let callback = (err: NodeJS.ErrnoException | null, ret: Buffer | string) =>
            {
                if (err)
                    reject(err);
                else
                    resolve(ret);
            };
            if (encoding === undefined)
                fs.readFile(path, callback);
            else
                fs.readFile(path, encoding, callback);
        });
    }

    /* ----------------------------------------------------------------
        ARCHIVERS
    ---------------------------------------------------------------- */
    export async function mkdir(path: string): Promise<void>
    {
        if (await exists(path) === false)
            await _Mkdir(path);
    }

    function _Mkdir(path: string): Promise<void>
    {
        return new Promise((resolve, reject) =>
        {
            fs.mkdir(path, err =>
            {
                if (err)
                    reject(err);
                else
                    resolve();
            });
        });
    }

    export function write(path: string, content: string | Buffer): Promise<void>
    {
        return new Promise((resolve, reject) =>
        {
            let callback = (err: NodeJS.ErrnoException | null) =>
            {
                if (err)
                    reject(err);
                else
                    resolve();
            };
            if (content instanceof Buffer)
                fs.writeFile(path, content, callback);
            else
                fs.writeFile(path, content, "utf8", callback);
        });
    }
}