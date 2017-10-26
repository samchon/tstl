/// <reference path="../API.ts" />

/// <reference path="Exception.ts" />

namespace std
{
	export class RuntimeError
		extends Exception
	{
		public constructor(message: string)
		{
			super(message);
		}
	}

	export class OverflowError
		extends RuntimeError
	{
		public constructor(message: string)
		{
			super(message);
		}
	}

	export class UnderflowError
		extends RuntimeError
	{
		public constructor(message: string)
		{
			super(message);
		}
	}

	export class RangeError
		extends RuntimeError
	{
		public constructor(message: string)
		{
			super(message);
		}
	}
}