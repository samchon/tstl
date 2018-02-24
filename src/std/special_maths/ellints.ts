/// <reference path="../API.ts" />

namespace std
{
	export function ellint_1(k: number, phi: number): number
	{
		return legendre_f(phi, k);
	}

	export function ellint_2(k: number, phi: number): number
	{
		return legendre_e(phi, k);
	}

	export function ellint_3(k: number, v: number, phi: number): number
	{
		return legendre_pi(phi, v, k);
	}

	function carlson_rf(x: number, y: number, z: number): number
	{
		const ERRTOL = 0.0025, 
			TINY = 1.5e-38, BIG = 3.0e37,
			C1 = 1.0/24.0, C2 = 0.1, C3 = 3.0/44.0, C4 = 1.0/14.0;

		let alamb: number, ave: number;
		let delx: number, dely: number, delz: number;
		let e2: number, e3: number;
		let sqrtx: number, sqrty: number, sqrtz: number;
		let xt: number, yt: number, zt: number;

		if (Math.min(x, y, z) < 0.0 || Math.min(x + y, y + z, z + x) < TINY || Math.max(x, y, z) > BIG)
			throw new std.InvalidArgument( "Invalid arguments in rf." );

		xt = x;
		yt = y;
		zt = z;

		do 
		{
			sqrtx = Math.sqrt(xt);
			sqrty = Math.sqrt(yt);
			sqrtz = Math.sqrt(zt);
			alamb = sqrtx*sqrty + sqrty*sqrtz + sqrtz*sqrtx;
			xt = 0.25*(xt + alamb);
			yt = 0.25*(yt + alamb);
			zt = 0.25*(zt + alamb);
			ave = (xt + yt + zt)/3.0;
			delx = (ave - xt)/ave;
			dely = (ave - yt)/ave;
			delz = (ave - zt)/ave;
		} 
		while ( Math.max( Math.abs(delx), Math.abs(dely), Math.abs(delz) ) > ERRTOL );

		e2 = delx*dely - delz*delz;
		e3 = delx*dely*delz;
		
		return (1.0 + (C1*e2 - C2 - C3*e3)*e2 + C4*e3)/Math.sqrt(ave);
	}


	function carlson_rd(x: number, y: number,z: number): number
	{
		const ERRTOL = 0.0015, 
			TINY = 1.0e-25, BIG = 4.5e21,
			C1 = 3.0/14.0, C2 = 1.0/6.0, C3 = 9.0/22.0, C4 = 3.0/26.0, C5 = 0.25*C3, C6 = 1.5*C4;

		let alamb: number, ave: number;
		let delx: number, dely: number, delz: number;
		let ea: number, eb: number, ec: number, ed: number, ee: number, fac: number;
		let sqrtx: number, sqrty: number, sqrtz: number;
		let sum: number, xt: number, yt: number, zt: number;

		if ( Math.min( x, y ) < 0.0 || Math.min( x+y, z ) < TINY || Math.max( x, y, z ) > BIG )
			throw new std.InvalidArgument( "Invalid arguments in rd." );

		xt = x;
		yt = y; 
		zt = z;
		sum = 0.0;
		fac = 1.0;

		do 
		{
			sqrtx = Math.sqrt(xt);
			sqrty = Math.sqrt(yt);
			sqrtz = Math.sqrt(zt);
			alamb = sqrtx*sqrty + sqrty*sqrtz + sqrtz*sqrtx;
			sum += fac/(sqrtz*(zt + alamb));
			fac *= 0.25;
			xt = 0.25*(xt + alamb);
			yt = 0.25*(yt + alamb);
			zt = 0.25*(zt + alamb);
			ave = 0.2*(xt + yt + 3.0*zt);
			delx = (ave - xt)/ave;
			dely = (ave - yt)/ave;
			delz = (ave - zt)/ave;
		} 
		while ( Math.max( Math.abs(delx), Math.abs(dely), Math.abs(delz) ) > ERRTOL );
		
		ea = delx*dely;
		eb = delz*delz;
		ec = ea - eb;
		ed = ea - 6.0*eb;
		ee = ed + 2.0*ec;
		
		return 3.0*sum + fac*(1.0 + ed*(-C1 + C5*ed - C6*delz*ee) + delz*(C2*ee + delz*(-C3*ec + delz*C4*ea)))/(ave*Math.sqrt(ave));
	}


	function carlson_rj(x: number, y: number, z: number, p: number): number 
	{
		
		const ERRTOL = 0.0015, 
			TINY = 2.5e-13, BIG = 9.0e11, 
			C1 = 3.0/11.0, C2 = 1.0/3.0, C3 = 3.0/22.0, C4 = 3.0/26.0, C5 = 0.75*C3, C6 = 1.5*C4, C7 = 0.5*C2, C8 = 2.0*C3;

		let a: number, alamb: number, alpha: number, ans: number, ave: number;
		let b: number, beta: number, delp: number, delx: number, dely: number, delz: number;
		let ea: number, eb: number, ec: number, ed: number, ee: number, fac: number;
		let pt: number, rcx: number, rho: number;
		let sqrtx: number, sqrty: number, sqrtz: number, sum: number;
		let tau: number, xt: number, yt: number, zt: number;

		if ( Math.min(x, y, z) < 0.0 || Math.min(Math.min(x+y, y+z, z+x), Math.abs(p)) < TINY || Math.max(Math.max( x, y, z ), Math.abs(p)) > BIG )
			throw new InvalidArgument("Invalid arguments in carlson_rj.");

		sum = 0.0;
		fac = 1.0;
		if ( p > 0.0 ) {
			xt = x;
			yt = y;
			zt = z;
		pt = p;
		} else {
			xt = Math.min( x, y, z );
			zt = Math.max( x, y, z );
			yt = x + y + z - xt - zt;
			a = 1.0/(yt - p);
			b = a*(zt - yt)*(yt - xt);
			pt = yt + b;
			rho = xt*zt/yt;
			tau = p*pt/yt;
			rcx = carlson_rc( rho, tau );
		}
		do {
			sqrtx = Math.sqrt(xt);
			sqrty = Math.sqrt(yt);
			sqrtz = Math.sqrt(zt);
			alamb = sqrtx*sqrty + sqrty*sqrtz + sqrtz*sqrtx;
			alpha = Math.pow( pt*(sqrtx + sqrty + sqrtz) + sqrtx*sqrty*sqrtz, 2.0 );
			beta = pt*Math.pow( pt + alamb, 2.0 );
			sum += fac*carlson_rc( alpha, beta );
			fac *= 0.25;
			xt = 0.25*(xt + alamb);
			yt = 0.25*(yt + alamb);
			zt = 0.25*(zt + alamb);
			pt = 0.25*(pt + alamb);
			ave = 0.2*(xt + yt + zt + pt + pt);
			delx = (ave - xt)/ave;
			dely = (ave - yt)/ave;
			delz = (ave - zt)/ave;
			delp = (ave - pt)/ave;
		} while ( Math.max( Math.max( Math.abs(delx), Math.abs(dely), Math.abs(delz) ), Math.abs(delp) ) > ERRTOL );
		ea = delx*dely + dely*delz + delz*delx;
		eb = delx*dely*delz;
		ec = delp*delp;
		ed = ea - 3.0*ec;
		ee = eb + 2.0*delp*(ea - ec);
		ans = 3.0*sum + fac*(1.0 + ed*(-C1 + C5*ed - C6*ee) + eb*(C7 + delp*(-C8 + delp*C4)) + delp*ea*(C2 - delp*C3) - C2*delp*ec)/(ave*Math.sqrt(ave));
		if ( p < 0.0 ) ans = a*(b*ans + 3.0*(rcx - carlson_rf( xt, yt, zt )));
		return ans;
	}


	function carlson_rc(x: number, y: number) 
	{
		const ERRTOL = 0.0012, 
			TINY = 1.69e-38, SQRTNY = 1.3e-19, BIG = 3.0e37, TNBG = TINY*BIG,
			COMP1 = 2.236/SQRTNY, COMP2 = TNBG*TNBG/25.0, C1 = 0.3, C2 = 1.0/7.0, C3 = 0.375, C4 = 9.0/22.0;

		let alamb: number, ave: number;
		let s: number, w: number;
		let xt: number, yt: number;

		if ( x < 0.0 || y == 0.0 || (x + Math.abs(y)) < TINY || (x + Math.abs(y)) > BIG || (y < -COMP1 && x > 0.0 && x < COMP2) )
			throw new InvalidArgument( "Invalid arguments in carlson_rc" );

		if ( y > 0.0 ) {
			xt = x;
			yt = y;
			w = 1.0;
		} else {
			xt = x - y;
			yt = -y;
			w = Math.sqrt(x)/Math.sqrt(xt);
		}
		do {
			alamb = 2.0*Math.sqrt(xt)*Math.sqrt(yt) + yt;
			xt = 0.25*(xt + alamb);
			yt = 0.25*(yt + alamb);
			ave = (xt + yt + yt)/3.0;
			s = (yt - ave)/ave;
		} while ( Math.abs(s) > ERRTOL );
		return w*(1.0 + s*s*(C1 + s*(C2 + s*(C3 + s*C4))))/Math.sqrt(ave);
	}


	/*
	*    Legendre elliptic function of the second kind, E(phi, k) evaluated using
	*    Carlson's elliptic functions Rf and Rd.  The argument ranges are  0 <= phi <= pi/2
	*    and  0 <= ksin(phi) <= 1.
	*/
	function legendre_e(phi: number, k: number): number 
	{
		let s: number;
		let c: number, cc: number;
		let q: number, ks: number;

		if (phi < 0.0 || phi > Math.PI/2.0) 
			throw new InvalidArgument( "Argument  phi  out of range in legendre_f." );

		s = Math.sin(phi);
		ks = k*s;

		if (ks < 0.0 || ks > 1.0) 
			throw new OutOfRange("Argument k * sin(phi) out of range in legendre_f.");
		
		c = Math.cos(phi);
		cc = c*c;
		q = (1.0 - ks)*(1.0 + ks);

		return s*(carlson_rf( cc, q, 1.0 ) - Math.pow(ks, 2.0))*carlson_rd( cc, q, 1.0 );
	}


	/*
	*    Legendre elliptic function of the first kind, F(phi, k) evaluated using
	*    Carlson's elliptic functions Rf.  The argument ranges are  0 <= phi <= pi/2
	*    and  0 <= ksin(phi) <= 1.
	*/
	function legendre_f(phi: number, k: number): number 
	{

		let s: number;
		let c: number, cc: number;
		let q: number, ks: number;

		if ( phi < 0.0 || phi > Math.PI/2.0 ) 
			throw new OutOfRange( "Argument  phi  out of range in legendre_f." );

		s = Math.sin(phi);
		ks = k*s;
		if ( ks < 0.0 || ks > 1.0 ) 
			throw new OutOfRange( "Argument  k sin(phi)  out of range in legendre_f." );
		c = Math.cos(phi);
		cc = c*c;
		q = (1.0 - ks)*(1.0 + ks);

		return s*carlson_rf( cc, q, 1.0 );
	}


	/*
	*    Legendre elliptic function of the third kind, Pi(phi,n,k) evaluated using
	*    Carlson's elliptic functions Rj and Rf.  The sign convention on n is opposite 
	*    Abramowtz and Stegun.  The ranges are  0 <= phi <= pi/2  and  0 <= ksin(phi) <= 1.
	*/
	function legendre_pi(phi: number, n: number, k: number): number 
	{
		let s: number;
		let c: number, cc: number;
		let nss: number, q: number, ks: number;

		if ( phi < 0.0 || phi > Math.PI / 2.0 )
			throw new OutOfRange( "Argument  phi  out of range in legendre_f." );

		s = Math.sin(phi);
		ks = k*s;
		if ( ks < 0.0 || ks > 1.0 ) 
			throw new OutOfRange( "Argument  k sin(phi)  out of range in legendre_f." );
		nss = n*s*s;
		c = Math.cos(phi);
		cc = c*c;
		q = (1.0 - ks)*(1.0 + ks);
		return s*(carlson_rf( cc, q, 1.0 ) - nss*carlson_rj( cc, q, 1.0, 1.0 + nss )/3.0);
	}
}