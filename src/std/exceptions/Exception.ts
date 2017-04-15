/// <reference path="../API.ts" />

namespace std
{
	/**
	 * Standard exception class.
	 *  
	 * Base class for standard exceptions.
	 *
	 * All objects thrown by components of the standard library are derived from this class. 
	 * Therefore, all standard exceptions can be caught by catching this type by reference.
	 *
	 * <a href="http://samchon.github.io/tstl/images/class_diagram/exceptions.png" target="_blank"> 
	 * <img src="http://samchon.github.io/tstl/images/class_diagram/exceptions.png" style="max-width: 100%" /> </a>
	 * 
	 * @reference http://www.cplusplus.com/reference/exception/exception
	 * @author Jeongho Nam <http://samchon.org>
	 */
	export class Exception
	{
		/**
		 * @hidden
		 */
		private message_: string;

		/**
		 * Default Constructor.
		 */
		public constructor();

		/**
		 * Construct from a message.
		 *
		 * @param message A message representing specification about the Exception.
		 */
		public constructor(message: string);

		public constructor(message: string = "")
		{
			this.message_ = message;
		}

		/**
		 * Get string identifying exception.
		 * 
		 * Returns a string that may be used to identify the exception.
		 *
		 * The particular representation pointed by the returned value is implementation-defined. 
		 * As a virtual function, derived classes may redefine this function so that specify value are 
		 * returned.
		 */
		public what(): string
		{
			return this.message_;
		}
	}
}