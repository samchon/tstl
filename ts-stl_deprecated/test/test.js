/// <reference path="../lib/typescript-stl.d.ts" />
global["std"] = require("ts-stl");
/**
 * Test insert and erase function in std.HashMap<number, string>.
 */
function main() {
    /////////////////////////////////////
    // CONSTRUCT DATA FROM 1 TO 10
    /////////////////////////////////////
    var map = new std.HashMap();
    for (var i = 0; i < 10; i++)
        map.insert([i, "Its key is " + i]);
    /////////////////////////////////////
    //  ELEMENT I/O
    /////////////////////////////////////
    //// ERASE AN ELEMENT
    var it = map.find(3); // find 3.
    it = map.erase(it); // erase 3. [it] points key 4.
    console.log(it.first); // prints key 4.
    // INSERT AN ELEMENT
    it = map.begin().advance(2); // [it] points key 2 (0 ----> 2)
    it = map.insert(it, [-1, "Its key is -1"]);
    // [it] points key -1=
    // key list: [0, 1, -1, 2, 4, 5, 6, 7, 8, 9]
    console.log(it.next().first); // prints 2, next of [it] (-1 -> 2)
    // RANGE ERASER
    var px = map.begin().advance(6);
    var py = map.begin().advance(9);
    it = map.erase(map.begin().advance(6), map.begin().advance(9));
    // erase elements from 6th until 9th.
    // INSPECT ELEMENTS BY THEIR KEY
    // key list: [0, 1, -1, 2, 4, 5, 9]
    console.log("has 7:", map.has(7));
    console.log("count 5:", map.count(5));
    console.log("it is end():", it.equal_to(map.end()));
    /////////////////////////////////////
    // PRINT ALL ELEMENTS
    /////////////////////////////////////
    console.log("------------------------------");
    // key list: [0, 1, -1, 2, 4, 5, 9]
    for (var it_1 = map.begin(); !it_1.equal_to(map.end()); it_1 = it_1.next())
        console.log(it_1.second);
    /* OUTPUT
    =========================================
    4
    2
    has 7: true
    count 5: 1
    it is end(): false
    ------------------------------
    Its key is 0
    Its key is 1
    Its key is -1
    Its key is 2
    Its key is 4
    Its key is 5
    Its key is 9
    =========================================
    */
}
main();
