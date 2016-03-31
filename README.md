# STL for TypeScript
STL (Standard Template Library) and Containers for TypeScript

## Programming
##### Containers
- Linear containers
    - Vector
    - List
    - Deque
    - Queue
    - Stack
- Tree-structured containers
    - TreeSet
    - TreeMap
    - TreeMultiSet
    - TreeMultiMap
- Hashed containers
    - HashSet
    - HashMap
    - HashMultiSet
    - HashMultiMap

##### Usage
```typescript
function testHashMap(): void
{
    /////////////////////////////////////
    // CONSTRUCT DATA FROM 1 TO 10
    /////////////////////////////////////
    let map: std.HashMap<number, string> = new std.HashMap<number, string>();
    for (let i: number = 0; i < 10; i++)
        map.set(i, "Its key is " + i);
    
    /////////////////////////////////////
    //  ELEMENT I/O
    /////////////////////////////////////
    // ERASE AN ELEMENT
    let it = map.erase(3); // erase 3. [it] points key 4.
    console.log(it.first); // prints key 4.
    
    // INSERT AN ELEMENT
    it = map.begin().advance(2) // [it] points key 2 (0 ----> 2)
    it = map.insert(it, new Pair<number, string>(-1, "Its key is -1"); 
        // [it] points key -1
        // key list: [0, 1, -1, 2, 4, 5, 6, 7, 8, 9]
    console.log(it.next().first); // prints 2, next of [it] (-1 -> 2)
    
    // RANGE ERASER
    it = map.erase(map.begin().advance(6), map.begin().advance(9)); 
        // erase elements from 6th until 9th.
    
    // INSPECT ELEMENTS BY THEIR KEY
    // key list: [0, 1, -1, 2, 4, 5, 9]
    console.log("has 7:", map.has(7));
    console.log("count 5:", map.count(5));
    console.log("it is end():", (it == map.end()));
    
    /////////////////////////////////////
    // PRINT ALL ELEMENTS
    /////////////////////////////////////
    console.log("------------------------------");
    
    // key list: [0, 1, -1, 2, 4, 5, 9]
    for (let it = map.begin(); it != map.end(); it = it.next())
        console.log(it.second);
        
    /* OUTPUT
    =========================================
        4
        2
        true
        1
        false
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

function testSorting(): void
{
    let cubeList: std.List<Cube> = new std.List<Cube>();
    for (let i: number = 0; i < 10; i++)
        cubeList.pushBack(new Cube());
        
    // SORT BY Cube.less()
    std.sort(cubeList.begin(), cubeList.end());
    
    // SORT BY inline function
    std.sort(cubeList.begin(), cubeList.end(),
        function (left: Cube, right: Cube): boolean
        {
            if (left.x != right.x)      return left.x < right.x;
            else if (left.y != right.y) return left.y < right.y;
            else                        return left.z < right.z;
        }
    );
}

class Cube
{
    public width: number;
    public height: number;
    public length: number;
    public x: number;
    public y: number;
    public z: number;
    
    public constructor()
    {
        this.width = Math.random() * 10;
        this.height = Math.random() * 10;
        this.length = Math.random() * 10;
        this.x = Math.random() * 100 - 50;
        this.y = Math.random() * 100 - 50;
        this.z = Math.random() * 100 - 50;
    }
    public get volume(): number
    {
        return this.width * this.height * this.length;
    }
    
    public less(obj: Cube): boolean
    {
        return this.volume < obj.volume;
    }
}

```

## References
##### Homepages
- Formal Homepage: http://samchon.github.io/stl
- API Documents: http://samchon.github.io/stl/api

##### Projects using STL for TypeScript
- Samchon Framework: https://github.com/samchon/framework
- Packer: https://github.com/betterwaysystems/packer
- Samchon UML: https://github.com/samchon/uml
