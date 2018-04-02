import { hash } from "../../functional/hash";
import { equal_to } from "../../functional/comparisons";

/**
 * @hidden
 */
export interface _IHashContainer<Key>
{
	/* ---------------------------------------------------------
		PREDICATORS
	--------------------------------------------------------- */
	/**
	 * Get hash function.
	 * 
	 * @return The hash function.
	 */
	hash_function(): (key: Key) => number;

	/**
	 * Get key equality predicator.
	 * 
	 * @return The key equality predicator.
	 */
	key_eq(): (x: Key, y: Key) => boolean;

	/* ---------------------------------------------------------
		GETTERS
	--------------------------------------------------------- */
	/**
	 * Compute bucket index for the *key*.
	 * 
	 * @param key Target key.
	 * @return Index number.
	 */
	bucket(key: Key): number;

	/**
	 * Get number of buckets.
	 */
	bucket_count(): number;

	/**
	 * Get size of a specific bucket.
	 * 
	 * @param index Specific position.
	 * @return Size of the specific bucket.
	 */
	bucket_size(index: number): number;

	/**
	 * Compute load factor.
	 * 
	 * @return `this.size() / this.bucket_count()`
	 */
	load_factor(): number;

	/**
	 * Get maximum load factor that allowable.
	 * 
	 * @return The maximum load factor.
	 */
	max_load_factor(): number;

	/* ---------------------------------------------------------
		SETTERS
	--------------------------------------------------------- */
	/**
	 * Set maximum load factor.
	 * 
	 * @param z The new value to change.
	 */
	max_load_factor(z: number): void;

	/**
	 * Reserve buckets enable to store *n* elements.
	 * 
	 * @param n The capacity to reserve.
	 */
	reserve(n: number): void;
	
	/**
	 * Change of bucktes.
	 * 
	 * @param n The number to change.
	 */
	rehash(n: number): void;
}

export function _Construct<Key>(Source: any, Bucket: any, ...args: any[])
{
	// DECLARE MEMBERS
	let hash_function: (key: Key) => number = hash;
	let key_eq: (x: Key, y: Key) => boolean = equal_to;
	let post_process: () => void = null;

	//----
	// INITIALIZE MEMBERS AND POST-PROCESS
	//----
	// BRANCH - METHOD OVERLOADINGS
	if (args.length == 1 && args[0] instanceof Source)
	{
		// PARAMETERS
		let container: _IHashContainer<Key> = args[0];
		hash_function = container.hash_function();
		key_eq = container.key_eq();

		// COPY CONSTRUCTOR
		post_process = () =>
		{
			let first = (container as any).begin();
			let last = (container as any).end();

			this.assign(first, last);
		};
	}
	else if (args.length >= 1 && args[0] instanceof Array)
	{
		// FUNCTION TEMPLATES
		if (args.length >= 2)	hash_function = args[1];
		if (args.length == 3)	key_eq = args[2];

		// INITIALIZER LIST CONSTRUCTOR
		post_process = () =>
		{
			let items: Array<any> = args[0];
			this.push(...items);
		};
	}
	else if (args.length >= 2 && args[0].next instanceof Function && args[1].next instanceof Function)
	{
		// FUNCTION TEMPLATES
		if (args.length >= 3)	hash_function = args[2];
		if (args.length == 4)	key_eq = args[3];

		// RANGE CONSTRUCTOR
		post_process = () =>
		{
			let first: Readonly<any> = args[0];
			let last: Readonly<any> = args[1];

			this.assign(first, last);
		};
	}
	else
	{
		// FUNCTION TEMPLATES
		if (args.length >= 1)	hash_function = args[0];
		if (args.length == 2)	key_eq = args[1];
	}

	//----
	// DO PROCESS
	//----
	// CONSTRUCT BUCKET
	this.buckets_ = new Bucket(this, hash_function, key_eq);

	// ACT POST-PROCESS
	if (post_process != null)
		post_process();
}