import * as std from "../../index";

const SLEEP_TIME: number = 50;
const READ_COUNT: number = 10;

export type ILockable = std.ILockable;
export interface ITimedLockable extends ILockable
{
	try_lock_for(ms: number): Promise<boolean>;
}

interface ISharedLockable extends ILockable
{
	lock_shared(): Promise<void>;
	unlock_shared(): Promise<void>;
}
interface ISharedTimedLockable extends ITimedLockable, ISharedLockable
{
	try_lock_shared_for(ms: number): Promise<boolean>;
}

export async function test_mutexes(): Promise<void>
{
	await _Test_lock("Mutex", new std.Mutex());
	await _Test_try_lock("TimedMutex", new std.TimedMutex());
	await _Test_lock_shared("SharedMutex", new std.SharedMutex());
	await _Test_try_lock_shared("SharedTimedMutex", new std.SharedTimedMutex());
}

/* ---------------------------------------------------------
	WRITE LOCK
--------------------------------------------------------- */
export async function _Test_lock(name: string, mtx: ILockable): Promise<void>
{
	let start_time: number = new Date().getTime();

	// LOCK FOR A SECOND
	mtx.lock();
	std.sleep_for(SLEEP_TIME).then(() =>
	{
		mtx.unlock();
	});

	// TRY LOCK AGAIN
	await mtx.lock();
	let elapsed_time: number = new Date().getTime() - start_time;
	await mtx.unlock();

	if (elapsed_time < SLEEP_TIME * .95)
		throw new std.DomainError(name + " does not work.");
}

export async function _Test_try_lock(name: string, mtx: ITimedLockable): Promise<void>
{
	await _Test_lock(name, mtx);
	let start_time: number = new Date().getTime();

	// DO LOCK
	let ret: boolean = await mtx.try_lock_for(SLEEP_TIME);
	if (ret === false)
		throw new std.DomainError(name + "::try_lock_for does not return exact value.");

	// TRY LOCK AGAIN
	ret = await mtx.try_lock_for(SLEEP_TIME);
	let elapsed_time: number = new Date().getTime() - start_time;

	if (ret === true)
		throw new std.DomainError(name + "::try_lock_for does not return exact value.");
	else if (elapsed_time < SLEEP_TIME * .95)
		throw new std.DomainError(name + " does not work in exact time.");

	await mtx.unlock();
}

/* ---------------------------------------------------------
	READ LOCK
--------------------------------------------------------- */
async function _Test_lock_shared(name: string, mtx: ISharedLockable): Promise<void>
{
	// TEST WRITING LOCK & UNLOCK
	await _Test_lock(name, mtx);

	//----
	// READ SIMULTANEOUSLY
	//----
	// READ LOCK; 10 TIMES
	let read_count: number = 0;
	for (let i: number = 0; i < READ_COUNT; ++i)
	{
		mtx.lock_shared();
		++read_count;
	}
	if (read_count !== READ_COUNT) // READ LOCK CAN BE DONE SIMULTANEOUSLY
		throw new std.DomainError(name + "::lock_shared does not support simultaneous lock.");

	//----
	// READ FIRST, WRITE LATER
	//----
	let start_time: number = new Date().getTime();
	std.sleep_for(SLEEP_TIME).then(() =>
	{
		// SLEEP FOR A SECOND AND UNLOCK ALL READINGS
		for (let i: number = 0; i < READ_COUNT; ++i)
			mtx.unlock_shared();
	});

	// DO WRITE LOCK; MUST BE BLOCKED
	await mtx.lock();

	// VALIDATE ELAPSED TIME
	let elapsed_time: number = new Date().getTime() - start_time;
	if (elapsed_time < SLEEP_TIME * .95)
		throw new std.DomainError(name + " does not block writing until reading.");

	//----
	// WRITE FIRST, READ LATER
	//----
	start_time = new Date().getTime();
	std.sleep_for(SLEEP_TIME).then(() => 
	{
		// SLEEP FOR A SECOND AND UNLOCK WRITINGS
		mtx.unlock();
	});
	for (let i: number = 0; i < READ_COUNT; ++i)
		await mtx.lock_shared();

	// VALIDATE ELAPSED TIME
	elapsed_time = new Date().getTime() - start_time;
	if (elapsed_time < SLEEP_TIME * .95)
		throw new std.DomainError(name + " does not block reading until writing.");

	// RELEASE READING LOCK FOR THE NEXT STEP
	for (let i: number = 0; i < READ_COUNT; ++i)
		await mtx.unlock_shared();
}

async function _Test_try_lock_shared(name: string, mtx: ISharedTimedLockable)
{
	// TEST WRITING LOCK & UNLOCK
	await _Test_try_lock(name, mtx);
	await _Test_lock_shared(name, mtx);

	let start_time: number;
	let elapsed_time: number;
	let flag: boolean;

	//----
	// READ SIMULTANEOUSLY
	//----
	start_time = new Date().getTime();

	// READ LOCK; 10 TIMES
	for (let i: number = 0; i < READ_COUNT; ++i)
	{
		flag = await mtx.try_lock_shared_for(SLEEP_TIME);
		if (flag === false)
			throw new std.DomainError(name + "::try_lock_shared_for does not return exact value.");
	}

	// VALIDATE ELAPSED TIME
	elapsed_time = new Date().getTime() - start_time;
	if (elapsed_time >= SLEEP_TIME)
		throw new std.DomainError(name + "::try_lock_shared_for does not support simultaneous lock.");

	//----
	// WRITE LOCK
	//----
	// TRY WRITE LOCK ON READING
	start_time = new Date().getTime();
	flag = await mtx.try_lock_for(SLEEP_TIME);
	elapsed_time = new Date().getTime() - start_time;

	if (flag === true)
		throw new std.DomainError(name + "::try_lock_for does not return exact value on reading.");
	else if (elapsed_time < SLEEP_TIME * .95)
		throw new std.DomainError(name + "::try_lock_for does not block on reading.");

	// TRY WRITE LOCK AFTER READING
	std.sleep_for(SLEEP_TIME).then(() => 
	{
		for (let i: number = 0; i < READ_COUNT; ++i)
			mtx.unlock_shared();
	});
	start_time = new Date().getTime();
	flag = await mtx.try_lock_for(SLEEP_TIME);
	elapsed_time = new Date().getTime() - start_time;

	if (flag === false)
		throw new std.DomainError(name + "::try_lock_for does not return exact value on reading.");
	else if (elapsed_time < SLEEP_TIME * .95)
		throw new std.DomainError(name + "::try_lock_for does not work in exact time.");

	//----
	// READ LOCK
	//----
	// READ LOCK ON WRITING
	start_time = new Date().getTime();
	for (let i: number = 0; i < READ_COUNT; ++i)
	{
		flag = await mtx.try_lock_shared_for(SLEEP_TIME);
		if (flag === true)
			throw new std.DomainError(name + "::try_lock_shared_for does not return exact value on writing.");
	}
	elapsed_time = new Date().getTime() - start_time;

	if (elapsed_time < SLEEP_TIME * READ_COUNT * .95)
		return new std.DomainError(name + "::try_lock_shared_for does not work in exact time.");
	
	// READ LOCK AFTER WRITING
	start_time = new Date().getTime();
	std.sleep_for(SLEEP_TIME).then(() =>
	{
		mtx.unlock();
	});

	for (let i: number = 0; i < READ_COUNT; ++i)
	{
		flag = await mtx.try_lock_shared_for(SLEEP_TIME);
		if (flag === false)
			throw new std.DomainError(name + "::try_lock_shared_for does not return exact value after writing.");
	}
	elapsed_time = new Date().getTime() - start_time;

	if (elapsed_time < SLEEP_TIME * .95 || elapsed_time >= SLEEP_TIME * 5.0)
		throw new std.DomainError("::try_lock_shared_for does not work in exact time.");

	// RELEASE READING LOCK FOR THE NEXT STEP
	for (let i: number = 0; i < READ_COUNT; ++i)
		await mtx.unlock_shared();
}