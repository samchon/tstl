/// <reference path="../API.ts" />

namespace std
{
	export class Mutex
	{
		/**
		 * @hidden
		 */
		private listeners_: std.Queue<()=>void>;

		/**
		 * Default Constructor.
		 */
		public constructor()
		{
			this.listeners_ = new std.Queue<()=>void>();
		}

		public lock(): Promise<void>
		{
			return new Promise<void>(resolve =>
			{
				if (this.listeners_.empty())
					resolve();
				else
					this.listeners_.push(resolve);
			});
		}

		public unlock(): Promise<void>
		{
			return new Promise<void>(resolve =>
			{
				if (this.listeners_.empty() == false)
				{
					this.listeners_.front()();
					this.listeners_.pop();
				}
				resolve();
			});
		}
	}
}