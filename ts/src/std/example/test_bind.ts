namespace std.example
{
	export function test_bind(): void
	{
		let list: std.List<number> = new std.List<number>();

		// <List>???.insert(...)
		// list.insert(list.end(), 5, 1)
		let fn = std.bind(std.List.prototype.insert);
		fn(list, list.end(), 5, 1);
		debug_list();
		
		// <List>???.clear(...)
		// list.clear()
		fn = std.bind(std.List.prototype.clear);
		fn(list);
		debug_list();

		// <List>???.insert(_1, _2, 5, _3)
		// list.insert(list.end(), 5, 2)
		fn = std.bind(std.List.prototype.insert, std.placeholders._1, std.placeholders._2, 5, std.placeholders._3);
		fn(list, list.end(), 2);
		debug_list();

		function debug_list(): void
		{
			console.log("#" + list.size());
			for (let it = list.begin(); !it.equal_to(list.end()); it = it.next())
				console.log(it.value);
			console.log("----------------------------------------------------------");
		}
	}
}