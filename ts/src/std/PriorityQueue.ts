namespace std
{
	/**
	 * <p> Priority queue. </p>
	 * 
	 * <p> {@link PriorityQueue Priority queues} are a type of container adaptors, specifically designed such that its
	 * first element is always the greatest of the elements it contains, according to some <i>strict weak ordering</i>
	 * criterion. </p>
	 * 
	 * <p> This context is similar to a <i>heap</i>, where elements can be inserted at any moment, and only the 
	 * <i>max heap</i> element can be retrieved (the one at the top in the {@link PriorityQueue priority queue}). </p>
	 * 
	 * <p> {@link PriorityQueue Priority queues} are implemented as <i>container adaptors</i>, which are classes that 
	 * use an encapsulated object of a specific container class as its {@link container_ underlying container}, 
	 * providing a specific set of member functions to access its elements. Elements are popped from the <i>"back"</i> 
	 * of the specific container, which is known as the <i>top</i> of the {@link PriorityQueue Priority queue}. </p>
	 * 
	 * <p> The {@link container_ underlying container} may be any of the standard container class templates or some 
	 * other specifically designed container class. The container shall be accessible through 
	 * {@link IArrayIterator random access iterators} and support the following operations: </p>
	 *
	 * <ul>
	 *	<li> empty() </li>
	 *	<li> size() </li>
	 *	<li> front() </li>
	 *	<li> push_back() </li>
	 *	<li> pop_back() </li>
	 * </ul>
	 *
	 * <p> The standard container classes {@link Vector} and {@link Deque} fulfill these requirements. By default, if 
	 * no container class is specified for a particular {@link PriorityQueue} class instantiation, the standard 
	 * container {@link Vector} is used. </p>
	 * 
	 * <p> Support of {@link IArrayIterator random access iterators} is required to keep a heap structure internally 
	 * at all times. This is done automatically by the container adaptor by automatically calling the algorithm 
	 * functions make_heap, push_heap and pop_heap when needed. </p>
	 *
	 * @param <T> Type of the elements.
	 *
	 * @reference http://www.cplusplus.com/reference/queue/priority_queue/
	 * @author Jeongho Nam
	 */
	export class PriorityQueue<T>
	{
		/**
		 * The <i>underlying object</i> for implementing the <i>priority queue</i>.
		 */
		private container_: TreeMultiSet<T>;

		/* ---------------------------------------------------------
			ACCESSORS
		--------------------------------------------------------- */
		public size(): number
		{
			return this.container_.size();
		}

		/**
		 * <p> Test whether container is empty. </p>
		 * 
		 * <p> Returns whether the {@link PriorityQueue} is empty: i.e. whether its {@link size} is zero. </p>
		 * 
		 * <p> This member function effectively calls member {@link IContainer.empty empty} of the 
		 * {@link container_ underlying container} object. </p>
		 */
		public empty(): boolean
		{
			return this.container_.empty();
		}

		/* ---------------------------------------------------------
			ELEMENTS I/O
		--------------------------------------------------------- */
		public top(): T
		{
			return this.container_.begin().value;
		}

		public push(val: T): void
		{
			this.container_.insert(val);
		}

		public pop(): void
		{
			this.container_.erase(this.container_.begin());
		}

		public swap(obj: PriorityQueue<T>): void
		{
			this.container_.swap(obj.container_);
		}
	}
}