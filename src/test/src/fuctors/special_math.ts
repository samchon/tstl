/// <reference path="../API.ts" />

namespace test
{
	function _Difference(x: number, y: number): number
	{
		if (x == 0 && y == 0)
			return 0;
		else if (isNaN(x) && isNaN(y))
			return 0;
		
		let diff: number = Math.abs(y - x);
		if ((x == 0 || y == 0) && diff < .00001)
			return 0;
		else
			return diff / Math.max(Math.abs(x), Math.abs(y));
	}

	export function similar(x: number, y: number, precision = .05): boolean
	{
		let diff: number = _Difference(x, y);

		return diff < precision;
	}

	export function test_special_maths(): void
	{
		let content: string = fs.readFileSync(__dirname + "/../build/special_math/data.json").toString("utf8");
		let solutions: ISolution[] = JSON.parse(content);

		let results: std.HashMap<string, IAggregate> = new std.HashMap();
		let output: string = "";

		for (let solve of solutions)
		{
			let name: string = solve[0];
			let func: Function = std[name];
			let args: number[] = solve.slice(1, solve.length - 1) as number[];

			let ret: number = func(...args);
			let answer: number = solve[solve.length - 1] as number;
			let difference: number = _Difference(answer, ret);

			if (isNaN(difference))
				difference = 1.0;
				
			if (!similar(ret, answer, .1))
			{
				let it = results.find(name);
				if (it.equals(results.end()) == true)
					it = results.emplace(name, {count: 0, difference: 0}).first;

				++it.second.count;
				it.second.difference += difference;

				output += `std.${name}(${args.toString()}) = ${answer} && ${ret} -> ${difference}\n`;
			}
		}

		fs.writeFileSync(__dirname + "/../build/special_math/result.log", output, "utf8");
		for (let entry of results)
		{
			entry.second.difference /= entry.second.count;
			console.log("\t", entry.first, entry.second);
		}
	}

	interface ISolution extends Array<string|number>
	{
		0: string;
	}

	interface IAggregate
	{
		count: number;
		difference: number;
	}
}