/// <reference path="../API.ts" />

namespace std.example
{
	export function test_all(): void
	{
		for (let key in std.example)
			if (key != "test_all" && std.example[key] instanceof Function)
				std.example[key]();
	}
}