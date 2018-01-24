const std = require("./lib/tstl");

let m = new std.TreeMap();
m.emplace(2, 2);
m.emplace(3, 3);

let it = m.lower_bound(2);
console.log(it.value);

it = m.upper_bound(2);
console.log(it.value);