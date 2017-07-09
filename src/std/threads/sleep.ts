/// <reference path="../API.ts" />

namespace std
{
	export function sleep_for(ms: number): Promise<void>
	{
		return new Promise<void>((resolve, reject) =>
		{
			if (ms < 0) // NEGATIVE VALUE
				reject(new InvalidArgument("Unable to sleep by negative duration."));
			else
				setTimeout(function ()
				{
					resolve(); // RETURN
				}, ms); // FOR 'ms' MILLISECONDS
		});
	}

	export function sleep_until(at: Date): Promise<void>
	{
		let now: Date = new Date();
		let ms: number = at.getTime() - now.getTime(); // MILLISECONDS TO WAIT

		return sleep_for(ms); // CONVERT TO THE SLEEP_FOR
	}
}