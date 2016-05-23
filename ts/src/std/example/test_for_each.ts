namespace std.example
{
	export function test_for_each()
	{
		let array: std.Vector<number> = new std.Vector<number>();
		
		for (let i: number = 0; i < 20; i++)
			array.push_back(i);

		let fn = std.for_each(array.begin(), array.end(), function (val: number): void { console.log(val); });
	}
}