/// <reference path="../API.ts" />

namespace std
{
	/* ---------------------------------------------------------
		CYL_BESSEL_I
	--------------------------------------------------------- */
	export function cyl_bessel_i(n: number, x: number): number
	{
		if (n == 0)
			return _Bessel_i0(x);
		else if (n == 1)
			return _Bessel_i1(x);
		else if (n < 0)
			return NaN;
		else if (x == 0)
			return 0;

		let ret: number = 0.0;
		let tox: number = 2 / Math.abs(x);
		let bip: number = 0.0;
		let bi: number = 1.0;
		let bim: number = 0.0;
		let m: number = 2 * Math.round((n + Math.round(Math.sqrt(40 * n))) / 2);

		for (let j: number =m ;j > 0; --j) 
		{
			bim=j*tox*bi + bip;
			bip=bi; bi=bim;

			if (Math.abs(bi) > 1E10) 
			{
				bi *= 1E-10;
				bip *= 1E-10;
				ret *= 1E-10;
			}
			if(j == n) 
				ret = bip;
		}
		ret *= cyl_bessel_i(0, x) / bi;
		return x < 0 && (n%2) ? -ret : ret;
	}

	function _Bessel_i0(x: number): number
	{
		const B0_A = [0.45813e-2, 0.360768e-1, 0.2659732, 1.2067492, 3.0899424, 3.5156229, 1.0];
		const B0_B = [0.392377e-2, -0.1647633e-1, 0.2635537e-1, -0.2057706e-1, 0.916281e-2, -0.157565e-2, 0.225319e-2, 0.1328592e-1, 0.39894228];

		if(x <= 3.75) 
			return _Bessel_horner(B0_A, x*x/(3.75*3.75));
		else
    		return Math.exp(Math.abs(x))/Math.sqrt(Math.abs(x))*_Bessel_horner(B0_B, 3.75/Math.abs(x));
	}

	function _Bessel_i1(x: number): number
	{
		const B1_A = [0.32411e-3, 0.301532e-2, 0.2658733e-1, 0.15084934, 0.51498869, 0.87890594, 0.5];
		const B1_B = [-0.420059e-2, 0.1787654e-1, -0.2895312e-1, 0.2282967e-1, -0.1031555e-1, 0.163801e-2, -0.362018e-2, -0.3988024e-1, 0.39894228];

		if(x < 3.75) 
			return x * _Bessel_horner(B1_A, x*x/(3.75*3.75));
		else
			return (x < 0 ? -1 : 1) * Math.exp(Math.abs(x))/Math.sqrt(Math.abs(x))*_Bessel_horner(B1_B, 3.75/Math.abs(x));
	}

	/* ---------------------------------------------------------
		CYLP_BESSEL_J
	--------------------------------------------------------- */
	export function cyl_bessel_j(k: number, x: number): number
	{
		if(!isFinite(x))
			return isNaN(x) ? x : 0;
		else if(k < 0)
			return ((k%2)?-1:1)*cyl_bessel_j(-k, x);
		else if(x < 0)
			return ((k%2)?-1:1)*cyl_bessel_j(k, -x);
		else if(k == 0)
			return _Bessel_j0(x);
		else if(k == 1)
			return _Bessel_j1(x);
		else if(x == 0)
			return 0;
	
		if(x > k)
		  return _Bessel_iter(k, x, _Bessel_j0(x), _Bessel_j1(x),-1);

		let ret: number = 0.0;
		let m: number = 2*Math.floor((k+Math.floor(Math.sqrt(40*k)))/2);
		let jsum: boolean = false;
		let bjp: number =0.0; 
		let sum: number = 0.0;
		let bj: number = 1.0;
		let bjm: number = 0.0;
		let tox: number = 2 / x;

		for (let j: number = m; j > 0; --j) 
		{
			bjm = j*tox*bj-bjp;
			bjp = bj;
			bj = bjm;

			if (Math.abs(bj) > 1E10) 
			{
				bj *= 1E-10;
				bjp *= 1E-10;
				ret *= 1E-10;
				sum *= 1E-10;
			}

			if (jsum) 
				sum += bj;
			jsum=!jsum;

			if (j == k)
				ret = bjp;
		}

		sum = 2.0 * sum - bj;
		return ret / sum;
	}

	function _Bessel_j0(x: number): number
	{
		const W = 2 / Math.PI;
		const b0_a1a = [57568490574.0, -13362590354.0, 651619640.7, -11214424.18, 77392.33017, -184.9052456].reverse();
		const b0_a2a = [57568490411.0, 1029532985.0, 9494680.718, 59272.64853, 267.8532712, 1.0].reverse();
		const b0_a1b = [1.0, -0.1098628627e-2, 0.2734510407e-4, -0.2073370639e-5, 0.2093887211e-6].reverse();
		const b0_a2b = [-0.1562499995e-1, 0.1430488765e-3, -0.6911147651e-5, 0.7621095161e-6, -0.934935152e-7].reverse();

		let ret: number = 0;
		let y: number = x * x;

		if(x < 8) 
		{
			let a1: number = _Bessel_horner(b0_a1a, y);
			let a2: number = _Bessel_horner(b0_a2a, y);

			ret = a1 / a2;
		} 
		else 
		{
			y = 64 / y;

			let xx: number = x - 0.785398164;
			let a1: number = _Bessel_horner(b0_a1b, y);
			let a2: number = _Bessel_horner(b0_a2b, y);

			ret = Math.sqrt(W/x)*(Math.cos(xx)*a1-Math.sin(xx)*a2*8/x);
		}
		return ret;
	}

	function _Bessel_j1(x: number): number
	{
		const W = 2 / Math.PI;
		const b1_a1a = [72362614232.0, -7895059235.0, 242396853.1, -2972611.439, 15704.48260, -30.16036606].reverse();
		const b1_a2a = [144725228442.0, 2300535178.0, 18583304.74, 99447.43394, 376.9991397, 1.0].reverse();
		const b1_a1b = [1.0, 0.183105e-2, -0.3516396496e-4, 0.2457520174e-5, -0.240337019e-6].reverse();
		const b1_a2b = [0.04687499995, -0.2002690873e-3, 0.8449199096e-5, -0.88228987e-6, 0.105787412e-6].reverse();
		
		let ret: number;
		let y: number = x*x;
		let xx: number = Math.abs(x) - 2.356194491;

		if(Math.abs(x)< 8) 
		{
			let a1 = x*_Bessel_horner(b1_a1a, y);
			let a2 = _Bessel_horner(b1_a2a, y);

			ret = a1 / a2;
		} 
		else 
		{
			y = 64 / y;
			let a1: number =_Bessel_horner(b1_a1b, y);
			let a2: number =_Bessel_horner(b1_a2b, y);

			ret = Math.sqrt(W/Math.abs(x))*(Math.cos(xx)*a1-Math.sin(xx)*a2*8/Math.abs(x));
			if(x < 0)
				ret = -ret;
		}
		return ret;
	}

	/* ---------------------------------------------------------
		CYL_BESSEL_K
	--------------------------------------------------------- */
	export function cyl_bessel_k(n: number, x: number): number
	{
		return _Bessel_wrap(_Bessel_k0, _Bessel_k1, n, x, 2, 1);
	}

	function _Bessel_k0(x: number): number
	{
		const b0_a = [-0.57721566, 0.42278420, 0.23069756, 0.3488590e-1, 0.262698e-2, 0.10750e-3, 0.74e-5].reverse();
		const b0_b = [1.25331414, -0.7832358e-1, 0.2189568e-1, -0.1062446e-1, 0.587872e-2, -0.251540e-2, 0.53208e-3].reverse();

		if(x <= 2) 
			return -Math.log(x/2) * cyl_bessel_i(0, x) + _Bessel_horner(b0_a, x*x/4);
		else
    		return Math.exp(-x) / Math.sqrt(x) * _Bessel_horner(b0_b, 2/x);
	}

	function _Bessel_k1(x: number): number
	{
		var b1_a = [1.0, 0.15443144, -0.67278579, -0.18156897, -0.1919402e-1, -0.110404e-2, -0.4686e-4].reverse();
		var b1_b = [1.25331414, 0.23498619, -0.3655620e-1, 0.1504268e-1, -0.780353e-2, 0.325614e-2, -0.68245e-3].reverse();
		  
		if(x <= 2) 
			return Math.log(x/2) * cyl_bessel_i(1, x) + (1/x) * _Bessel_horner(b1_a, x*x/4);
		else
    		return Math.exp(-x)/Math.sqrt(x)*_Bessel_horner(b1_b, 2/x);
	}

	/* ---------------------------------------------------------
		CYL_BESSEL_Y
	--------------------------------------------------------- */
	export function sph_bessel(n: number, x: number): number
	{
		return _Bessel_wrap(_Bessel_y0, _Bessel_y1, n, x, 1, -1);
	}

	function _Bessel_y0(x: number): number
	{
		const W = 0.636619772;
		const b0_a1a = [-2957821389.0, 7062834065.0, -512359803.6, 10879881.29, -86327.92757, 228.4622733].reverse();
		const b0_a2a = [40076544269.0, 745249964.8, 7189466.438, 47447.26470, 226.1030244, 1.0].reverse();
		const b0_a1b = [1.0, -0.1098628627e-2, 0.2734510407e-4, -0.2073370639e-5, 0.2093887211e-6].reverse();
		const b0_a2b = [-0.1562499995e-1, 0.1430488765e-3, -0.6911147651e-5, 0.7621095161e-6, -0.934945152e-7].reverse();

		let ret: number; 
		let y: number = x * x;
		let xx: number = x - 0.785398164;

		if(x < 8) 
		{
			let a1: number = _Bessel_horner(b0_a1a, y);
			let a2: number = _Bessel_horner(b0_a2a, y);

			ret = a1/a2 + W * _Bessel_j0(x) * Math.log(x);
		} 
		else 
		{
			y = 64 / y;
			let a1: number = _Bessel_horner(b0_a1b, y);
			let a2: number = _Bessel_horner(b0_a2b, y);

			ret = Math.sqrt(W/x)*(Math.sin(xx)*a1+Math.cos(xx)*a2*8/x);
		}
		return ret;
	}

	function _Bessel_y1(x: number): number
	{
		const W = 0.636619772;
		const b1_a1a = [-0.4900604943e13, 0.1275274390e13, -0.5153438139e11, 0.7349264551e9, -0.4237922726e7, 0.8511937935e4].reverse();
		const b1_a2a = [0.2499580570e14, 0.4244419664e12, 0.3733650367e10, 0.2245904002e8, 0.1020426050e6, 0.3549632885e3, 1].reverse();
		const b1_a1b = [1.0, 0.183105e-2, -0.3516396496e-4, 0.2457520174e-5, -0.240337019e-6].reverse();
		const b1_a2b = [0.04687499995, -0.2002690873e-3, 0.8449199096e-5, -0.88228987e-6, 0.105787412e-6].reverse();

		let ret: number;
		let y: number = x*x;
		let xx: number = x - 2.356194491;

		if(x < 8) 
		{
			let a1 = x*_Bessel_horner(b1_a1a, y);
			let a2 = _Bessel_horner(b1_a2a, y);

			ret = a1/a2 + W * (_Bessel_j1(x) * Math.log(x) - 1 / x);
		} 
		else 
		{
			y = 64 / y;
			let a1 =_Bessel_horner(b1_a1b, y);
			let a2 =_Bessel_horner(b1_a2b, y);
			ret=Math.sqrt(W/x)*(Math.sin(xx)*a1+Math.cos(xx)*a2*8/x);
		}
		return ret;
	}

	/* ---------------------------------------------------------
		UTILLITIES
	--------------------------------------------------------- */
	function _Bessel_horner(elements: number[], v: number) 
	{
		let z: number = 0;
		for (let elem of elements)
			z = v * z + elem;
			
		return z; 
	}

	function _Bessel_iter(n: number, x: number, f0: number, f1: number, sign: number): number 
	{
		if(n == 0) return f0;
		if(n == 1) return f1;

		let tdx: number = 2 / x;
		let f2: number = f1;

		for(let o: number = 1; o < n; ++o) 
		{
			f2 = f1 * o * tdx + sign * f0;
			f0 = f1; 
			f1 = f2;
		}
		return f2;
	}

	function _Bessel_wrap
		(
			bessel0: (x: number) => number,
			bessel1: (x: number) => number,
			n: number,
			x: number,
			nonzero: number,
			sign: number
		): number
	{
		if(nonzero) 
			if(x == 0)
				return (nonzero == 1 ? -Infinity : Infinity);
			else if(x < 0) 
				return NaN;
		
		if(n == 0)
			return bessel0(x);
		else if(n == 1)
			return bessel1(x);
		else if(n < 0)
			return NaN;
		
		let b0: number = bessel0(x);
		let b1: number = bessel1(x);
		n |= 0;

		return _Bessel_iter(n, x, b0, b1, sign);
	}
}
