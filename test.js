const std = require("./lib/tstl");

let vec = new std.Deque();
for (let i = 0; i < 10; ++i)
	vec.push_back(i);

let it = vec.begin().advance(3); // index: 3
it = vec.erase(it); // index: 3

console.log("it.index() =>", it.index(), vec.size());
console.log(it.value, 4);

it = vec.begin().advance(2); // index: 2
it = vec.insert(it, -1); // index: 2

console.log("it.index() =>", it.index(), vec.size());
console.log(it.value, -1);

it = vec.begin().advance(6); // index: 6
console.log("it.index() =>", it.index(), vec.size());

it = vec.erase(it, it.advance(3)); // index: 6
console.log("it.index() =>", it.index(), vec.size());

console.log(it.value, 9);