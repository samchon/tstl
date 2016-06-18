/**
 * <h1> TypeScript-STL </h1>
 * <p> <a href="https://nodei.co/npm/typescript-stl">
 *	<img src="https://nodei.co/npm/typescript-stl.png?downloads=true&downloadRank=true&stars=true"> </a> </p>
 * 
 * <p> GitHub Repository: https://github.com/samchon/stl </p>
 * 
 * 
 * <h2> Introduction </h2>
 * <p> STL (Standard Template Library) Containers and Algorithms for TypeScript. </p>
 * 
 * <p> TypeScript-STL is a TypeScript's <b>Standard Template Library</b> who is migrated from C++ STL. Most of classes
 * and functions of STL have implemented. Just enjoy it. </p>
 * 
 * <p> <img src="http://samchon.github.io/stl/api/assets/images/design/abstract_containers.png"
 *			alt="Abstract Containers"
 *			style="max-width: 100%" /> </p>
 * 
 * <h4> Containers </h4>
 * <ul>
 *	<li> Linear Containers </li>
 *	<ul>
 *		<li> <a href="http://samchon.github.io/stl/api/classes/std.vector.html">Vector</a> </li>
 *		<li> <a href="http://samchon.github.io/stl/api/classes/std.list.html">List</a> </li>
 *		<li> <a href="http://samchon.github.io/stl/api/classes/std.deque.html">Deque</a> </li>
 *		<li> Miscellaneous </li>
 *		<ul>
 *			<li> <a href="http://samchon.github.io/stl/api/classes/std.queue.html">Queue</a> </li>
 *			<li> <a href="http://samchon.github.io/stl/api/classes/std.stack.html">Stack</a> </li>
 *			<li> <a href="http://samchon.github.io/stl/api/classes/std.priorityqueue.html">PriorityQueue</a> </li>
 *		</ul>
 *	</ul>
 *	<li> <a href="http://samchon.github.io/stl/api/classes/std.base.tree.rbtree.html">Tree-structured Containers</a> </li>
 *	<ul>
 *		<li> 
 *			<a href="http://samchon.github.io/stl/api/classes/std.treeset.html">TreeSet</a>,
 *			<a href="http://samchon.github.io/stl/api/classes/std.treemultiset.html">TreeMultiSet</a>
 *		</li>
 *		<li>
 *			<a href="http://samchon.github.io/stl/api/classes/std.treemap.html">TreeMap</a>,
 *			<a href="http://samchon.github.io/stl/api/classes/std.treemultimap.html">TreeMultiMap</a>
 *		</li>
 *	</ul>
 *	<li> <a href="http://samchon.github.io/stl/api/classes/std.base.hash.hashbuckets.html">Hashed Containers</a> </li>
 *	<ul>
 *		<li>
 *			<a href="http://samchon.github.io/stl/api/classes/std.hashset.html">HashSet</a>,
 *			<a href="http://samchon.github.io/stl/api/classes/std.hashmultiset.html">TreeMultiset</a>
 *		</li>
 *		<li>
 *			<a href="http://samchon.github.io/stl/api/classes/std.hashmap.html">HashMap</a>,
 *			<a href="http://samchon.github.io/stl/api/classes/std.HashMultiMap.html">HashMultiMap</a>
 *		</li>
 *	</ul>
 * </ul>
 * 
 * <h4> Global Functions </h4>
 * <ul>
 *	<li> <a href="http://www.cplusplus.com/reference/algorithm">&lt;algorithm&gt;</a> </li>
 *	<li> <a href="http://www.cplusplus.com/reference/exception">&lt;exceptional&gt;</a> </li>
 *	<li> <a href="http://www.cplusplus.com/reference/functional">&lt;functional&gt;</a> </li>
 *	<ul>
 *		<li> <a href="http://samchon.github.io/stl/api/classes/std.bind.html">std.bind</a> </li>
 *	</ul>
 *	<li> &lt;utility&gt; </li>
 *	<ul>
 *		<li> <a href="http://samchon.github.io/stl/api/classes/std.pair.html">std.Pair</a> </li>
 *	</ul>
 * </ul>
 * 
 *
 * <h2> References </h2>
 * <p> You can learn and explore about TypeScript-STL more deeply with such below: </p>
 * <ul>
 *	<li> <a href="https://github.com/samchon/stl">GitHub Repository</a> </li>
 *	<li> <a href="https://github.com/samchon/stl/wiki">Guidebook (wiki)</a> </li>
 *	<li> <a href="http://samchon.github.io/stl/api">API Documents</a> </li>
 *	<li> <a href="https://samchon.github.io/stl/design/class_diagram.pdf">Class Diagram</a> </li>
 * </ul>
 * 
 * 
 * <h2> Installation </h2>
 * <h4> Node </h4>
 * <code> npm install -g typescript-stl </code>
 * 
 * <h5> TypeScript </h5>
 * <code>
 * // SOMEWHERE PLACE NODE AND STL HEADERS EXIST
 * /// <reference path="node.d.ts" />
 * /// <reference path="typescript-stl.d.ts" />
 * 
 * global["std"] = require("typescript-stl");
 * let list: std.List<string> = new std.List<string>();
 * </code>
 * 
 * <h5> Pure JavaScript </h5>
 * <code>
 * var std = require("typescript-stl");
 * var list = new std.List();
 * </code>
 * 
 * <h4> Browser </h4>
 * <h5> In HTML Document </h5>
 * 
 * <h5> TypeScript, reference difinitions (header) </h5>
 * <code>
 * /// <reference path="typescript-stl.d.ts" />
 * </code>
 * 
 * 
 * <h2> Index of Guidance, Wiki </h2>
 * <ul>
 *	<li> <a href="https://github.com/samchon/stl/wiki/Home"><b>Outline</b></a> </li>
 *	<ul>
 *		<li> <a href="https://github.com/samchon/stl/wiki/Home#introduction">Introduction</a> </li>
 *		<li> <a href="https://github.com/samchon/stl/wiki/Home#references">References</a> </li>
 *		<li> <a href="https://github.com/samchon/stl/wiki/Home#installation">Installation</a> </li>
 *	</ul>
 *	<li> <a href="https://github.com/samchon/stl/wiki/Differences"><b>Differences between C++</b></a> </li>
 *	<ul>
 *		<li> <a href="https://github.com/samchon/stl/wiki/Differences#naming-convention">Naming Convention</a> </li>
 *		<li> <a href="https://github.com/samchon/stl/wiki/Differences#operator-overriding">Operator Overring</a> </li>
 *		<li> <a href="https://github.com/samchon/stl/wiki/Differences#iterator">Iterator</a> </li>
 *		<li> <a href="https://github.com/samchon/stl/wiki/Differences#tree-container">Tree Container</a> </li>
 *		<li> <a href="https://github.com/samchon/stl/wiki/Differences#hash-container">Hash Container</a> </li>
 *	</ul>
 *	<li> <a href="https://github.com/samchon/stl/wiki/Tutorial"><b>Tutorial</b></a> </li>
 *	<ul>
 *		<li> <a href="https://github.com/samchon/stl/wiki/Tutorial#linear-container">Linear Container</a> </li>
 *		<li> <a href="https://github.com/samchon/stl/wiki/Tutorial#tree-container">Tree Container</a> </li>
 *		<li> <a href="https://github.com/samchon/stl/wiki/Tutorial#hash-container">Hash Container</a> </li>
 *		<li> <a href="https://github.com/samchon/stl/wiki/Tutorial-Miscellaneous">Miscellaneous</a> </li>
 *		<ul>
 *			<li> <a href="https://github.com/samchon/stl/wiki/Tutorial-Miscellaneous#algorithm">Algorithm</a> </li>
 *			<li> <a href="https://github.com/samchon/stl/wiki/Tutorial-Miscellaneous#functional">Functional</a> </li>
 *		</ul>
 *	</ul>
 * </ul>
 * 
 * @author Jeongho Nam <http://samchon.org>
 */
namespace std
{
}

/**
 * Base classes composing STL in background.
 *
 * @author Jeongho Nam <http://samchon.org>
 */
namespace std.base
{
}

/**
 * Examples for supporting developers who use STL library.
 *
 * @author Jeongho Nam <http://samchon.org>
 */
namespace std.example
{
}
