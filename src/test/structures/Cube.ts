/// <reference path="../API.ts" />

namespace test
{
	export class Cube
	{
		// LENGTHS ON EACH DIMENSION
		public width: number;
		public height: number;
		public length: number;

		// CO-ORDINATES
		public x: number;
		public y: number;
		public z: number;

		public constructor();
		public constructor(width: number, height: number, length: number);
		public constructor
			(
				width: number, height: number, length: number,
				x: number, y: number, z: number
			)

		public constructor
			(
				width: number = Math.random() * 10, 
				height: number = Math.random() * 10, 
				length: number = Math.random() * 10,
				x: number = Math.random() * 100, 
				y: number = Math.random() * 100, 
				z: number = Math.random() * 100
			)
		{
			this.width = width;
			this.height = height;
			this.length = length;

			this.x = x;
			this.y = y;
			this.z = z;
		}

		public get volume(): number
		{
			return this.width * this.height * this.length;
		}
	}

	export namespace Cube
	{
		export function compare_volume(x: Cube, y: Cube): boolean
		{
			return x.volume < y.volume;
		}

		export function compare_position(left: Cube, right: Cube): boolean
		{
			if (left.x !==right.x) 
				return left.x < right.x;
			else if (left.y !==right.y) 
				return left.y < right.y;
			else 
				return left.z < right.z;
		}
	}
}