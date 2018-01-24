const std = require("./lib/tstl");

let m = new std.TreeMap();
m.emplace(0, false);

let it = m.lower_bound(0);
m.erase(it, m.end());
console.log(m.size());