/// <reference path="../API.ts" />

namespace std
{
	export function randint(x: number, y: number): number
	{
		let rand: number = Math.random() * (y - x + 1);
		return Math.floor(rand) + x;
	}

	export function sample<T, 
			InputIterator extends Readonly<IForwardIterator<T>>,
			OutputIterator extends Writeonly<IForwardIterator<T>>>
		(
			first: InputIterator, last: InputIterator, 
			output: OutputIterator, n: number
		): OutputIterator
	{
		// GENERATE REMAINDERS
		let step: number = distance(first, last);
		let remainders: number[] = [];

		for (let i: number = 0; i < step; ++i)
			remainders.push(i);

		//----
		// CONSTRUCT INDEXES
		//----
		let advances: number[] = [];
		n = Math.min(n, step);

		// PICK SAMPLE INDEXES
		for (let i: number = 0; i < n; ++i)
		{
			let idx: number = randint(0, remainders.length - 1);
			advances.push(remainders.splice(idx, 1)[0]);
		}
		std.sort(begin(advances), end(advances));

		// CHANGE INDEXES TO ADVANCES
		for (let i: number = n - 1; i >= 1; --i)
			advances[i] -= advances[i - 1];

		//----
		// FILL SAMPLES
		//----
		for (let adv of advances)
		{
			first = advance(first, adv) as InputIterator;

			output.value = first.value;
			output = output.next() as OutputIterator;
		}
		return output;
	}
}