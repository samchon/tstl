/**
 * Base Exception.
 * 
 * @author Jeongho Nam <http://samchon.org>
 */
export class Exception extends Error
{
	/**
	 * Default Constructor.
	 */
	public constructor();

	/**
	 * Initializer Constructor.
	 * 
	 * @param message The error messgae.
	 */
	public constructor(message: string);

	public constructor(message: string = "")
	{
		super(message);
	}

	/**
	 * Get error message.
	 * 
	 * @return The error message.
	 */
	public what(): string
	{
		return this.message;
	}
}

export type exception = Exception;
export const exception = Exception;