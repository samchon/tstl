/// <reference path="base/container/MultiSet.ts" />

namespace std
{
	export class MultiSet<T>
		extends base.container.MultiSet<T>
	{
		private tree: base.tree.AtomicTree<T>;

		/* =========================================================
			CONSTRUCTORS & SEMI-CONSTRUCTORS
				- CONSTRUCTORS
				- ASSIGN & CLEAR
		============================================================
			CONSTURCTORS
		--------------------------------------------------------- */
		public constructor();

		public constructor(array: Array<T>);

		public constructor(container: base.container.Container<T>);

		public constructor(begin: Iterator<T>, end: Iterator<T>);

		public constructor(...args: any[])
		{
			super();

			this.tree = new base.tree.AtomicTree<T>();
		}

		/* ---------------------------------------------------------
			ASSIGN & CLEAR
		--------------------------------------------------------- */
		///**
		// * @inheritdoc
		// */
		//public assign<U extends T>(begin: Iterator<U>, end: Iterator<U>): void
		//{
		//	super.assign(begin, end);
		//}

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
		public find(val: T): Iterator<T>
		{
			var node = this.tree.find(val);

			if (node == null || std.equals(val, node.value.value) == false)
				return this.end();
			else
				return node.value;
		}

		public findNear(val: T): Iterator<T>
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
		protected insertByVal(val: T): any
		{
			var node = this.tree.find(val);
			var it: SetIterator<T>;

			if (node == null)
			{
				it = <SetIterator<T>>this.end();
			}
			else if (std.equals(node.value.value, val) == true)
			{
				it = <SetIterator<T>>node.value.next();
			}
			else if (std.less(node.value.value, val) == true)
			{
				it = <SetIterator<T>>node.value.next();

				while (it.equals(this.end()) == false && std.less(it.value, val))
					it = <SetIterator<T>>it.next();
			}
			else
			{
				it = <SetIterator<T>>node.value;
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