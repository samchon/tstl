namespace std.example
{
	export class ContainerTest
	{
		public constructor()
		{
			this.testList("vector");
			this.testList("list");
			//this.testUnorderedSet();
			//this.testUnorderedMap();
			//this.testEqualRange();
		}

		private testList(type: string): void
		{
			let intList;
			if (type == "vector")
				intList = new Vector<number>();
			else
				intList = new List<number>();

			for (let i: number = 0; i < 10; i++)
				intList.pushBack(i);

			let it = intList.begin().advance(3);
			it = intList.erase(it); // erase 3
			console.log(it.value); // print 4

			it = intList.begin().advance(2);
			it = intList.insert(it, -1); // insert -1
			console.log(it.next().value); // print 2

			it = intList.begin().advance(6);
			it = intList.erase(it, it.advance(3)); // erase from 6 to 9
			//console.log(it.value); // print 9
			console.log(it.equals(intList.end()));

			console.log("-------------------------------------");
			for (let it = intList.begin(); !it.equals(intList.end()); it = it.next())
				console.log(it.value);
		}

		private testUnorderedSet(): void
		{
			document.write("<h4> HashSet </h4>\n");

			// CONSTRUCT LIST WITH ELEMENTS 0 TO 9
			let container = new HashSet<number>();
			for (let i: number = 0; i < 10; i++)
				container.insert(i);

			// ELEMENTS I/O
			document.write
			(
				"Erase 7<br>\n" +
				"Insert -5 (x3)<br>\n" +
				"Erase 3<br><br>\n\n"
			);
			
			container.erase(7);
			container.insert(-5);
			container.insert(-5);
			container.insert(-5);
			container.erase(3);
			container.erase(3);
			container.erase(100);
			
			// PRINTS
			document.write("Elements in the UnorderedSet: #" + container.size() + "<br>\n");
			document.write("<ul>\n");

			for (let it = container.begin(); it.equals(container.end()) == false; it = it.next())
				document.write("<li>" + it.value + "</li>\n");

			document.write("<li>count(-5): #" + container.count(-5) + "</li>\n");

			document.write("</ul>\n\n");
		}

		private testUnorderedMap()
		{
			document.write("<h4> TreeMultiMap </h4>\n");

			// CONSTRUCT LIST WITH ELEMENTS 0 TO 9
			let container = new TreeMultiMap<number, number>();
			for (let i: number = 0; i < 10; i++)
				container.insert(new Pair<number, number>(i, i));

			// ELEMENTS I/O
			document.write
			(
				"Erase 7<br>\n" +
				"Insert -5 (x3)<br>\n" +
				"Erase 3<br><br>\n\n"
			);

			container.erase(7);
			container.insert(new Pair<number, number>(-5, -5));
			container.insert(new Pair<number, number>(-5, -5));
			container.insert(new Pair<number, number>(-5, -5));
			container.erase(3);
			container.erase(3);
			container.erase(100);
			
			// PRINTS
			document.write("Elements in the UnorderedMap: #" + container.size() + "<br>\n");
			document.write("<ul>\n");

			for (let it = container.begin(); it.equals(container.end()) == false; it = it.next())
				document.write("<li>" + it.first + ": " + it.second + "</li>\n");

			document.write("<li>count(-5): #" + container.count(-5) + "</li>\n");

			document.write("</ul>\n\n");
		}

		private testEqualRange(): void
		{
			let intSet = new TreeMultiMap<number, number>();
			for (let i = 0; i <= 70; i += 2)
				//for (let j = 0; j < 4; j++)
					intSet.insert(new Pair<number, number>(i, i));

			document.write("Matched node: 4<br>\n");
			document.write("&nbsp;&nbsp;&nbsp;&nbsp;lower bound: " + intSet.lowerBound(4).first + "<br>\n");
			document.write("&nbsp;&nbsp;&nbsp;&nbsp;upper bound: " + intSet.upperBound(4).first + "<br>\n");
			document.write("<br>\n");

			for (let i = 1; i <= 50; i += 2)
			{
				document.write("Mis-matched node: " + i + "<br>\n");
				document.write("&nbsp;&nbsp;&nbsp;&nbsp;lower bound: " + intSet.lowerBound(i).first + "<br>\n");
				document.write("&nbsp;&nbsp;&nbsp;&nbsp;upper bound: " + intSet.upperBound(i).first + "<br>\n");
				document.write("<br>\n");
			}
		}

		public static main(): void
		{
			new ContainerTest();
		}
	}
}