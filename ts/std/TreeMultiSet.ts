/// <reference path="base/container/MultiSet.ts" />

namespace std
{
	/**
	 * <p> Tree-structured multiple-key set. </p>
	 *
	 * <p> <code>TreeMultiSet</code>s are containers that store elements following a specific order, and where 
	 * multiple elements can have equivalent values. </p>
	 *
	 * <p> In a <code>TreeMultiSet</code>, the value of an element also identifies it (the value is itself 
	 * the <i>key</i>, of type <code>T</code>). The value of the elements in a <code>TreeMultiSet</code> cannot 
	 * be modified once in the container (the elements are always const), but they can be inserted or removed 
	 * from the container. </p>
	 *
	 * <p> Internally, the elements in a <code>TreeMultiSet</code>s are always sorted following a strict weak 
	 * ordering criterion indicated by its internal comparison method (of {@link less}).
	 *
	 * <p> <code>TreeMultiSet</code> containers are generally slower than <code>HashMultiSet</code> containers 
	 * to access individual elements by their <i>key</i>, but they allow the direct iteration on subsets based on 
	 * their order. </p>
	 *
	 * <p> <code>TreeMultiSet</code>s are typically implemented as binary search trees. </p>
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
	 *	<dt> Multiple equivalent keys </dt>
	 *	<dd> Multiple elements in the container can have equivalent <i>keys</i>. </dd>
	 * </dl>
	 *
	 * <ul>
	 *	<li> Reference: http://www.cplusplus.com/reference/set/multiset/ </li>
	 * </ul>
	 * 
	 * @param <T> Type of the elements. Each element in a <code>TreeMultiSet</code> container is also identified 
	 *			  by this value (each value is itself also the element's <i>key</i>).
	 *
	 * @author Jeongho Nam
	 */
	export class TreeMultiSet<T>
		extends base.container.MultiSet<T>
	{
		/**
		 * <i>RB-Tree+</i> object for implemeting the <code>TreeMultiSet</code>.
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
		 * Default Constructor.
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

			if (node == null || std.equals(val, node.value.value) == false)
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
			var it: SetIterator<T>;

			if (node == null)
			{
				it = this.end();
			}
			else if (std.equals(node.value.value, val) == true)
			{
				it = node.value.next();
			}
			else if (std.less(node.value.value, val) == true)
			{
				it = node.value.next();

				while (it.equals(this.end()) == false && std.less(it.value, val))
					it = it.next();
			}
			else
			{
				it = node.value;
			}

			// ITERATOR TO RETURN
			return this.insert(it, val);
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