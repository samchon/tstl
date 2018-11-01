import * as std from "../../index";

export async function test_unique_locks(): Promise<void>
{
	let mtx: std.TimedMutex = new std.TimedMutex();

	let lambda = _Lambda.bind(true);
	let trier = () => mtx.try_lock();
	let unlocker = () => mtx.unlock();

	await _Test_lock("unique_lock.lock()", () => std.unique_lock.lock(mtx, lambda), trier, unlocker);
	await _Test_lock("unique_lock.try_lock()", () => std.unique_lock.try_lock(mtx, lambda), trier, unlocker);
	await _Test_lock("unique_lock.try_lock_for()", () => std.unique_lock.try_lock_for(mtx, 50, lambda), trier, unlocker);
}

export async function test_shared_locks(): Promise<void>
{
	let mtx: std.SharedTimedMutex = new std.SharedTimedMutex();

	let lambda = _Lambda.bind(true);
	let trier = () => mtx.try_lock();
	let unlocker = () => mtx.unlock();

	await _Test_lock("shared_lock.lock()", () => std.shared_lock.lock(mtx, lambda), trier, unlocker);
	await _Test_lock("shared_lock.try_lock()", () => std.shared_lock.try_lock(mtx, lambda), trier, unlocker);
	await _Test_lock("shared_lock.try_lock_for()", () => std.shared_lock.try_lock_for(mtx, 50, lambda), trier, unlocker);
}

async function _Test_lock(name: string, locker: ()=>Promise<void|boolean>, trier: ()=>Promise<boolean>, unlocker: ()=>Promise<void>): Promise<void>
{
	try
	{
		await locker();
	}
	catch {}

	if (await trier() === false)
		throw new std.DomainError(`Invalid implement on ${name}.`);

	await unlocker();
}

function _Lambda(success: boolean): void
{
	if (!success)
		throw new Error("Throw error.");
}