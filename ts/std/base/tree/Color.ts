namespace std.base.tree
{
	/**
	 * <p> Static class holding enumeration codes of color of Red-black tree. </p>
	 *
	 * <p> Color codes imposed to nodes of RB-Tree are following those rules: </p>
	 *
	 * <ol>
	 *	<li> A node is either red or black. </li>
	 *	<li> The root is black. This rule is sometimes omitted. Since the root can always be changed from red to 
	 *		 black, but not necessarily vice versa, this rule has little effect on analysis. </li>
	 *	<li> All leaves (NIL; <code>null</code>) are black. </li>
	 *  <li> If a node is red, then both its children are black. </li>
	 *  <li> Every path from a given node to any of its descendant NIL nodes contains the same number of black 
	 *		 nodes. Some definitions: the number of black nodes from the root to a node is the node's black depth; 
	 *		 the uniform number of black nodes in all paths from root to the leaves is called the black-height of 
	 *		 the red–black tree. </li>
	 * </ol>
	 *
	 * @author Migrated by Jeongho Nam
	 */
	export class Color
	{
		/**
		 * <p> Code of color black. </p>
		 *
		 * <ul>
		 *	<li> Those are clearly black: root, leaf nodes or children nodes of red. </li>
		 *	<li> Every path from a given nodes containes the same number of black nodes exclude NIL(s). </li>
		 * </ul>
		 */
		public static get BLACK(): boolean { return false; }
		
		/**
		 * <p> Code of color red. </p>
		 *
		 * 
		 */
		public static get RED(): boolean { return true; }
	}
}