/// <reference path="../API.ts" />

namespace example
{
	export function test_exception(): void
	{
		try
		{
			throw new std.Exception("Some exception");
		}
		catch (exception)
		{
			console.log((exception as std.Exception).what());
		}
	}
}