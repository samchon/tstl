import * as std from "../../index";
import { _Barrier } from "../../base/thread/_Barrier";

export function tttest_latches(): Promise<void>
{
	return _Test_barriers(size => new std.experimental.Latch(size));
}

export async function test_barriers(): Promise<void>
{
	//----
	// TEST COMMON FEATURES
	//----
	await _Test_barriers(size => new std.experimental.Barrier(size, () => {}));

	//----
	// TEST COMPLETION
	//----
	for (let i: number = 0; i < 10; ++i)
	{
		// PREPARE ASSETS
		let arrive: boolean = false;
		let lambda = () => { arrive = true; };

		let count: number = std.randint(5, 8);
		let size: number = std.randint(5, 8);
		
		// DO ARRIVE
		let barrier: std.experimental.Barrier = new std.experimental.Barrier(size, lambda);
		for (let i: number = 0; i < count; ++i)
			await barrier.arrive();

		// VALIDATE
		await std.sleep_for(1);
		if (arrive !== (count >= size))
			throw new std.DomainError("Error on Barrier.arrive().");
	}
}

async function _Test_barriers(creator: (size: number) => _Barrier): Promise<void>
{
	let dest: number = 0;
	let result: number = 0;

	for (let x: number = 0; x < 10; ++x)
	{
		// PREPARE ASSETS
		let count: number = std.randint(5, 8);
		let size: number = std.randint(5, 8);

		let barrier: _Barrier = creator(size);

		// DEST & RESULT
		dest += (count >= size) ? 1 : -1;
		barrier.wait_for(50).then(flag =>
		{
			result += flag ? 1 : -1;
		});

		// ARRIVE
		for (let i: number = 0; i < count; ++i)
			await barrier.arrive();
	}

	await std.sleep_for(100);
	if (dest !== result)
		throw new std.DomainError("Error on _Barrier.arrive().");
}