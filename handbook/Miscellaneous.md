## &lt;algorithm&gt;
#### std.any_of

``` typescript
namespace std.example
{
	export function test_any_of(): void
	{
		// CONSTRUCT A HEIGHT ARRAY
		let heights: std.Vector<number> = new std.Vector<number>();
		for (let i: number = 0; i < 100; i++)
			heights.push_back(Math.random() * 50 + 150);
	
		// OVER 195 EXISTS?
		let any_over_195: boolean = std.any_of
			(
				heights.begin(), heights.end(),
				function (val: number): boolean
				{
					return val >= 195;
				}
			);
		console.log("Anyone over 195 exists", any_over_195);
		
		// ALL OVERS 155?
		let all_over_155: boolean = std.all_of
			(
				heights.begin(), heights.end(),
				function (val: number): boolean
				{
					return val >= 155;
				}
			);
		console.log("All over 155, all_over_155);
	
		// CONTINU
		test_find(heights);
		test_count_if(heights);
	}
	
	function test_find(heights: std.Vector<number>): void
	{
		// FIND 185
		let it = std.find(heights.begin(), heights.end(), 185);
		
		if (it.equal_to(heights.end())) //UNABLE TO FIND
			console.log("No one is 185.");
		else // FOUND AND GOT THE ITERATOR
			console.log(it.index + " (th) element is 185.");
	}
	
	function test_count_if(heights: std.Vector<number>): void
	{
		// COUNTS BETWEEN 175 ~ 185
		let count: number = std.count_if
			(
				heights.begin(), heights.end(), // RANGE ITERATORS
				function (val: number): boolean // LAMDA FUNCTION
				{
					return 175 <= val && val < 185;
				});
		console.log("count of height between 175 and 185: " + count);
	}
}
```

#### std.sort
#### std.reverse_copy
#### std.replace_copy_if
#### std.partial_sort

## &lt;functional&gt;
#### std.bind
``` typescript
namespace std.example
{
	export function test_bind(): void
	{
		// CONSTRUCT WITH 9 ELEMENT TWICE.
		let list: std.List<number> = new std.List<number>(2, 9);
		
		///////
		// NO PARAMETER OF FUNCTION, BUT TARGET OBJECT IS
		///////
		// fn1 = _1.clear();
		let fn1 = std.bind(std.prototype.clear);
		fn1(list);
		
		trace_list(fn1, "fn1");
		
		///////
		// WITHOUT DEFAULT BINDED PARAMETER
		///////
		// fn2 = _1.insert(...);
		let fn2 = std.bind(std.List.prototype.insert);
		fn2(list, list.end(), 5, 1); // list.insert(list.end(), 4, 1);
		
		trace_list(fn2, "fn2");
		
		///////
		// WITH DEFAULT BINDED PARAMETERS
		///////
		// fn3 = _1.insert(_2, 4, _3);
		let fn3 = std.bind(std.List.prototype.insert, std.placeholders._1, std.placeholders._2, 5, std.placeholders._3);
		fn3(list, list.end(), 2); // list.insert(list.end(), 5, 2);
		
		trace_list(fn3, "fn3");
		
		// TRACER
		function trace_list(list: std.List<number>, title: string): void
		{
			let message: string = title + ": ";
			for (let it = list.begin(); !it.equal_to(list.end()); it = it.next())
				message += it.value + " ";
				
			console.log(message);
		}
	}
}
```

``` console
Default: 9 9
fn: 
fn2: 1 1 1 1
fn3: 1 1 1 1 2 2 2 2
```

#### relational operator
``` typescript
namespace std.example
{
	export function test_relational_operators(): void
	{
		class Box
		{
			private width: number;
			private height: number;
			private length: number;
		
			public constructor(width: number, height: number, length: number)
			{
				this.width = width;
				this.height = height;
				this.length = length;
			}
			
			public getVolume(): number
			{
				return this.width * this.height * this.length;
			}
			
			// USED IN std.less(x: Box, y: Box)
			public less(obj: Box): boolean
			{
				return this.getVolume() < obj.getVolume();
			}
			
			// USED IN std.equal_to(x: Box, y: Box)
			public equal_to(obj: Box): boolean
			{
				return this.getVolume() == obj.getVolume();
			}
		}
		
		let b1: Box = new Box(3, 4, 5);
		let b2: Box = new Box(4, 5, 3);
		let b3: Box = new Box(4, 5, 6);
		
		console.log("b1 < b2", std.less(b1, b2));
		console.log("b2 <= b3", std.less_equal(b2, b3));
		console.log("b3 > b1", std.greater(b3, b1));
		console.log("b1 >= b2", std.greater_equal(b1, b2));
		console.log("b1 == b2", std.equal_to(b1, b2));
		console.log("b1 != b2", std.not_equal_to(b1, b2));
	}
}
```

``` console
b1 < b2, false
b2 <= b3, true
b3 > b1, true
b1 >= b2, true
b1 == b2, true
b1 != b2, false
```


## &lt;utilty&gt;
#### std.Pair

``` typescript
namespace std.example
{
	export function test_pair(): void
	{
		// PAIR HAS TWO PUBLIC MEMBERS; FIRST AND SECOND
		let pair1: std.Pair<string, number> = new std.Pair<string, number>("John Doe", 35);
		console.log(pair1.first, pair1.second);
		pair1.second++;
		
		// PAIR CAN ALSO CAN BE CONSTRUCTED BY std.make_pair
		let pair2 = std.make_pair("A corporation", 15);
		let pair3 = std.make_pair("A corporation", 25);
		
		// COMPARISON OF PAIR BEGINS FROM 'first' AND 'second' LATER
		console.log("pair1 < pair2", std.less(pair1, pair2)); // FALSE, 'J'ohn Doe is greater than 'A' corporation.
		console.log("pair2 < pair3", std.less(pair2, pair3)); // TRUE, 15 is less than 25.
	
		///////
		// MAP CONTAINER CONTAINS PAIR ELEMENTS.
		///////
		let map = new std.TreeMap<string, number>();	
		map.insert(new std.Pair<string, number>("Jeongho Nam", 27));
		map.insert(std.make_pair("Kildong Hong", 40));
		
		// ITERATOR OF MAP CONTAINER ALSO FORMS PAIR STRUCTURE.
		for (let it = map.begin(); !it.equal_to(map.end()); it = it.next())
			console.log(it.first, it.second);
	}
}
```

``` console
John Doe, 35
pair1 < pair2, false
pair2 < pair3, true
Jeongho Nam, 27
Kildong Hong, 40
```