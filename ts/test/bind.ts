/// <reference path="API.ts" />

namespace example
{
	export function bind(): void
	{
		let list: std.List<number> = new std.List<number>();

		// <List>???.insert(...)
		// list.insert(list.end(), 5, 1)
		let fn = std.bind(std.List.prototype.insert);
		fn(list, list.end(), 5, 1);
		debug_list();
		
		let fn2 = std.bind(std.List.prototype.clear);
		fn2(list);
		debug_list();

		// <List>???.insert(_1, _2, 5, _3)
		// list.insert(list.end(), 5, 2)
		let fn3 = std.bind(list.insert, std.placeholders._1, std.placeholders._2, 5, std.placeholders._3);
		fn3(list, list.end(), 2);
		debug_list();

		function debug_list(): void
		{
			console.log("#" + list.size());
			for (let it = list.begin(); !it.equals(list.end()); it = it.next())
				console.log(it.value);
			console.log("----------------------------------------------------------");
		}
	}
}