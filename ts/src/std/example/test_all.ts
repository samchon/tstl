/// <reference path="../API.ts" />

/// <reference path="../Vector.ts" />

namespace std.example
{
	export function test_all(): void
	{
		console.log("TEST ALL");

		let items = new std.Vector<number>();
		items.push(1, 2, 2, 3, 3);
		
		for (let it = items.begin(); !it.equal_to(items.end()); it = it.next())
			console.log(it.value);
		
		do
		{
			let str: string = "";
			for (let it = items.begin(); !it.equal_to(items.end()); it = it.next())
				str += it.value + " ";
			
			console.log(str);
		}
		while (std.next_permutation(items.begin(), items.end()) == true);

		//for (let key in std.example)
		//	if (key != "test_all" && (std.example as any)[key] instanceof Function)
		//	{
		//		console.log("===================================================");
		//		console.log("	" + key);
		//		console.log("===================================================");
		//		(std.example as any)[key]();
		//	}
	}
}