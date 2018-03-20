/// <reference path="../API.ts" />

namespace std
{
	export class Exception extends Error
	{
		/**
		 * Default Constructor.
		 */
		public constructor();

		/**
		 * Construct from error message.
		 * 
		 * @param message The error messgae
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
}
