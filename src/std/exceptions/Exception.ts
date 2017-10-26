/// <reference path="../API.ts" />

namespace std
{
	export class Exception extends Error
	{
		public constructor();

		public constructor(message: string);

		public constructor(message: string = "")
		{
			super(message);
		}

		public what(): string
		{
			return this.message;
		}
	}
}
