namespace std
{
	export interface ILockable
	{
		lock(): Promise<void>;

		try_lock(): boolean;

		unlock(): void;
	}
}