namespace std.base.tree
{
	/**
	 * <p> Red-black Tree. </p>
	 *
	 * <p> A red–black tree is a kind of self-balancing binary search tree. Each node of the binary tree has an 
	 * extra bit, and that bit is often interpreted as the color (red or black) of the node. These color bits are 
	 * used to ensure the tree remains approximately balanced during insertions and deletions. </p>
	 *
	 * <p> Balance is preserved by painting each node of the tree with one of two colors (typically called 'red' 
	 * and 'black') in a way that satisfies certain properties, which collectively constrain how unbalanced the 
	 * tree can become in the worst case. When the tree is modified, the new tree is subsequently rearranged and 
	 * repainted to restore the coloring properties. The properties are designed in such a way that this 
	 * rearranging and recoloring can be performed efficiently. </p>
	 *
	 * <p> The balancing of the tree is not perfect but it is good enough to allow it to guarantee searching in 
	 * O(log n) time, where n is the total number of elements in the tree. The insertion and deletion operations, 
	 * along with the tree rearrangement and recoloring, are also performed in O(log n) time. </p>
	 *
	 * <p> Tracking the color of each node requires only 1 bit of information per node because there are only two 
	 * colors. The tree does not contain any other data specific to its being a red–black tree so its memory 
	 * footprint is almost identical to a classic (uncolored) binary search tree. In many cases the additional bit 
	 * of information can be stored at no additional memory cost. </p>
	 *
	 * <h4> Properties </h4>
	 * <p> In addition to the requirements imposed on a binary search tree the following must be satisfied by a 
	 * red–black tree: </p>
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
	 * <p> These constraints enforce a critical property of red–black trees: the path from the root to the 
	 * farthest leaf is no more than twice as long as the path from the root to the nearest leaf. The result is 
	 * that the tree is roughly height-balanced. Since operations such as inserting, deleting, and finding values 
	 * require worst-case time proportional to the height of the tree, this theoretical upper bound on the height 
	 * allows red–black trees to be efficient in the worst case, unlike ordinary binary search trees. </p>
	 * 
	 * <p> To see why this is guaranteed, it suffices to consider the effect of properties 4 and 5 together. For a 
	 * red–black tree T, let B be the number of black nodes in property 5. Let the shortest possible path from the 
	 * root of T to any leaf consist of B black nodes. Longer possible paths may be constructed by inserting red 
	 * nodes. However, property 4 makes it impossible to insert more than one consecutive red node. Therefore, 
	 * ignoring any black NIL leaves, the longest possible path consists of 2*B nodes, alternating black and red 
	 * (this is the worst case). Counting the black NIL leaves, the longest possible path consists of 2*B-1 nodes. </p>
	 * 
	 * <p> The shortest possible path has all black nodes, and the longest possible path alternates between red 
	 * and black nodes. Since all maximal paths have the same number of black nodes, by property 5, this shows 
	 * that no path is more than twice as long as any other path. </p>
	 *
	 * <ul>
	 *	<li> Reference: https://en.wikipedia.org/w/index.php?title=Red%E2%80%93black_tree&redirect=no </li>
	 * </ul>
	 *
	 * @inventor Rudolf Bayer
	 * @author Migrated by Jeongho Nam
	 */
	export abstract class XTree<T>
	{
		protected root: XTreeNode<T>;

		/* =========================================================
			CONSTRUCTOR
		========================================================= */
		/**
		 * Default Constructor.
		 */
		public constructor()
		{
			this.root = null;

			//this.size_ = 0;
		}

		/* =========================================================
			ACCESSORS
				- GETTERS
				- COMPARISON
		============================================================
			GETTERS
		--------------------------------------------------------- */
		//public size(): number
		//{
		//	return  this.size_;
		//}

		public find(val: T): XTreeNode<T>
		{
			if (this.root == null)
				return null;

			let node: XTreeNode<T> = this.root;

			while(true)
			{
				let newNode: XTreeNode<T> = null;

				if (this.isEquals(val, node.value))
					break; // EQUALS, MEANS MATCHED, THEN TERMINATE
				else if (this.isLess(val, node.value)) 
					newNode = node.left; // LESS, THEN TO THE LEFT
				else //
					newNode = node.right; // GREATER, THEN TO THE RIGHT

				// ULTIL CHILD NODE EXISTS
				if (newNode == null)
					break;
				
				// SHIFT A NEW NODE TO THE NODE TO BE RETURNED
				node = newNode;
			}
			return node;
		}

		private fetchMaximum(node: XTreeNode<T>): XTreeNode<T>
		{
			while (node.right != null)
				node = node.right;

			return node;
		}

		/* ---------------------------------------------------------
			COMPARISON
		--------------------------------------------------------- */
		public abstract isEquals(left: T, right: T): boolean;

		public abstract isLess(left: T, right: T): boolean;

		/* =========================================================
			ELEMENTS I/O
				- INSERT
				- ERASE
				- ROTATION
		============================================================
			INSERT
		--------------------------------------------------------- */
		/**
		 * <p> Insert an element with a new node. </p>
		 *
		 * <p> Insertion begins by adding the node as any binary search tree insertion does and by coloring it red. 
		 * Whereas in the binary search tree, we always add a leaf, in the red–black tree, leaves contain no 
		 * information, so instead we add a red interior node, with two black leaves, in place of an existing black 
		 * leaf. </p>
		 * 
		 * <p> What happens next depends on the color of other nearby nodes. The term uncle node will be used to 
		 * refer to the sibling of a node's parent, as in human family trees. Note that: </p>
		 * 
		 * <ul>
		 *	<li> property 3 (all leaves are black) always holds. </li>
		 *	<li> property 4 (both children of every red node are black) is threatened only by adding a red node, 
		 *		 repainting a black node red, or a rotation. </li>
		 *	<li> property 5 (all paths from any given node to its leaf nodes contain the same number of black nodes) 
		 *		 is threatened only by adding a black node, repainting a red node black (or vice versa), or a 
		 *		 rotation. </li>
		 * </ul>
		 *
		 * <h4> Notes </h4>
		 * <ol>
		 *	<li> The label N will be used to denote the current node (colored red). In the diagrams N carries a 
		 *		 blue contour. At the beginning, this is the new node being inserted, but the entire procedure may 
		 *		 also be applied recursively to other nodes (see case 3). P will denote N's parent node, 
		 *		 G will denote N's grandparent, and U will denote N's uncle. In between some cases, the roles and 
		 *		 labels of the nodes are exchanged, but in each case, every label continues to represent the same 
		 *		 node it represented at the beginning of the case. </li>
		 *	<li> If a node in the right (target) half of a diagram carries a blue contour it will become the current 
		 *		 node in the next iteration and there the other nodes will be newly assigned relative to it. Any 
		 *		 color shown in the diagram is either assumed in its case or implied by those assumptions. </li>
		 *	<li> A numbered triangle represents a subtree of unspecified depth. A black circle atop a triangle means 
		 *		 that black-height of subtree is greater by one compared to subtree without this circle. </li>
		 * </ol>
		 *
		 * <p> There are several cases of red–black tree insertion to handle: </p>
		 * 
		 * <ul>
		 *	<li> N is the root node, i.e., first node of red–black tree. </li>
		 *	<li> N's parent (P) is black. </li>
		 *	<li> N's parent (P) and uncle (U) are red. </li>
		 *	<li> N is added to right of left child of grandparent, or N is added to left of right child of 
		 *		 grandparent (P is red and U is black). </li>
		 *	<li> N is added to left of left child of grandparent, or N is added to right of right child of 
		 *		 grandparent (P is red and U is black). </li>
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
		 * <p> <i><b>N</b></i> is the root node, i.e., first node of red–black tree. </p>
		 *
		 * <p> The current node <i><b>N</b></i> is at the {@link root} of the tree. In this case, it is repainted 
		 * black to satisfy property 2 (the root is black). Since this adds one black node to every path at once, 
		 * property 5 (all paths from any given node to its leaf nodes contain the same number of black nodes) 
		 * is not violated. </p>
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
		 * <p> <i><b>N</b></i>'s parent (<b>P</b>) is black. </p>
		 *
		 * <p> The current node's parent <b>P</b> is black, so property 4 (both children of every red node are black) 
		 * is not invalidated. In this case, the tree is still valid. Property 5 (all paths from any given node to 
		 * its leaf nodes contain the same number of black nodes) is not threatened, because the current node 
		 * <i><b>N</b></i> has two black leaf children, but because <i><b>N</b></i> is red, the paths through each 
		 * of its children have the same number of black nodes as the path through the leaf it replaced, which was 
		 * black, and so this property remains satisfied. </p>
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
		 * <p> <i><b>N</b></i>'s parent (<b>P</b>) and uncle (<i>U</i>) are red. </p>
		 *
		 * <p> If both the parent <b>P</b> and the uncle <b>U</b> are <font color='red'>red</font>, then both of 
		 * them can be repainted <font color='darkBlue'>black</font> and the grandparent <b>G</b> becomes 
		 * <font color='red'>red</font> (to maintain property 5 (all paths from any given node to its leaf nodes 
		 * contain the same number of <font color='darkBlue'>black</font> nodes)). Now, the current 
		 * <font color='red'>red</font> node <i><b>N</b></i> has a <font color='darkBlue'>black</font> parent. 
		 * Since any path through the parent or uncle must pass through the grandparent, the number of black nodes 
		 * on these paths has not changed. However, the grandparent <b>G</b> may now violate properties 2 
		 * (The root is black) or 4 (Both children of every red node are black) (property 4 possibly being violated 
		 * since <b>G</b> may have a red parent). To fix this, the entire procedure is recursively performed on 
		 * <b>G</b> from case 1. Note that this is a tail-recursive call, so it could be rewritten as a loop; since 
		 * this is the only loop, and any rotations occur after this loop, this proves that a constant number of 
		 * rotations occur. </p>
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
		 * of right child of grandparent (<b>P</b> is <font color='red'>red</font> and <b>U</b> is 
		 * <font color='darkBlue'>black</font>). </p>
		 *
		 * <p> The parent P is red but the uncle U is black; also, the current node N is the right child of P, 
		 * and P in turn is the left child of its parent G. In this case, a left rotation on P that switches the 
		 * roles of the current node N and its parent P can be performed; then, the former parent node P is dealt 
		 * with using case 5 (relabeling N and P) because property 4 (both children of every red node are black) is 
		 * still violated. The rotation causes some paths (those in the sub-tree labelled "1") to pass through the 
		 * node N where they did not before. It also causes some paths (those in the sub-tree labelled "3") not to 
		 * pass through the node P where they did before. However, both of these nodes are red, so property 5 
		 * (all paths from any given node to its leaf nodes contain the same number of black nodes) is not violated 
		 * by the rotation. After this case has been completed, property 4 (both children of every red node are 
		 * black) is still violated, but now we can resolve this by continuing to case 5. </p>
		 * 
		 * @param N A node to be inserted or swapped.
		 */
		private insertCase4(N: XTreeNode<T>): void
		{
			if (N == N.parent.right && N.parent == N.grandParent.left)
			{
				this.rotateLeft(N.parent);
				N = N.left;
			}
			else if (N == N.parent.left && N.parent == N.grandParent.right)
			{
				this.rotateRight(N.parent);
				N = N.right;
			}

			this.insertCase5(N);
		}

		/**
		 * <p> <i><b>N</b></i> is added to left of left child of grandparent, or <i><b>N</b></i> is added to right 
		 * of right child of grandparent (<b>P</b> is <font color='red'>red</font> and <b>U</b> is 
		 * <font color='darkBlue'>black</font>). </p>
		 *
		 * <p> The parent P is red but the uncle U is black, the current node N is the left child of P, and P is 
		 * the left child of its parent G. In this case, a right rotation on G is performed; the result is a tree 
		 * where the former parent P is now the parent of both the current node N and the former grandparent G. 
		 * G is known to be black, since its former child P could not have been red otherwise (without violating 
		 * property 4). Then, the colors of P and G are switched, and the resulting tree satisfies property 4 
		 * (both children of every red node are black). Property 5 (all paths from any given node to its leaf nodes 
		 * contain the same number of black nodes) also remains satisfied, since all paths that went through any of 
		 * these three nodes went through G before, and now they all go through P. In each case, this is the only 
		 * black node of the three. </p>
		 * 
		 * @param N A node to be inserted or swapped.
		 */
		private insertCase5(N: XTreeNode<T>): void
		{
			N.parent.color = Color.BLACK;
			N.grandParent.color = Color.RED;

			if (N == N.parent.left && N.parent == N.grandParent.left)
				this.rotateRight(N.grandParent);
			else
				this.rotateLeft(N.grandParent);
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
		 * trees, red–black trees can have leaf nodes anywhere, so that all nodes are either internal nodes with 
		 * two children or leaf nodes with, by definition, zero children. In effect, internal nodes having two leaf 
		 * children in a red–black tree are like the leaf nodes in a regular binary search tree.) Because merely 
		 * copying a value does not violate any red–black properties, this reduces to the problem of deleting a node 
		 * with at most one non-leaf child. Once we have solved that problem, the solution applies equally to the 
		 * case where the node we originally want to delete has at most one non-leaf child as to the case just 
		 * considered where it has two non-leaf children. </p>
		 * 
		 * <p> Therefore, for the remainder of this discussion we address the deletion of a node with at most one 
		 * non-leaf child. We use the label M to denote the node to be deleted; C will denote a selected child of M, 
		 * which we will also call "its child". If M does have a non-leaf child, call that its child, C; otherwise, 
		 * choose either leaf as its child, C. </p>
		 * 
		 * <p> If M is a red node, we simply replace it with its child C, which must be black by property 4. 
		 * (This can only occur when M has two leaf children, because if the red node M had a black non-leaf child 
		 * on one side but just a leaf child on the other side, then the count of black nodes on both sides would 
		 * be different, thus the tree would violate property 5.) All paths through the deleted node will simply 
		 * pass through one fewer red node, and both the deleted node's parent and child must be black, 
		 * so property 3 (all leaves are black) and property 4 (both children of every red node are black) still 
		 * hold. </p>
		 * 
		 * <p> Another simple case is when M is black and C is red. Simply removing a black node could break 
		 * Properties 4 (“Both children of every red node are black”) and 5 (“All paths from any given node to its 
		 * leaf nodes contain the same number of black nodes”), but if we repaint C black, both of these properties 
		 * are preserved. </p>
		 * 
		 * <p> The complex case is when both M and C are black. (This can only occur when deleting a black node 
		 * which has two leaf children, because if the black node M had a black non-leaf child on one side but just 
		 * a leaf child on the other side, then the count of black nodes on both sides would be different, thus the 
		 * tree would have been an invalid red–black tree by violation of property 5.) We begin by replacing M with 
		 * its child C. We will relabel this child C (in its new position) N, and its sibling (its new parent's 
		 * other child) S. (S was previously the sibling of M.) In the diagrams below, we will also use P for N's 
		 * new parent (M's old parent), SL for S's left child, and SR for S's right child (S cannot be a leaf 
		 * because if M and C were black, then P's one subtree which included M counted two black-height and thus 
		 * P's other subtree which includes S must also count two black-height, which cannot be the case if S is a 
		 * leaf node). </p>
		 *
		 * <h4> Notes </h4>
		 * <ol>
		 *	<li> The label N will be used to denote the current node (colored black). In the diagrams N carries a 
		 *		 blue contour. At the beginning, this is the replacement node and a leaf, but the entire procedure 
		 *		 may also be applied recursively to other nodes (see case 3). In between some cases, the roles and 
		 *		 labels of the nodes are exchanged, but in each case, every label continues to represent the same 
		 *		 node it represented at the beginning of the case. </li>
		 *	<li> If a node in the right (target) half of a diagram carries a blue contour it will become the current 
		 *		 node in the next iteration and there the other nodes will be newly assigned relative to it. Any 
		 *		 color shown in the diagram is either assumed in its case or implied by those assumptions. 
		 *		 White represents an arbitrary color (either red or black), but the same in both halves of the 
		 *		 diagram. </li>
		 *	<li> A numbered triangle represents a subtree of unspecified depth. A black circle atop a triangle means 
		 *		 that black-height of subtree is greater by one compared to subtree without this circle. </li>
		 * </ul>
		 *
		 * <p> If both N and its original parent are black, then deleting this original parent causes paths which 
		 * proceed through N to have one fewer black node than paths that do not. As this violates property 5 
		 * (all paths from any given node to its leaf nodes contain the same number of black nodes), the tree must 
		 * be rebalanced. There are several cases to consider: </p>
		 * 
		 * <ol>
		 *	<li> N is the new root. </li>
		 *	<li> S is red. </li>
		 *	<li> P, S, and S's children are black. </li>
		 *	<li> S and S's children are black, but P is red. </li>
		 *	<li> S is black, S's left child is red, S's right child is black, and N is the left child of its parent. </li>
		 *	<li> S is black, S's right child is red, and N is the left child of its parent P. </li>
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
		 * possibility of rotation within the loop of cases 1–3), then the parent of the node N becomes red after 
		 * the rotation and we will exit the loop. Therefore, at most one rotation will occur within this loop. 
		 * Since no more than two additional rotations will occur after exiting the loop, at most three rotations 
		 * occur in total. </p>
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
		 * <p> N is the new root. </p>
		 * 
		 * <p> In this case, we are done. We removed one black node from every path, and the new root is black, 
		 * so the properties are preserved. </p>
		 * 
		 * <h4> Note </h4>
		 * <p> In cases 2, 5, and 6, we assume N is the left child of its parent P. If it is the right child, 
		 * left and right should be reversed throughout these three cases. Again, the code examples take both cases 
		 * into account. </p>
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
		 * <p> S is red. </p>
		 * 
		 * <p> In this case we reverse the colors of P and S, and then rotate left at P, 
		 * turning S into N's grandparent. </p>
		 * 
		 * <p> Note that P has to be black as it had a red child. The resulting subtree has a path short one black 
		 * node so we are not done. Now N has a black sibling and a red parent, so we can proceed to step 4, 5, or 6. 
		 * (Its new sibling is black because it was once the child of the red S.) In later cases, we will re-label 
		 * N's new sibling as S. </p>
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
		 * <p> P, S, and S's children are black. </p>
		 * 
		 * <p> In this case, we simply repaint S red. The result is that all paths passing through S, which are 
		 * precisely those paths not passing through N, have one less black node. Because deleting N's original 
		 * parent made all paths passing through N have one less black node, this evens things up. </p>
		 *
		 * However, all paths through P now have one fewer black node than paths that do not pass through P, so 
		 * property 5 (all paths from any given node to its leaf nodes contain the same number of black nodes) is 
		 * still violated. To correct this, we perform the rebalancing procedure on P, starting at case 1. </p>
		 * 
		 * @param node A node to be erased or swapped.
		 */
		private eraseCase3(node: XTreeNode<T>): void
		{
			if (this.fetchColor(node.parent) == Color.BLACK &&
				this.fetchColor(node.sibling) == Color.BLACK &&
				this.fetchColor(node.sibling.left) == Color.BLACK &&
				this.fetchColor(node.sibling.right) == Color.BLACK)
			{
				node.sibling.color = Color.RED;

				this.eraseCase1(node.parent);
			}
			else
				this.eraseCase4(node);
		}

		/**
		 * <p> S and S's children are black, but P is red. In this case, we simply exchange the colors of S and P. </p>
		 *
		 * <p> This does not affect the number of black nodes on paths going through S, but it does add one to the 
		 * number of black nodes on paths going through N, making up for the deleted black node on those paths. </p>
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
		 * <p> S is black, S's left child is red, S's right child is black, and N is the left child of its parent. </p> 
		 * 
		 * <p> In this case we rotate right at S, so that S's left child becomes S's parent and N's new sibling. 
		 * We then exchange the colors of S and its new parent. All paths still have the same number of black nodes, 
		 * but now N has a black sibling whose right child is red, so we fall into case 6. Neither N nor its parent 
		 * are affected by this transformation. (Again, for case 6, we relabel N's new sibling as S.) </p>
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
		 * <p> S is black, S's right child is red, and N is the left child of its parent P. </p>
		 * 
		 * <p> In this case we rotate left at P, so that S becomes the parent of P and S's right child. We then 
		 * exchange the colors of P and S, and make S's right child black. The subtree still has the same color at 
		 * its root, so Properties 4 (Both children of every red node are black) and 5 (All paths from any given 
		 * node to its leaf nodes contain the same number of black nodes) are not violated. However, N now has one 
		 * additional black ancestor: either P has become black, or it was black and S was added as a black 
		 * grandparent. Thus, the paths passing through N pass through one additional black node. </p>
		 * 
		 * <p> Meanwhile, if a path does not go through N, then there are two possibilities: </p>
		 * <ol>
		 *	<li> It goes through N's new sibling SL, a node with arbitrary color and the root of the subtree 
		 *		 labeled 3 (s. diagram). Then, it must go through S and P, both formerly and currently, as they 
		 *		 have only exchanged colors and places. Thus the path contains the same number of black nodes. </li>
		 *	<li> It goes through N's new uncle, S's right child. Then, it formerly went through S, S's parent, 
		 *		 and S's right child SR (which was red), but now only goes through S, which has assumed the color 
		 *		 of its former parent, and S's right child, which has changed from red to black (assuming S's 
		 *		 color: black). The net effect is that this path goes through the same number of black nodes. </li>
		 * 
		 * <p> Either way, the number of black nodes on these paths does not change. Thus, we have restored 
		 * Properties 4 (Both children of every red node are black) and 5 (All paths from any given node to its 
		 * leaf nodes contain the same number of black nodes). The white node in the diagram can be either red or 
		 * black, but must refer to the same color both before and after the transformation. </p>
		 * 
		 * @param N A node to be erased or swapped.
		 */
		private eraseCase6(N: XTreeNode<T>): void
		{
			N.sibling.color = this.fetchColor(N.parent);
			N.parent.color = Color.BLACK;

			if (N == N.parent.left)
			{
				N.sibling.right.color = Color.BLACK;

				this.rotateLeft(N.parent);
			}
			else
			{
				N.sibling.left.color = Color.BLACK;
				
				this.rotateRight(N.parent);
			}
		}

		/* ---------------------------------------------------------
			ROTATION
		--------------------------------------------------------- */
		private rotateLeft(node: XTreeNode<T>): void
		{
			let right = node.right;
			this.replaceNode(node, right);

			node.right = right.left;
			if (right.left != null)
				right.left.parent = node;

			right.left = node;
			node.parent = right;
		}

		private rotateRight(node: XTreeNode<T>): void
		{
			let left = node.left;
			this.replaceNode(node, left);

			node.left = left.right;
			if (left.right != null)
				left.right.parent = node;

			left.right = node;
			node.parent = left;
		}

		private replaceNode(oldNode: XTreeNode<T>, newNode: XTreeNode<T>): void
		{
			if (oldNode.parent == null)
				this.root = newNode;
			else
			{
				if (oldNode == oldNode.parent.left)
					oldNode.parent.left = newNode;
				else
					oldNode.parent.right = newNode;
			}

			if (newNode != null)
				newNode.parent = oldNode.parent;
		}

		private fetchColor(node: XTreeNode<T>): boolean
		{
			if (node == null)
				return Color.BLACK;
			else
				return node.color;
		}
	}
}

