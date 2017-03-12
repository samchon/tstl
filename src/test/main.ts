/// <reference path="API.ts" />

/// <reference path="algorithm.ts" />
/// <reference path="bind.ts" />
/// <reference path="exception.ts" />
/// <reference path="reverse_iterator.ts" />
/// <reference path="sort.ts" />

/// <reference path="deque.ts" />
/// <reference path="list.ts" />
/// <reference path="map.ts" />
/// <reference path="multimap.ts" />
/// <reference path="unordered_map.ts" />

namespace example
{
	export function main(): void
	{
		console.log("TEST ALL");
		
		for (let key in example)
			if (key != "main" && (example as any)[key] instanceof Function)
			{
				console.log("===================================================");
				console.log("	" + key);
				console.log("===================================================");

				(example as any)[key]();
				console.log("\n");
			}
	}
}

example.main();