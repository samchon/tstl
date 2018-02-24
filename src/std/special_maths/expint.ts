/// <reference path="../API.ts" />

namespace std
{
	const MAXIT = 100;
	const EPS = 1.0e-10;
	const FPMIN = 1.0e-30;
	const GAMMA = 0.5772156649015329;

	export function expint(x: number): number;
	export function expint(n: number, x: number): number;

	export function expint(x: number, y: number = null): number
	{
		if (y == null)
			return ei(x);
		else
			return exp_int(Math.floor(x), y);
	}

	function exp_int(n: number /*int*/, x: number): number 
	{
		let i: number, ii: number, nm1: number; // int
		let a: number, b: number, c: number, d: number;
		let del: number, fact: number, h: number, psi: number;
		let ans: number;

		nm1 = n-1;

		if ( n < 0 || x < 0.0 || ( x == 0.0 && ( n == 0 || n == 1 ) ) ) 
			throw new std.InvalidArgument( "Bad arguments in exp_int." );
		else if ( n == 0 ) 
			return Math.exp(-x)/x;
		else if ( x == 0.0 ) 
			return 1.0/nm1;

		if ( x > 1.0 ) 
		{
			b = x + n;
			c = 1.0/FPMIN;
			d = 1.0/b;
			h = d;

			for (i = 1; i <= MAXIT; ++i) 
			{
				a = -i*(nm1 + i);
				b += 2.0;
				d = 1.0/(a*d + b);
				c = b + a/c;
				del = c*d;
				h *= del;

				if ( Math.abs(del - 1.0) < EPS ) 
				{
					ans = h*Math.exp(-x);
					return ans;
				}
			}
			throw new std.DomainError( "Continued fraction failed in exp_int." );
		} 
		else 
		{
			ans = (nm1 != 0 ? 1.0/nm1 : -Math.log(x) - GAMMA );
			fact = 1.0;
			for ( i = 1; i <= MAXIT; ++i ) {
				fact *= -x/i;
				if ( i != nm1 ) del = -fact/(i - nm1);
				else {
					psi = -GAMMA;
					for ( ii = 1; ii <= nm1; ++ii ) psi += 1.0/ii;
					del = fact*(psi - Math.log(x)); 
				}
				ans += del;
				if (Math.abs(del) < EPS*Math.abs(ans) )
					return ans;
			}
			throw new std.DomainError( "Series failed in exp_int." );
		}
	}

	function ei(x: number): number
	{
		let k: number;
		let fact: number, prev: number, sum: number, term: number;

		if ( x <= 0.0 ) 
			throw new std.InvalidArgument( "Bad argument in ei." );
		else if ( x < FPMIN )
			return GAMMA + Math.log(x);
		
		if ( x <= -Math.log(EPS) ) {
			sum = 0.0;
			fact = 1.0;
			for ( k = 1; k <= MAXIT; ++k ) {
				fact *= x/k;
				term = fact/k;
				sum += term;
				if ( term < EPS*sum ) break;
			}
			if ( k > MAXIT ) 
				throw new std.DomainError( "Series failed in ei." );

			return GAMMA + sum + Math.log(x);
		} 
		else 
		{
			sum = 0.0;
			fact = 1.0;

			for ( k = 1; k <= MAXIT; ++k ) 
			{
				prev = term;
				term *= k/x;

				if ( term < EPS ) 
					break;
				else if ( term < prev ) 
					sum += term;
				else 
				{
					sum -= prev;
					break;
				}
			}
			return (1.0 + sum)*Math.exp(x)/x;
		}
	}
}