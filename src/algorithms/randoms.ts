import { IForwardIterator } from "../iterators/IForwardIterator";

import { Writeonly } from "../iterators/IFake";
import { sort } from "./sortings";
import { distance, advance } from "../iterators/global";
import { begin, end } from "..";

/**
 * Generate random integer.
 * 
 * @param x Minimum value.
 * @param y Maximum value.
 * 
 * @return A random integer between [x, y].
 */
export function randint(x: number, y: number): number
{
	let rand: number = Math.random() * (y - x + 1);
	return Math.floor(rand) + x;
}

/**
 * Pick sample elements up.
 * 
 * @param first Input iteartor of the first position.
 * @param last Input iterator of the last position.
 * @param output Output iterator of the first position.
 * @param n Number of elements to pick up.
 * 
 * @return Output Iterator of the last position by advancing.
 */
export function sample<T, 
		InputIterator extends Readonly<IForwardIterator<T, InputIterator>>,
		OutputIterator extends Writeonly<IForwardIterator<T, OutputIterator>>>
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
	sort(begin(advances), end(advances));

	// CHANGE INDEXES TO ADVANCES
	for (let i: number = n - 1; i >= 1; --i)
		advances[i] -= advances[i - 1];

	//----
	// FILL SAMPLES
	//----
	for (let adv of advances)
	{
		first = advance(first, adv);

		output.value = first.value;
		output = output.next();
	}
	return output;
}