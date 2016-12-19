/// <reference path="../API.ts" />

namespace std.example
{
	export function test_exception(): void
	{
		try
		{
			throw new Exception("Some exception");
		}
		catch (exception)
		{
			console.log((exception as Exception).what());
		}
	}
}