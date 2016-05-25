/// <reference path="../API.ts" />

namespace std.base
{
	/**
	 * <p> Static class holding enumeration codes of color of Red-black tree. </p>
	 *
	 * <p> Color codes imposed to nodes of RB-Tree are following those rules: </p>
	 *
	 * <ol>
	 *	<li> A node is either <font color='red'>red</font> or <font color='darkBlue'>black</font>. </li>
	 *	<li> The root is <font color='darkBlue'>black</font>. This rule is sometimes omitted. Since the root can
	 *		 always be changed from <font color='red'>red</font> to <font color='darkBlue'>black</font>, but not
	 *		 necessarily vice versa, this rule has little effect on analysis. </li>
	 *	<li> All leaves (NIL; <code>null</code>) are <font color='darkBlue'>black</font>. </li>
	 *  <li> If a node is <font color='red'>red</font>, then both its children are
	 *		 <font color='darkBlue'>black</font>. </li>
	 *  <li> Every path from a given node to any of its descendant NIL nodes contains the same number of
	 *		 <font color='darkBlue'>black</font> nodes. Some definitions: the number of
	 *		 <font color='darkBlue'>black</font> nodes from the root to a node is the node's
	 *		 <font color='darkBlue'>black</font> depth; the uniform number of <font color='darkBlue'>black</font>
	 *		 nodes in all paths from root to the leaves is called the <font color='darkBlue'>black</font>-height of
	 *		 the red-black tree. </li>
	 * </ol>
	 *
	 * @author Migrated by Jeongho Nam <http://samchon.org>
	 */
	export enum Color
	{
		/**
		 * <p> Code of color black. </p>
		 *
		 * <ul>
		 *	<li> Those are clearly black: root, leaf nodes or children nodes of red. </li>
		 *	<li> Every path from a given nodes containes the same number of black nodes exclude NIL(s). </li>
		 * </ul>
		 */
		BLACK,
		
		/**
		 * <p> Code of color red. </p>
		 */
		RED
	}
}