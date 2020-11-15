/// <reference types="node" />
import * as fs from "fs";
export declare namespace FileSystem {
    function exists(path: string): Promise<boolean>;
    function dir(path: string): Promise<string[]>;
    function lstat(path: string): Promise<fs.Stats>;
    function read(path: string): Promise<Buffer>;
    function read(path: string, encoding: string): Promise<string>;
    function mkdir(path: string): Promise<void>;
    function write(path: string, content: string | Buffer): Promise<void>;
}
//# sourceMappingURL=FileSystem.d.ts.map