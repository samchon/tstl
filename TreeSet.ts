/// <reference path="base/container/UniqueSet.ts" />

namespace std
{
	/**
	 * <p> Tree-structured set. </p>
	 *
	 * <p> <code>TreeSet</code>s are containers that store unique elements following a specific order. </p>
	 *
	 * <p> In a <code>TreeSet</code>, the value of an element also identifies it (the value is itself the 
	 * <i>key</i>, of type <code>T</code>), and each value must be unique. The value of the elements in a 
	 * <code>TreeSet</code> cannot be modified once in the container (the elements are always const), but they 
	 * can be inserted or removed from the container. </p>
	 *
	 * <p> Internally, the elements in a set are always sorted following a specific strict weak ordering 
	 * criterion indicated by its internal comparison method (of <code>less()</code>). </p>
	 *
	 * <p> <code>TreeSet</code> containers are generally slower than <code>HashSet</code> containers to access 
	 * individual elements by their <i>key</i>, but they allow the direct iteration on subsets based on their 
	 * order. </p>
	 *
	 * <p> <code>TreeSet</code>s are typically implemented as binary search trees. </p>
	 *
	 * <h3> Container properties </h3>
	 * <dl>
	 *	<dt> Associative </dt>
	 *	<dd> Elements in associative containers are referenced by their <i>key</i> and not by their absolute 
	 *		 position in the container. </dd>
	 * 
	 *	<dt> Ordered </dt>
	 *	<dd> The elements in the container follow a strict order at all times. All inserted elements are 
	 *		 given a position in this order. </dd>
	 *
	 *	<dt> Set </dt>
	 *	<dd> The value of an element is also the <i>key</i> used to identify it. </dd>
	 *
	 *	<dt> Unique keys </dt>
	 *	<dd> No two elements in the container can have equivalent <i>keys</i>. </dd>
	 * </dl>
	 *
	 * <ul>
	 *	<li> Reference: http://www.cplusplus.com/reference/set/set/ </li>
	 * </ul>
	 *
	 * @param <T> Type of the elements. 
	 *			  Each element in an <code>TreeSet</code> is also uniquely identified by this value.
	 *
	 * @author Jeongho Nam
	 */
	export class TreeSet<T>
		extends base.container.UniqueSet<T>
	{
		/**
		 * <i>RB-Tree+</i> object for implemeting the <code>TreeSet</code>.
		 */
		private tree: base.tree.AtomicTree<T>;

		/* =========================================================
			CONSTRUCTORS & SEMI-CONSTRUCTORS
				- CONSTRUCTORS
				- ASSIGN & CLEAR
		============================================================
			CONSTURCTORS
		--------------------------------------------------------- */
		/**
		 * Default Constructor
		 */
		public constructor();

		public constructor(array: Array<T>);

		public constructor(container: base.container.Container<T>);

		public constructor(begin: base.container.Iterator<T>, end: base.container.Iterator<T>);
		
		public constructor(...args: any[])
		{
			super();

			this.tree = new base.tree.AtomicTree<T>();
		}

		/* ---------------------------------------------------------
			ASSIGN & CLEAR
		--------------------------------------------------------- */
		/**
		 * @inheritdoc
		 */
		public assign<U extends T>(begin: base.container.Iterator<U>, end: base.container.Iterator<U>): void
		{
			super.assign(begin, end);
		}

		/**
		 * @inheritdoc
		 */
		public clear(): void
		{
			super.clear();

			this.tree = new base.tree.AtomicTree<T>();
		}
		
		/* =========================================================
			ACCESSORS
		========================================================= */
		/**
		 * @inheritdoc
		 */
		public find(val: T): SetIterator<T>
		{
			var node = this.tree.find(val);

			if (node == null || std.equals(node.value.value, val) == false)
				return this.end();
			else
				return node.value;
		}

		public findNear(val: T): SetIterator<T>
		{
			var node = this.tree.find(val);

			if (node == null)
				return this.end();
			else
				return node.value;
		}

		/* =========================================================
			ELEMENTS I/O
				- INSERT
				- POST-PROCESS
		============================================================
			INSERT
		--------------------------------------------------------- */
		/**
		 * @private
		 */
		protected insertByVal(val: T): any
		{
			var node = this.tree.find(val);

			// IF EQUALS, THEN RETURN FALSE
			if (node != null && std.equals(node.value.value, val) == true)
				return new Pair<SetIterator<T>, boolean>(node.value, false);
			
			// INSERTS
			var it: SetIterator<T>;

			if (node == null)
				it = this.end();
			else if (std.less(node.value.value, val) == true)
				it = node.value.next();
			else
				it = node.value;

			// ITERATOR TO RETURN
			it = this.insert(it, val);

			return new Pair<SetIterator<T>, boolean>(it, true);
		}

		/* ---------------------------------------------------------
			POST-PROCESS
		--------------------------------------------------------- */
		/**
		 * @inheritdoc
		 */
		protected handleInsert(item: SetIterator<T>): void
		{
			this.tree.insert(item);
		}

		/**
		 * @inheritdoc
		 */
		protected handleErase(item: SetIterator<T>): void
		{
			this.tree.erase(item);
		}
	}
}