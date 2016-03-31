/// <reference path="XTree.ts" />

namespace std.base.tree
{
	/**
	 * <p> Red-black Tree. </p>
	 *
	 * <p> A red-black tree is a kind of self-balancing 
	 * binary search tree. Each node of the binary tree has an extra bit, and that bit is often interpreted as the 
	 * color (<font color='red'>red</font> or <font color='darkBlue'>black</font>) of the node. These color bits 
	 * are used to ensure the tree remains approximately balanced during insertions and deletions. </p>
	 *
	 * <p> Balance is preserved by painting each node of the tree with one of two colors (typically called 
	 * '<font color='red'>red</font>' and '<font color='darkBlue'>black</font>') in a way that satisfies certain 
	 * properties, which collectively constrain how unbalanced the tree can become in the worst case. When the tree 
	 * is modified, the new tree is subsequently rearranged and repainted to restore the coloring properties. The 
	 * properties are designed in such a way that this rearranging and recoloring can be performed efficiently. </p>
	 *
	 * <p> The balancing of the tree is not perfect but it is good enough to allow it to guarantee searching in 
	 * O(log n) time, where n is the total number of elements in the tree. The insertion and deletion operations, 
	 * along with the tree rearrangement and recoloring, are also performed in O(log n) time. </p>
	 *
	 * <p> Tracking the color of each node requires only 1 bit of information per node because there are only two 
	 * colors. The tree does not contain any other data specific to its being a 
	 * red-black tree so its memory footprint is almost 
	 * identical to a classic (uncolored) binary search tree. In many cases the additional bit of information can 
	 * be stored at no additional memory cost. </p>
	 *
	 * <h4> Properties </h4>
	 * <p> In addition to the requirements imposed on a binary search tree the following must be satisfied by a 
	 * red-black tree: </p>
	 *
	 * <ol>
	 *	<li> A node is either <font color='red'>red</font> or <font color='darkBlue'>black</font>. </li>
	 *	<li> 
	 *		The root is <font color='darkBlue'>black</font>. This rule is sometimes omitted. Since the root can 
	 *		always be changed from <font color='red'>red</font> to <font color='darkBlue'>black</font>, but not 
	 *		necessarily vice versa, this rule has little effect on analysis. 
	 *	</li>
	 *	<li> All leaves (NIL; <code>null</code>) are <font color='darkBlue'>black</font>. </li>
	 *  <li> 
	 *		If a node is <font color='red'>red</font>, then both its children are 
	 *		<font color='darkBlue'>black</font>. 
	 *	</li>
	 *  <li> 
	 *		Every path from a given node to any of its descendant NIL nodes contains the same number of 
	 *		<font color='darkBlue'>black</font> nodes. Some definitions: the number of 
	 *		<font color='darkBlue'>black</font> nodes from the root to a node is the node's 
	 *		<font color='darkBlue'>black</font> depth; the uniform number of <font color='darkBlue'>black</font> 
	 *		nodes in all paths from root to the leaves is called the <font color='darkBlue'>black</font>-height of 
	 *		the red-black tree. 
	 *	</li>
	 * </ol>
	 * 
	 * <p> <img src="../assets/images/tree/Red-black_tree_example.svg" width="100%" /> </p>
	 * 
	 * <p> These constraints enforce a critical property of red-black trees: the path from the root to the farthest 
	 * leaf is no more than twice as long as the path from the root to the nearest leaf. The result is that the tree 
	 * is roughly height-balanced. Since operations such as inserting, deleting, and finding values require 
	 * worst-case time proportional to the height of the tree, this theoretical upper bound on the height allows 
	 * red-black trees to be efficient in the worst case, unlike ordinary binary search trees. </p>
	 * 
	 * <p> To see why this is guaranteed, it suffices to consider the effect of properties 4 and 5 together. For a 
	 * red-black tree T, let B be the number of <font color='darkBlue'>black</font> nodes in property 5. Let the 
	 * shortest possible path from the root of T to any leaf consist of B <font color='darkBlue'>black</font> nodes. 
	 * Longer possible paths may be constructed by inserting <font color='red'>red</font> nodes. However, property 4 
	 * makes it impossible to insert more than one consecutive <font color='red'>red</font> node. Therefore, 
	 * ignoring any <font color='darkBlue'>black</font> NIL leaves, the longest possible path consists of 2*B nodes, 
	 * alternating <font color='darkBlue'>black</font> and <font color='red'>red</font> (this is the worst case). 
	 * Counting the <font color='darkBlue'>black</font> NIL leaves, the longest possible path consists of 2*B-1 
	 * nodes. </p>
	 * 
	 * <p> The shortest possible path has all <font color='darkBlue'>black</font> nodes, and the longest possible 
	 * path alternates between <font color='red'>red</font> and <font color='darkBlue'>black</font> nodes. Since all 
	 * maximal paths have the same number of <font color='darkBlue'>black</font> nodes, by property 5, this shows 
	 * that no path is more than twice as long as any other path. </p>
	 *
	 * <ul>
	 *	<li> Reference: https://en.wikipedia.org/w/index.php?title=Red%E2%80%93black_tree&redirect=no </li>
	 * </ul>
	 *
	 * @param <T> Type of elements.
	 *
	 * @inventor Rudolf Bayer
	 * @author Migrated by Jeongho Nam <http://samchon.org>
	 */
	export abstract class RBTree<T>
		extends XTree<T>
	{
		/* =========================================================
			CONSTRUCTOR
		========================================================= */
		/**
		 * Default Constructor.
		 */
		public constructor()
		{
			super();
		}
		
		/* =========================================================
			ELEMENTS I/O
				- INSERT
				- ERASE
				- COLOR
		============================================================
			INSERT
		--------------------------------------------------------- */
		/**
		 * <p> Insert an element with a new node. </p>
		 *
		 * <p> Insertion begins by adding the node as any binary search tree insertion does and by coloring it 
		 * <font color='red'>red</font>. Whereas in the binary search tree, we always add a leaf, in the red-black 
		 * tree, leaves contain no information, so instead we add a <font color='red'>red</font> interior node, with 
		 * two <font color='darkBlue'>black</font> leaves, in place of an existing 
		 * <font color='darkBlue'>black</font> leaf. </p>
		 * 
		 * <p> What happens next depends on the color of other nearby nodes. The term uncle node will be used to 
		 * refer to the sibling of a node's parent, as in human family trees. Note that: </p>
		 * 
		 * <ul>
		 *	<li> property 3 (all leaves are <font color='darkBlue'>black</font>) always holds. </li>
		 *	<li> 
		 *		property 4 (both children of every <font color='red'>red</font> node are 
		 *		<font color='darkBlue'>black</font>) is threatened only by adding a <font color='red'>red</font> 
		 *		node, repainting a <font color='darkBlue'>black</font> node <font color='red'>red</font>, or a 
		 *		rotation. 
		 *	</li>
		 *	<li> 
		 *		property 5 (all paths from any given node to its leaf nodes contain the same number of 
		 *		<font color='darkBlue'>black</font> nodes) is threatened only by adding a 
		 *		<font color='darkBlue'>black</font> node, repainting a <font color='red'>red</font> node 
		 *		<font color='darkBlue'>black</font> (or vice versa), or a rotation. 
		 *	</li>
		 * </ul>
		 *
		 * <h4> Notes </h4>
		 * <ol>
		 *	<li> 
		 *		The label <i><b>N</b></i> will be used to denote the current node (colored 
		 *		<font color='red'>red</font>). In the diagrams <i><b>N</b></i> carries a blue contour. At the 
		 *		beginning, this is the new node being inserted, but the entire procedure may also be applied 
		 *		recursively to other nodes (see case 3). {@link XTreeNode.parent <b>P</b>} will denote 
		 *		<i><b>N</b></i>'s parent node, {@link XTreeNode.grandParent <b>G</b>} will denote <i><b>N</b></i>'s 
		 *		grandparent, and {@link XTreeNode.uncle <b>U</b>} will denote <i><b>N</b></i>'s uncle. In between 
		 *		some cases, the roles and labels of the nodes are exchanged, but in each case, every label continues 
		 *		to represent the same node it represented at the beginning of the case. 
		 *	</li>
		 *	<li> 
		 *		If a node in the right (target) half of a diagram carries a blue contour it will become the current 
		 *		node in the next iteration and there the other nodes will be newly assigned relative to it. Any 
		 *		color shown in the diagram is either assumed in its case or implied by those assumptions. 
		 *	</li>
		 *	<li> 
		 *		A numbered triangle represents a subtree of unspecified depth. A <font color='darkBlue'>black</font> 
		 *		circle atop a triangle means that <font color='darkBlue'>black</font>-height of subtree is greater 
		 *		by one compared to subtree without this circle. </li>
		 * </ol>
		 *
		 * <p> There are several cases of red-black tree insertion to handle: </p>
		 * 
		 * <ul>
		 *	<li> <i><b>N</b></i> is the root node, i.e., first node of red-black tree. </li>
		 *	<li> 
		 *		<i><b>N</b></i>'s parent ({@link XTreeNode.parent <b>P</b>}) is <font color='darkBlue'>black</font>. 
		 *	</li>
		 *	<li> 
		 *		<i><b>N</b></i>'s parent ({@link XTreeNode.parent <b>P</b>}) and uncle 
		 *		({@link XTreeNode.uncle <b>U</b>}) are <font color='red'>red</font>. 
		 *	</li>
		 *	<li> 
		 *		<i><b>N</b></i> is added to right of left child of grandparent, or <i><b>N</b></i> is added to left 
		 *		of right child of grandparent ({@link XTreeNode.parent <b>P</b>} is <font color='red'>red</font> and 
		 *		{@link XTreeNode.uncle <b>U</b>} is <font color='darkBlue'>black</font>). 
		 *	</li>
		 *	<li> 
		 *		<i><b>N</b></i> is added to left of left child of grandparent, or <i><b>N</b></i> is added to right 
		 *		of right child of grandparent ({@link XTreeNode.parent <b>P</b>} is <font color='red'>red</font> and 
		 *		{@link XTreeNode.uncle <b>U</b>} is <font color='darkBlue'>black</font>). 
		 *	</li>
		 * </ul>
		 *
		 * <h4> Note </h4>
		 * <p> Note that inserting is actually in-place, since all the calls above use tail recursion. </p>
		 * 
		 * <p> In the algorithm above, all cases are chained in order, except in insert case 3 where it can recurse 
		 * to case 1 back to the grandparent node: this is the only case where an iterative implementation will 
		 * effectively loop. Because the problem of repair is escalated to the next higher level but one, it takes 
		 * maximally h⁄2 iterations to repair the tree (where h is the height of the tree). Because the probability 
		 * for escalation decreases exponentially with each iteration the average insertion cost is constant. </p>
		 * 
		 * @param val An element to insert.
		 */
		public insert(val: T): void
		{
			let parent = this.find(val);
			let node = new XTreeNode<T>(val, Color.RED);

			if (parent == null)
				this.root = node;
			else
			{
				node.parent = parent;

				if (this.isLess(node.value, parent.value))
					parent.left = node;
				else
					parent.right = node;
			}

			this.insertCase1(node);
		}

		/**
		 * <p> <i><b>N</b></i> is the root node, i.e., first node of red-black tree. </p>
		 *
		 * <p> The current node <i><b>N</b></i> is at the {@link root} of the tree. </p> 
		 * 
		 * <p> In this case, it is repainted <font color='darkBlue'>black</font> to satisfy property 2 (the root is 
		 * <font color='darkBlue'>black</font>). Since this adds one <font color='darkBlue'>black</font> node to 
		 * every path at once, property 5 (all paths from any given node to its leaf nodes contain the same number 
		 * of <font color='darkBlue'>black</font> nodes) is not violated. </p>
		 * 
		 * @param N A node to be inserted or swapped.
		 */
		private insertCase1(N: XTreeNode<T>): void
		{
			if (N.parent == null)
				N.color = Color.BLACK;
			else
				this.insertCase2(N);
		}

		/**
		 * <p> <i><b>N</b></i>'s parent ({@link XTreeNode.parent <b>P</b>}) is <font color='darkBlue'>black</font>. </p>
		 *
		 * <p> The current node's parent {@link XTreeNode.parent <b>P</b>} is <font color='darkBlue'>black</font>, 
		 * so property 4 (both children of every <font color='red'>red</font> node are 
		 * <font color='darkBlue'>black</font>) is not invalidated. </p> 
		 * 
		 * <p> In this case, the tree is still valid. Property 5 (all paths from any given node to its leaf nodes 
		 * contain the same number of <font color='darkBlue'>black</font> nodes) is not threatened, because the 
		 * current node <i><b>N</b></i> has two <font color='darkBlue'>black</font> leaf children, but because 
		 * <i><b>N</b></i> is <font color='red'>red</font>, the paths through each of its children have the same 
		 * number of <font color='darkBlue'>black</font> nodes as the path through the leaf it replaced, which was 
		 * <font color='darkBlue'>black</font>, and so this property remains satisfied. </p>
		 * 
		 * @param N A node to be inserted or swapped.
		 */
		private insertCase2(N: XTreeNode<T>): void
		{
			if (this.fetchColor(N.parent) == Color.BLACK)
				return;
			else
				this.insertCase3(N);
		}


		/**
		 * <p> <i><b>N</b></i>'s parent ({@link XTreeNode.parent <b>P</b>}) and uncle 
		 * (<i>{@link XTreeNode.uncle <b>U</b>}</i>) are <font color='red'>red</font>. </p>
		 *
		 * <p> If both the parent {@link XTreeNode.parent <b>P</b>} and the uncle {@link XTreeNode.uncle <b>U</b>} 
		 * are <font color='red'>red</font>, then both of them can be repainted <font color='darkBlue'>black</font> 
		 * and the grandparent {@link XTreeNode.grandParent <b>G</b>} becomes <font color='red'>red</font> (to 
		 * maintain property 5 (all paths from any given node to its leaf nodes contain the same number of 
		 * <font color='darkBlue'>black</font> nodes)). </p>
		 * 
		 * <p> Now, the current <font color='red'>red</font> node <i><b>N</b></i> has a 
		 * <font color='darkBlue'>black</font> parent. Since any path through the parent or uncle must pass through 
		 * the grandparent, the number of <font color='darkBlue'>black</font> nodes on these paths has not changed. 
		 * 
		 * <p> However, the grandparent {@link XTreeNode.grandParent <b>G</b>} may now violate properties 2 (The 
		 * root is <font color='darkBlue'>black</font>) or 4 (Both children of every <font color='red'>red</font> 
		 * node are <font color='darkBlue'>black</font>) (property 4 possibly being violated since 
		 * {@link XTreeNode.grandParent <b>G</b>} may have a <font color='red'>red</font> parent). </p> 
		 *
		 * <p> To fix this, the entire procedure is recursively performed on {@link XTreeNode.grandParent <b>G</b>} 
		 * from case 1. Note that this is a tail-recursive call, so it could be rewritten as a loop; since this is 
		 * the only loop, and any rotations occur after this loop, this proves that a constant number of rotations 
		 * occur. </p>
		 *
		 * <p> <img src="../assets/images/tree/Red-black_tree_insert_case_3.svg" /> </p>
		 * 
		 * @param N A node to be inserted or swapped.
		 */
		private insertCase3(N: XTreeNode<T>): void
		{
			if (this.fetchColor(N.uncle) == Color.RED)
			{
				N.parent.color = Color.BLACK;
				N.uncle.color = Color.BLACK;
				N.grandParent.color = Color.RED;

				this.insertCase1(N.grandParent);
			}
			else
			{
				this.insertCase4(N);
			}
		}

		/**
		 * <p> <i><b>N</b></i> is added to right of left child of grandparent, or <i><b>N</b></i> is added to left 
		 * of right child of grandparent ({@link XTreeNode.parent <b>P</b>} is <font color='red'>red</font> and 
		 * {@link XTreeNode.uncle <b>U</b>} is <font color='darkBlue'>black</font>). </p>
		 *
		 * <p> The parent {@link XTreeNode.parent <b>P</b>} is <font color='red'>red</font> but the uncle 
		 * {@link XTreeNode.uncle <b>U</b>} is <font color='darkBlue'>black</font>; also, the current node 
		 * <i><b>N</b></i> is the right child of {@link XTreeNode.parent <b>P</b>}, and 
		 * {@link XTreeNode.parent <b>P</b>} in turn is the left child of its parent 
		 * {@link XTreeNode.grandParent <b>G</b>}. </p>
		 *
		 * <p> In this case, a left rotation on {@link XTreeNode.parent <b>P</b>} that switches the roles of the 
		 * current node <i><b>N</b></i> and its parent {@link XTreeNode.parent <b>P</b>} can be performed; then, 
		 * the former parent node {@link XTreeNode.parent <b>P</b>} is dealt with using case 5 
		 * (relabeling <i><b>N</b></i> and {@link XTreeNode.parent <b>P</b>}) because property 4 (both children of 
		 * every <font color='red'>red</font> node are <font color='darkBlue'>black</font>) is still violated. </p>
		 * 
		 * <p> The rotation causes some paths (those in the sub-tree labelled "1") to pass through the node 
		 * <i><b>N</b></i> where they did not before. It also causes some paths (those in the sub-tree labelled "3") 
		 * not to pass through the node {@link XTreeNode.parent <b>P</b>} where they did before. However, both of 
		 * these nodes are <font color='red'>red</font>, so property 5 (all paths from any given node to its leaf 
		 * nodes contain the same number of <font color='darkBlue'>black</font> nodes) is not violated by the 
		 * rotation. </p>
		 *
		 * <p> After this case has been completed, property 4 (both children of every <font color='red'>red</font> 
		 * node are <font color='darkBlue'>black</font>) is still violated, but now we can resolve this by 
		 * continuing to case 5. </p>
		 *
		 * <p> <img src="../assets/images/tree/Red-black_tree_insert_case_4.svg" /> </p>
		 * 
		 * @param N A node to be inserted or swapped.
		 */
		private insertCase4(node: XTreeNode<T>): void
		{
			if (node == node.parent.right && node.parent == node.grandParent.left)
			{
				this.rotateLeft(node.parent);
				node = node.left;
			}
			else if (node == node.parent.left && node.parent == node.grandParent.right)
			{
				this.rotateRight(node.parent);
				node = node.right;
			}

			this.insertCase5(node);
		}

		/**
		 * <p> <i><b>N</b></i> is added to left of left child of grandparent, or <i><b>N</b></i> is added to right 
		 * of right child of grandparent ({@link XTreeNode.parent <b>P</b>} is <font color='red'>red</font> and 
		 * {@link XTreeNode.uncle <b>U</b>} is <font color='darkBlue'>black</font>). </p>
		 * 
		 * <p> The parent {@link XTreeNode.parent <b>P</b>} is <font color='red'>red</font> but the uncle 
		 * {@link XTreeNode.uncle <b>U</b>} is <font color='darkBlue'>black</font>, the current node <i><b>N</b></i> 
		 * is the left child of {@link XTreeNode.parent <b>P</b>}, and {@link XTreeNode.parent <b>P</b>} is the left 
		 * child of its parent {@link XTreeNode.grandParent <b>G</b>}. </p>
		 * 
		 * <p>In this case, a right rotation on {@link XTreeNode.grandParent <b>G</b>} is performed; the result is a 
		 * tree where the former parent {@link XTreeNode.parent <b>P</b>} is now the parent of both the current node 
		 * <i><b>N</b></i> and the former grandparent {@link XTreeNode.grandParent <b>G</b>}. </p>
		 * 
		 * <p> {@link XTreeNode.grandParent <b>G</b>} is known to be <font color='darkBlue'>black</font>, since its 
		 * former child {@link XTreeNode.parent <b>P</b>} could not have been <font color='red'>red</font> otherwise 
		 * (without violating property 4). Then, the colors of {@link XTreeNode.parent <b>P</b>} and 
		 * {@link XTreeNode.grandParent <b>G</b>} are switched, and the resulting tree satisfies property 4 (both 
		 * children of every <font color='red'>red</font> node are <font color='darkBlue'>black</font>). Property 5 
		 * (all paths from any given node to its leaf nodes contain the same number of 
		 * <font color='darkBlue'>black</font> nodes) also remains satisfied, since all paths that went through any 
		 * of these three nodes went through {@link XTreeNode.grandParent <b>G</b>} before, and now they all go 
		 * through {@link XTreeNode.parent <b>P</b>}. In each case, this is the only 
		 * <font color='darkBlue'>black</font> node of the three. </p>
		 * 
		 * <p> <img src="../assets/images/tree/Red-black_tree_insert_case_5.svg" /> </p>
		 * 
		 * @param N A node to be inserted or swapped.
		 */
		private insertCase5(node: XTreeNode<T>): void
		{
			node.parent.color = Color.BLACK;
			node.grandParent.color = Color.RED;

			if (node == node.parent.left && node.parent == node.grandParent.left)
				this.rotateRight(node.grandParent);
			else
				this.rotateLeft(node.grandParent);
		}

		/* ---------------------------------------------------------
			ERASE
		--------------------------------------------------------- */
		/**
		 * <p> Erase an element with its node. </p>
		 * 
		 * <p> In a regular binary search tree when deleting a node with two non-leaf children, we find either the 
		 * maximum element in its left subtree (which is the in-order predecessor) or the minimum element in its 
		 * right subtree (which is the in-order successor) and move its value into the node being deleted (as shown 
		 * here). We then delete the node we copied the value from, which must have fewer than two non-leaf children. 
		 * (Non-leaf children, rather than all children, are specified here because unlike normal binary search 
		 * trees, red-black trees can have leaf nodes anywhere, so that all nodes are either internal nodes with 
		 * two children or leaf nodes with, by definition, zero children. In effect, internal nodes having two leaf 
		 * children in a red-black tree are like the leaf nodes in a regular binary search tree.) Because merely 
		 * copying a value does not violate any red-black properties, this reduces to the problem of deleting a node 
		 * with at most one non-leaf child. Once we have solved that problem, the solution applies equally to the 
		 * case where the node we originally want to delete has at most one non-leaf child as to the case just 
		 * considered where it has two non-leaf children. </p>
		 * 
		 * <p> Therefore, for the remainder of this discussion we address the deletion of a node with at most one 
		 * non-leaf child. We use the label <b>M</b> to denote the node to be deleted; <b>C</b> will denote a 
		 * selected child of <b>M</b>, which we will also call "its child". If <b>M</b> does have a non-leaf child, 
		 * call that its child, <b>C</b>; otherwise, choose either leaf as its child, <b>C</b>. </p>
		 * 
		 * <p> If <b>M</b> is a <font color='red'>red</font> node, we simply replace it with its child <b>C</b>,
		 *  which must be <font color='darkBlue'>black</font> by property 4. (This can only occur when <b>M</b> has 
		 * two leaf children, because if the <font color='red'>red</font> node <b>M</b> had a 
		 * <font color='darkBlue'>black</font> non-leaf child on one side but just a leaf child on the other side, 
		 * then the count of <font color='darkBlue'>black</font> nodes on both sides would be different, thus the 
		 * tree would violate property 5.) All paths through the deleted node will simply pass through one fewer 
		 * <font color='red'>red</font> node, and both the deleted node's parent and child must be 
		 * <font color='darkBlue'>black</font>, so property 3 (all leaves are <font color='darkBlue'>black</font>) 
		 * and property 4 (both children of every <font color='red'>red</font> node are 
		 * <font color='darkBlue'>black</font>) still hold. </p>
		 * 
		 * <p> Another simple case is when <b>M</b> is <font color='darkBlue'>black</font> and <b>C</b> is 
		 * <font color='red'>red</font>. Simply removing a <font color='darkBlue'>black</font> node could break 
		 * Properties 4 (“Both children of every <font color='red'>red</font> node are 
		 * <font color='darkBlue'>black</font>”) and 5 (“All paths from any given node to its leaf nodes contain the 
		 * same number of <font color='darkBlue'>black</font> nodes”), but if we repaint <b>C</b> 
		 * <font color='darkBlue'>black</font>, both of these properties are preserved. </p>
		 * 
		 * <p> The complex case is when both <b>M</b> and <b>C</b> are <font color='darkBlue'>black</font>. (This 
		 * can only occur when deleting a <font color='darkBlue'>black</font> node which has two leaf children, 
		 * because if the <font color='darkBlue'>black</font> node <b>M</b> had a <font color='darkBlue'>black</font> 
		 * non-leaf child on one side but just a leaf child on the other side, then the count of 
		 * <font color='darkBlue'>black</font> nodes on both sides would be different, thus the tree would have been 
		 * an invalid red-black tree by violation of property 5.) We begin by replacing <b>M</b> with its child 
		 * <b>C</b>. We will relabel this child <b>C</b> (in its new position) <i><b>N</b></i>, and its sibling (its 
		 * new parent's other child) {@link XTreeNode.sibling <b>S</b>}. ({@link XTreeNode.sibling <b>S</b>} was 
		 * previously the sibling of <b>M</b>.) </p> 
		 *
		 * <p> In the diagrams below, we will also use {@link XTreeNode.parent <b>P</b>} for <i><b>N</b></i>'s new 
		 * parent (<b>M</b>'s old parent), <b>SL</b> for {@link XTreeNode.sibling <b>S</b>}'s left child, and 
		 * <b>SR</b> for {@link XTreeNode.sibling <b>S</b>}'s right child ({@link XTreeNode.sibling <b>S</b>} cannot 
		 * be a leaf because if <b>M</b> and <b>C</b> were <font color='darkBlue'>black</font>, then 
		 * {@link XTreeNode.parent <b>P</b>}'s one subtree which included <b>M</b> counted two 
		 * <font color='darkBlue'>black</font>-height and thus {@link XTreeNode.parent <b>P</b>}'s other subtree 
		 * which includes {@link XTreeNode.sibling <b>S</b>} must also count two 
		 * <font color='darkBlue'>black</font>-height, which cannot be the case if {@link XTreeNode.sibling <b>S</b>} 
		 * is a leaf node). </p>
		 *
		 * <h4> Notes </h4>
		 * <ol>
		 *	<li> 
		 *		The label <i><b>N</b></i> will be used to denote the current node (colored 
		 *		<font color='darkBlue'>black</font>). In the diagrams <i><b>N</b></i> carries a blue contour. At the 
		 *		beginning, this is the replacement node and a leaf, but the entire procedure may also be applied 
		 *		recursively to other nodes (see case 3). In between some cases, the roles and labels of the nodes 
		 *		are exchanged, but in each case, every label continues to represent the same node it represented at 
		 *		the beginning of the case. 
		 *	</li>
		 *	<li> 
		 *		If a node in the right (target) half of a diagram carries a blue contour it will become the current 
		 *		node in the next iteration and there the other nodes will be newly assigned relative to it. Any 
		 *		color shown in the diagram is either assumed in its case or implied by those assumptions. 
		 *		White represents an arbitrary color (either <font color='red'>red</font> or 
		 *		<font color='darkBlue'>black</font>), but the same in both halves of the diagram. 
		 *	</li>
		 *	<li> 
		 *		A numbered triangle represents a subtree of unspecified depth. A <font color='darkBlue'>black</font> 
		 *		circle atop a triangle means that <font color='darkBlue'>black</font>-height of subtree is greater 
		 *		by one compared to subtree without this circle. 
		 *	</li>
		 * </ol>
		 *
		 * <p> If both <i><b>N</b></i> and its original parent are <font color='darkBlue'>black</font>, then 
		 * deleting this original parent causes paths which proceed through <i><b>N</b></i> to have one fewer 
		 * <font color='darkBlue'>black</font> node than paths that do not. As this violates property 5 (all paths 
		 * from any given node to its leaf nodes contain the same number of <font color='darkBlue'>black</font> 
		 * nodes), the tree must be rebalanced. There are several cases to consider: </p>
		 * 
		 * <ol>
		 *	<li> <i><b>N</b></i> is the new root. </li>
		 *	<li> {@link XTreeNode.sibling <b>S</b>} is <font color='red'>red</font>. </li>
		 *	<li> 
		 *		{@link XTreeNode.parent <b>P</b>}, {@link XTreeNode.sibling <b>S</b>}, and 
		 *		{@link XTreeNode.sibling <b>S</b>}'s children are <font color='darkBlue'>black</font>. </li>
		 *	<li> 
		 *		{@link XTreeNode.sibling <b>S</b>} and {@link XTreeNode.sibling <b>S</b>}'s children are 
		 *		<font color='darkBlue'>black</font>, but {@link XTreeNode.parent <b>P</b>} is 
		 *		<font color='red'>red</font>. 
		 *	</li>
		 *	<li> 
		 *		{@link XTreeNode.sibling <b>S</b>} is <font color='darkBlue'>black</font>, 
		 *		{@link XTreeNode.sibling <b>S</b>}'s left child is <font color='red'>red</font>, 
		 *		{@link XTreeNode.sibling <b>S</b>}'s right child is <font color='darkBlue'>black</font>, and 
		 *		<i><b>N</b></i> is the left child of its parent. 
		 *	</li>
		 *	<li> 
		 *		{@link XTreeNode.sibling <b>S</b>} is <font color='darkBlue'>black</font>, 
		 *		{@link XTreeNode.sibling <b>S</b>}'s right child is <font color='red'>red</font>, and 
		 *		<i><b>N</b></i> is the left child of its parent {@link XTreeNode.parent <b>P</b>}. 
		 *	</li>
		 * </ol>
		 *
		 * <p> Again, the function calls all use tail recursion, so the algorithm is in-place. </p>
		 * 
		 * <p> In the algorithm above, all cases are chained in order, except in delete case 3 where it can recurse 
		 * to case 1 back to the parent node: this is the only case where an iterative implementation will 
		 * effectively loop. No more than h loops back to case 1 will occur (where h is the height of the tree). 
		 * And because the probability for escalation decreases exponentially with each iteration the average 
		 * removal cost is constant. </p>
		 * 
		 * <p> Additionally, no tail recursion ever occurs on a child node, so the tail recursion loop can only 
		 * move from a child back to its successive ancestors. If a rotation occurs in case 2 (which is the only 
		 * possibility of rotation within the loop of cases 1–3), then the parent of the node <i><b>N</b></i> 
		 * becomes <font color='red'>red</font> after the rotation and we will exit the loop. Therefore, at most one 
		 * rotation will occur within this loop. Since no more than two additional rotations will occur after 
		 * exiting the loop, at most three rotations occur in total. </p>
		 * 
		 * @param val An element to erase.
		 */
		public erase(val: T): void
		{
			let node = this.find(val);
			if (node == null || this.isEquals(val, node.value) == false)
				return;

			if (node.left != null && node.right != null)
			{
				let pred: XTreeNode<T> = this.fetchMaximum(node.left);

				node.value = pred.value;
				node = pred;
			}

			let child = (node.right == null) ? node.left : node.right;
			
			if (this.fetchColor(node) == Color.BLACK)
			{
				node.color = this.fetchColor(child);
				this.eraseCase1(node);
			}

			this.replaceNode(node, child);
		}
		
		/**
		 * <p> <i><b>N</b></i> is the new root. </p>
		 * 
		 * <p> In this case, we are done. We removed one <font color='darkBlue'>black</font> node from every path, 
		 * and the new root is <font color='darkBlue'>black</font>, so the properties are preserved. </p>
		 * 
		 * <h4> Note </h4>
		 * <p> In cases 2, 5, and 6, we assume <i><b>N</b></i> is the left child of its parent 
		 * {@link XTreeNode.parent <b>P</b>}. If it is the right child, left and right should be reversed throughout 
		 * these three cases. Again, the code examples take both cases into account. </p>
		 * 
		 * @param N A node to be erased or swapped.
		 */
		private eraseCase1(N: XTreeNode<T>): void
		{
			if (N.parent == null)
				return;
			else
				this.eraseCase2(N);
		}

		/**
		 * <p> {@link XTreeNode.sibling <b>S</b>} is <font color='red'>red</font>. </p>
		 *
		 * <p> <img src="../assets/images/tree/Red-black_tree_delete_case_2.svg" /> </p>
		 * 
		 * <p> In this case we reverse the colors of {@link XTreeNode.parent <b>P</b>} and 
		 * {@link XTreeNode.sibling <b>S</b>}, and then rotate left at {@link XTreeNode.parent <b>P</b>}, turning 
		 * {@link XTreeNode.sibling <b>S</b>} into <i><b>N</b></i>'s grandparent. </p>
		 * 
		 * <p> Note that {@link XTreeNode.parent <b>P</b>} has to be <font color='darkBlue'>black</font> as it had a 
		 * <font color='red'>red</font> child. The resulting subtree has a path short one 
		 * <font color='darkBlue'>black</font> node so we are not done. Now <i><b>N</b></i> has a 
		 * <font color='darkBlue'>black</font> sibling and a <font color='red'>red</font> parent, so we can proceed 
		 * to step 4, 5, or 6. (Its new sibling is <font color='darkBlue'>black</font> because it was once the child 
		 * of the <font color='red'>red</font> {@link XTreeNode.sibling <b>S</b>}.) In later cases, we will re-label 
		 * <i><b>N</b></i>'s new sibling as {@link XTreeNode.sibling <b>S</b>}. </p>
		 * 
		 * @param N A node to be erased or swapped.
		 */
		private eraseCase2(N: XTreeNode<T>): void
		{
			if (this.fetchColor(N.sibling) == Color.RED)
			{
				N.parent.color = Color.RED;
				N.sibling.color = Color.BLACK;

				if (N == N.parent.left)
					this.rotateLeft(N.parent);
				else
					this.rotateRight(N.parent);
			}

			this.eraseCase3(N);
		}

		/**
		 * <p> {@link XTreeNode.parent <b>P</b>}, {@link XTreeNode.sibling <b>S</b>}, and {@link XTreeNode.sibling 
		 * <b>S</b>}'s children are <font color='darkBlue'>black</font>. </p>
		 * 
		 * <p> <img src="../assets/images/tree/Red-black_tree_delete_case_3.svg" /> </p>
		 * 
		 * <p> In this case, we simply repaint {@link XTreeNode.sibling <b>S</b>} <font color='red'>red</font>. The 
		 * result is that all paths passing through {@link XTreeNode.sibling <b>S</b>}, which are precisely those 
		 * paths not passing through <i><b>N</b></i>, have one less <font color='darkBlue'>black</font> node. 
		 * Because deleting <i><b>N</b></i>'s original parent made all paths passing through <i><b>N</b></i> have 
		 * one less <font color='darkBlue'>black</font> node, this evens things up. </p>
		 *
		 * <p> However, all paths through {@link XTreeNode.parent <b>P</b>} now have one fewer 
		 * <font color='darkBlue'>black</font> node than paths that do not pass through 
		 * {@link XTreeNode.parent <b>P</b>}, so property 5 (all paths from any given node to its leaf nodes contain 
		 * the same number of <font color='darkBlue'>black</font> nodes) is still violated. </p>
		 *
		 * <p> To correct this, we perform the rebalancing procedure on {@link XTreeNode.parent <b>P</b>}, starting 
		 * at case 1. </p>
		 * 
		 * @param N A node to be erased or swapped.
		 */
		private eraseCase3(N: XTreeNode<T>): void
		{
			if (this.fetchColor(N.parent) == Color.BLACK &&
				this.fetchColor(N.sibling) == Color.BLACK &&
				this.fetchColor(N.sibling.left) == Color.BLACK &&
				this.fetchColor(N.sibling.right) == Color.BLACK)
			{
				N.sibling.color = Color.RED;

				this.eraseCase1(N.parent);
			}
			else
				this.eraseCase4(N);
		}

		/**
		 * <p> {@link XTreeNode.sibling <b>S</b>} and {@link XTreeNode.sibling <b>S</b>}'s children are 
		 * <font color='darkBlue'>black</font>, but {@link XTreeNode.parent <b>P</b>} is <font color='red'>red</font>. </p>
		 *
		 * <p> <img src="../assets/images/tree/Red-black_tree_delete_case_4.svg" /> </p>
		 * 
		 * <p> In this case, we simply exchange the colors of {@link XTreeNode.sibling <b>S</b>} and 
		 * {@link XTreeNode.parent <b>P</b>}. This does not affect the number of <font color='darkBlue'>black</font> 
		 * nodes on paths going through {@link XTreeNode.sibling <b>S</b>}, but it does add one to the number of 
		 * <font color='darkBlue'>black</font> nodes on paths going through <i><b>N</b></i>, making up for the 
		 * deleted <font color='darkBlue'>black</font> node on those paths. </p>
		 * 
		 * @param N A node to be erased or swapped.
		 */
		private eraseCase4(N: XTreeNode<T>): void
		{
			if (this.fetchColor(N.parent) == Color.RED &&
				N.sibling != null &&
				this.fetchColor(N.sibling) == Color.BLACK &&
				this.fetchColor(N.sibling.left) == Color.BLACK &&
				this.fetchColor(N.sibling.right) == Color.BLACK)
			{
				N.sibling.color = Color.RED;
				N.parent.color = Color.BLACK;
			}
			else
				this.eraseCase5(N);
		}

		/**
		 * <p> {@link XTreeNode.sibling <b>S</b>} is <font color='darkBlue'>black</font>, {@link XTreeNode.sibling <b>S</b>}'s 
		 * left child is <font color='red'>red</font>, {@link XTreeNode.sibling <b>S</b>}'s right child is 
		 * <font color='darkBlue'>black</font>, and <i><b>N</b></i> is the left child of its parent. </p> 
		 *
		 * <p> <img src="../assets/images/tree/Red-black_tree_delete_case_5.svg" /> </p>
		 * 
		 * <p> In this case we rotate right at {@link XTreeNode.sibling <b>S</b>}, so that 
		 * {@link XTreeNode.sibling <b>S</b>}'s left child becomes {@link XTreeNode.sibling <b>S</b>}'s parent and 
		 * <i><b>N</b></i>'s new sibling. We then exchange the colors of {@link XTreeNode.sibling <b>S</b>} and its 
		 * new parent. </p>
		 *
		 * <p> All paths still have the same number of <font color='darkBlue'>black</font> nodes, but now 
		 * <i><b>N</b></i> has a <font color='darkBlue'>black</font> sibling whose right child is 
		 * <font color='red'>red</font>, so we fall into case 6. Neither <i><b>N</b></i> nor its parent are affected 
		 * by this transformation. (Again, for case 6, we relabel <i><b>N</b></i>'s new sibling as 
		 * {@link XTreeNode.sibling <b>S</b>}.) </p>
		 * 
		 * @param N A node to be erased or swapped.
		 */
		private eraseCase5(N: XTreeNode<T>): void
		{
			if (N == N.parent.left &&
				N.sibling != null &&
				this.fetchColor(N.sibling) == Color.BLACK &&
				this.fetchColor(N.sibling.left) == Color.RED &&
				this.fetchColor(N.sibling.right) == Color.BLACK)
			{
				N.sibling.color = Color.RED;
				N.sibling.left.color = Color.BLACK;

				this.rotateRight(N.sibling);
			}
			else if (N == N.parent.right &&
				N.sibling != null &&
				this.fetchColor(N.sibling) == Color.BLACK &&
				this.fetchColor(N.sibling.left) == Color.BLACK &&
				this.fetchColor(N.sibling.right) == Color.RED)
			{
				N.sibling.color = Color.RED;
				N.sibling.right.color = Color.BLACK;

				this.rotateLeft(N.sibling);
			}
		}

		/**
		 * <p> {@link XTreeNode.sibling <b>S</b>} is <font color='darkBlue'>black</font>, 
		 * {@link XTreeNode.sibling <b>S</b>}'s right child is <font color='red'>red</font>, and <i><b>N</b></i> is 
		 * the left child of its parent {@link XTreeNode.parent <b>P</b>}. </p>
		 * 
		 * <p> In this case we rotate left at {@link XTreeNode.parent <b>P</b>}, so that 
		 * {@link XTreeNode.sibling <b>S</b>} becomes the parent of {@link XTreeNode.parent <b>P</b>} and 
		 * {@link XTreeNode.sibling <b>S</b>}'s right child. We then exchange the colors of 
		 * {@link XTreeNode.parent <b>P</b>} and {@link XTreeNode.sibling <b>S</b>}, and make 
		 * {@link XTreeNode.sibling <b>S</b>}'s right child <font color='darkBlue'>black</font>. </p>
		 * 
		 * <p> The subtree still has the same color at its root, so Properties 4 (Both children of every 
		 * <font color='red'>red</font> node are <font color='darkBlue'>black</font>) and 5 (All paths from any 
		 * given node to its leaf nodes contain the same number of <font color='darkBlue'>black</font> nodes) are 
		 * not violated. However, <i><b>N</b></i> now has one additional <font color='darkBlue'>black</font> 
		 * ancestor: either {@link XTreeNode.parent <b>P</b>} has become <font color='darkBlue'>black</font>, or it 
		 * was <font color='darkBlue'>black</font> and {@link XTreeNode.sibling <b>S</b>} was added as a 
		 * <font color='darkBlue'>black</font> grandparent. </p>
		 *
		 * <p> Thus, the paths passing through <i><b>N</b></i> pass through one additional 
		 * <font color='darkBlue'>black</font> node. </p>
		 *
		 * <p> <img src="../assets/images/tree/Red-black_tree_delete_case_6.svg" /> </p>
		 * 
		 * <p> Meanwhile, if a path does not go through <i><b>N</b></i>, then there are two possibilities: </p>
		 * <ol>
		 *	<li> 
		 *		It goes through <i><b>N</b></i>'s new sibling <b>SL</b>, a node with arbitrary color and the root of 
		 *		the subtree labeled 3 (s. diagram). Then, it must go through {@link XTreeNode.sibling <b>S</b>} and 
		 *		{@link XTreeNode.parent <b>P</b>}, both formerly and currently, as they have only exchanged colors 
		 *		and places. Thus the path contains the same number of <font color='darkBlue'>black</font> nodes. 
		 *	</li>
		 *	<li> 
		 *		It goes through <i><b>N</b></i>'s new uncle, {@link XTreeNode.sibling <b>S</b>}'s right child. Then, 
		 *		it formerly went through {@link XTreeNode.sibling <b>S</b>}, {@link XTreeNode.sibling <b>S</b>}'s 
		 *		parent, and {@link XTreeNode.sibling <b>S</b>}'s right child <b>SR</b> (which was 
		 *		<font color='red'>red</font>), but now only goes through {@link XTreeNode.sibling <b>S</b>}, which 
		 *		has assumed the color of its former parent, and {@link XTreeNode.sibling <b>S</b>}'s right child, 
		 *		which has changed from <font color='red'>red</font> to <font color='darkBlue'>black</font> (assuming 
		 *		{@link XTreeNode.sibling <b>S</b>}'s color: <font color='darkBlue'>black</font>). The net effect is 
		 *		that this path goes through the same number of <font color='darkBlue'>black</font> nodes. 
		 *	</li>
		 * </ol>
		 * 
		 * <p> Either way, the number of <font color='darkBlue'>black</font> nodes on these paths does not change. 
		 * Thus, we have restored Properties 4 (Both children of every <font color='red'>red</font> node are 
		 * <font color='darkBlue'>black</font>) and 5 (All paths from any given node to its leaf nodes contain the 
		 * same number of <font color='darkBlue'>black</font> nodes). The white node in the diagram can be either 
		 * <font color='red'>red</font> or <font color='darkBlue'>black</font>, but must refer to the same color 
		 * both before and after the transformation. </p>
		 * 
		 * @param N A node to be erased or swapped.
		 */
		private eraseCase6(node: XTreeNode<T>): void
		{
			node.sibling.color = this.fetchColor(node.parent);
			node.parent.color = Color.BLACK;

			if (node == node.parent.left)
			{
				node.sibling.right.color = Color.BLACK;

				this.rotateLeft(node.parent);
			}
			else
			{
				node.sibling.left.color = Color.BLACK;
				
				this.rotateRight(node.parent);
			}
		}

		/* ---------------------------------------------------------
			COLOR
		--------------------------------------------------------- */
		/**
		 * Fetch color from a node.
		 * 
		 * @param node A node to fetch color.
		 * @retur color.
		 */
		private fetchColor(node: XTreeNode<T>): boolean
		{
			if (node == null)
				return Color.BLACK;
			else
				return node.color;
		}
	}
}

