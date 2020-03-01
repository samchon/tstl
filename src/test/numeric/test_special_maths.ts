import * as fs from "fs";
import * as std from "../../index";

const PATH = (__filename.substr(-2) === "ts")
    ? `${__dirname}/special_math`
    : `${__dirname}/special_math`.replace("dist", "src");

export function similar(x: number, y: number, precision = .05): boolean
{
    let diff: number = _Difference(x, y);

    return diff < precision;
}

export function test_special_maths(): void
{
    let content: string = fs.readFileSync(PATH + "/data.json").toString("utf8");
    let solutions: ISolution[] = JSON.parse(content);

    // TRACING ERRORS
    let aggregates: std.HashMap<string, number> = new std.HashMap();
    let output: string = "";

    for (let solve of solutions)
    {
        let name: string = solve[0];
        let func: Function = (std as any)[name];
        let args: number[] = solve.slice(1, solve.length - 1) as number[];

        let ret: number = func(...args);
        let answer: number = solve[solve.length - 1] as number;
        let difference: number = _Difference(answer, ret);

        if (isNaN(difference))
            difference = 1.0;
            
        if (!similar(ret, answer, .1))
        {
            let it = aggregates.find(name);
            if (it.equals(aggregates.end()) === true)
                it = aggregates.emplace(name, 0).first;

            ++it.second;
            output += `std.${name}(${args.toString()}) = ${answer} && ${ret} -> ${difference}\n`;
        }
    }

    if (aggregates.empty() === false)
        fs.writeFileSync(PATH + "errors.log", output, "utf8");

    let validate: boolean = true;
    for (let entry of aggregates)
        if (entry.second > 5)
            validate = false;

    if (!validate)
        throw new std.DomainError("Bug on special math function(s).");
}

function _Difference(x: number, y: number): number
{
    if (x === 0 && y === 0)
        return 0;
    else if (isNaN(x) && isNaN(y))
        return 0;
    else if (Math.abs(x - y) < Math.pow(10, -5))
        return 0;
    
    let diff: number = Math.abs(y - x);
    if ((x === 0 || y === 0) && diff < .00001)
        return 0;
    else
        return diff / Math.max(Math.abs(x), Math.abs(y));
}

interface ISolution extends Array<string|number>
{
    0: string;
}