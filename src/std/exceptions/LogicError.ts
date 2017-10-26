/// <reference path="../API.ts" />

/// <reference path="Exception.ts" />

namespace std
{
	export class LogicError
		extends Exception
	{
		public constructor(message: string)
		{
			super(message);
		}
	}

	export class DomainError
		extends LogicError
	{
		public constructor(message: string)
		{
			super(message);
		}
	}

	export class InvalidArgument
		extends LogicError
	{
		public constructor(message: string)
		{
			super(message);
		}
	}

	export class LengthError
		extends LogicError
	{
		public constructor(message: string)
		{
			super(message);
		}
	}

	export class OutOfRange
		extends LogicError
	{
		public constructor(message: string)
		{
			super(message);
		}
	}
}