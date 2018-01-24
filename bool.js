const std = require("./lib/tstl");

function rand_bool()
{
	return Math.random() < .5 ? false : true;
}
function rand_between(x, y)
{
	return Math.round(Math.random() * (y - x)) + x;
}

function validate(v, d, l, vb)
{
	let exp = null;

	if (v.size() != d.size() || std.equal(v.begin(), v.end(), d.begin()) == false)
		exp = new std.DomainError("Invalid deque");
	else if (v.size() != l.size() || std.equal(v.begin(), v.end(), l.begin()) == false)
		exp = new std.DomainError("Invalid list");
	else if (v.size() != vb.size() || std.equal(v.begin(), v.end(), vb.begin()) == false)
		exp = new std.DomainError("Invalid vector_bool");
	
	if (exp != null)
		throw exp;
}

function modify(v, d, l, vb, func)
{
	func(v);
	func(d);
	func(l);
	func(vb);
}

function main()
{
	let v = new std.Vector();
	let d = new std.Deque();
	let l = new std.List();
	let vb = new std.experiments.VectorBool();

	//----
	// PARTIAL TESTS
	//----
	// INITIALIZE WITH 10 FALSES
	modify(v, d, l, vb, function (obj)
	{
		obj.assign(10, false);
	});

	// REPEAT INSERTIONS
	for (let i = 0; i < 100; ++i)
	{
		let pos = rand_between(0, v.size());
		let size = rand_between(1, 10);
		let value = rand_bool();

		modify(v, d, l, vb, function (obj)
		{
			obj.insert(obj.begin().advance(pos), size, value);
		});
		validate(v, d, l, vb);
	}

	// REPEAT DELETIONS
	for (let i = 0; i < 100; ++i)
	{
		let first = rand_between(0, v.size() - 1);
		let last = rand_between(first + 1, v.size());

		modify(v, d, l, vb, function (obj)
		{
			obj.erase(obj.begin().advance(first), obj.begin().advance(last));
		});
		validate(v, d, l, vb);

		if (v.empty())
			break;
	}

	//----
	// REPEATED INSERTIONS & DELETIONS KEEPING SIZE
	//----
	// ASSIGN 10 FLAGS
	let initial_value = rand_bool();

	modify(v, d, l, vb, function (obj)
	{
		obj.assign(100, initial_value);
	});

	// CHANGE VALUES RANDOMLY
	// for (let i = 0; i < 100; ++i)
	// {
	// 	let index = rand_between(0, 99);
	// 	let value = rand_bool();

	// 	modify(v, d, l, vb, function (obj)
	// 	{
	// 		obj.begin().advance(index).value = value;
	// 	});
	// 	validate(v, d, l, vb);
	// }

	// MASS DELETIONS AND INSERTIONS KEEPING SIZE
	for (let i = 0; i < 100; ++i)
	{
		// ERASE ELEMENTS
		let first_index = rand_between(0, v.size());
		let last_index = rand_between(first_index + 1, v.size());

		if (v.empty() || first_index >= last_index)
			continue;

		modify(v, d, l, vb, function (obj)
		{
			obj.erase(obj.begin().advance(first_index), obj.begin().advance(last_index));
		});

		let is_invalid_tree = false;
		for (let entry of vb.data_)
			if (entry.first >= vb.size())
			{
				console.log("Invalid Tree", entry.first, vb.size());
				is_invalid_tree = true;
			}
		if (is_invalid_tree)
			std.terminate();

		// INSERT ELEMENTS
		let index = rand_between(0, v.size());
		let size = last_index - first_index;
		let value = rand_bool();

		modify(v, d, l, vb, function (obj)
		{
			obj.insert(obj.begin().advance(index), size, value);
		});

		try
		{
			validate(v, d, l, vb);
		} 
		catch (exp)
		{
			console.log("Parameters", first_index, last_index, index, size, value);
			for (let i = 0; i < v.size(); ++i)
				if (v.at(i) != vb.at(i))
				{
					if (i != 0)
						console.log("Previous Index => " + (i-1), v.at(i-1), vb.at(i-1));
					console.log("Index => " + i, v.at(i), vb.at(i));

					for (let entry of vb.data_)
						console.log("\t", entry);

					break;
				}

			throw exp;
		}
	}
}
main();