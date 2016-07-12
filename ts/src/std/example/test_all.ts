/// <reference path="../API.ts" />

namespace std.example
{
	export function test_all(): void
	{
		//for (let key in std.example)
		//	if (key != "test_all" && std.example[key] instanceof Function)
		//		std.example[key]();

		let vec1: Vector<number> = new Vector<number>();
		let vec2: Vector<number> = new Vector<number>();

		let fn1 = vec1.insert.bind(vec1);
		let fn2 = vec1.insert.bind(vec1);
		let fn3 = vec2.insert.bind(vec2);

		console.log(fn1["__get_m_iUID"](), fn1["__get_m_iUID"]());
		console.log(fn2["__get_m_iUID"]());
		console.log(fn3["__get_m_iUID"]());
	}
}