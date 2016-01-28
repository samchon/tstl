/// <reference path="../List.ts" />
/// <reference path="../UnorderedSet.ts" />

namespace std.example
{
    export class ContainerTest
    {
        public constructor()
        {
            document.write("<h3> Container Test </h3>\n\n");

            this.testList();
            this.testUnorderedSet();
        }

        private testList(): void
        {
            document.write("<h4> List </h4>\n");

            // CONSTRUCT LIST WITH ELEMENTS 0 TO 9
            var container = new List<number>();
            for (var i: number = 0; i < 10; i++)
                container.pushBack(i);

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

            for (var it = container.begin(); it.equals(container.end()) == false; it = it.next())
                document.write("\t<li>" + it.value + "</li>\n");

            document.write("</ul>\n\n");
        }

        private testUnorderedSet(): void
        {
            document.write("<h4> UnorderedSet </h4>\n");

            // CONSTRUCT LIST WITH ELEMENTS 0 TO 9
            var container = new UnorderedSet<number>();
            for (var i: number = 0; i < 10; i++)
                container.insert(i);

            // ELEMENTS I/O
            document.write
            (
                "Erase 7<br>\n" +
                "Insert -5<br>\n" +
                "Erase 3<br><br>\n\n"
            );
            
            container.erase(7);
            container.insert(-5);
            container.insert(-5);
            container.insert(-5);
            container.insert(-5);
            container.erase(3);
            container.erase(3);
            container.erase(100);
            
            // PRINTS
            document.write("Elements in the UnorderedSet: #" + container.size() + "<br>\n");
            document.write("<ul>\n");

            for (var it = container.begin(); it.equals(container.end()) == false; it = it.next())
                document.write("<li>" + it.value + "</li>\n");

            document.write("</ul>\n\n");
        }

        public static main(): void
        {
            new ContainerTest();

			var obj: Object = new Object();
			obj["id"] = "samchon";
			obj["name"] = "Jeongho Nam";

			std.less(obj, {});

			document.writeln(JSON.stringify(obj));
        }
    }
}