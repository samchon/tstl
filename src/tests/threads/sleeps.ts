import * as std from "../../index";

export async function test_sleeps(): Promise<void>
{
	await _Test_sleep_for();
	await _Test_sleep_until();
}

async function _Test_sleep_for(): Promise<void>
{
	// RECORD TIMEPOINTS DURING SLEEP_FOR
	let t1 = new Date();
	await std.sleep_for(500);
	let t2 = new Date();

	// VALIDATE THE SLEEP_FOR
	_Validate_sleep(t1, t2);
}

async function _Test_sleep_until(): Promise<void>
{
	// RECORD TIMEPOINTS DURING SLEEP_FOR
	let t1 = new Date();
	await std.sleep_until(new Date(t1.getTime() + 500));
	let t2 = new Date();

	// VAIDATE THE SLEEP_UNTIL
	_Validate_sleep(t1, t2);
}

function _Validate_sleep(t1: Date, t2: Date): void
{
	let ms: number = t2.getTime() - t1.getTime();
	if (ms < 500 - 100 || ms >= 500 + 100)
		throw new std.DomainError("sleep is wrong: " + ms);
}