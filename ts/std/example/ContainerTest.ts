namespace std.example
{
	export class ContainerTest
	{
		public constructor()
		{
			this.testList();
			this.testUnorderedSet();
			this.testUnorderedMap();
			this.testEqualRange();
		}

		private testList(): void
		{
			document.write("<h4> List </h4>\n");

			// CONSTRUCT LIST WITH ELEMENTS 0 TO 9
			let container = new Vector<number>();
			for (let i: number = 0; i < 10; i++)
			{
				container.pushBack(Math.random() * 100.0);
			}

			// ELEMENTS I/O
			document.write
			(
				"Erase of 7th element<br>\n" +
				"Insert (-5) as 5th element<br>\n" +
				"Erase of 3rd element<br><br>\n\n"
			);

			container.erase(container.begin().advance(7));
			container.insert(container.begin().advance(5), -5);
			container.erase(container.begin().advance(3));

			// PRINTS
			document.write("Elements in the List: #" + container.size() + "<br>\n");
			document.write("<ul>\n");

			for (let it = container.begin(); it.equals(container.end()) == false; it = it.next())
				document.write("\t<li>" + it.value + "</li>\n");

			// SORTING
			sort(container.begin(), container.end());

			// PRINTS
			document.write("Elements in the List: #" + container.size() + "<br>\n");
			document.write("<ul>\n");

			for (let it = container.begin(); it.equals(container.end()) == false; it = it.next())
				document.write("\t<li>" + it.value + "</li>\n");

			document.write("</ul>\n\n");
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