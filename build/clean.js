const fs = require("fs");

const EXCLUDES = ["build", "node_modules"];
const TARGETS = [".js", ".d.ts", ".js.map"];

function iterate(path)
{
	let directory = fs.readdirSync(path);
	
	for (let elem of directory)
	{
		let location = path + "/" + elem;
		let stat = fs.statSync(location);

		if (stat.isDirectory())
		{
			let skip = false;
			for (let exclude of EXCLUDES)
				if (elem == exclude)
				{
					skip = true;
					break;
				}
			if (!skip)
				iterate(location);
		}
		
		for (let target of TARGETS)
			if (elem.substr(-target.length) == target)
			{
				fs.unlinkSync(location);
				break;
			}
	}

	directory = fs.readdirSync(path);
	if (directory.length == 0)
		fs.rmdirSync(path);
}

iterate(__dirname + "/..");