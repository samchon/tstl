#include <iostream>
#include <algorithm>
#include <boost/math/special_functions.hpp>

#include "utils.hpp"

using namespace std;
using namespace boost::math;

void bessels()
{
	double v = rand_between<double>(-100, 100);
	double x = rand_between<double>(-100, 100);
	unsigned int n = rand_int(0, 100);

	double i = cyl_bessel_i((x < 0) ? floor(v) : v, x);
	double j = cyl_bessel_j((x < 0) ? floor(v) : v, x);
	double k = cyl_bessel_k(v, abs(x)); // x > 0
	double neumann = cyl_neumann(v, abs(x)); // x > 0

	double sph = sph_bessel(n, abs(x)); // unsigned int, x > 0
	double sph_nm = sph_neumann(n, abs(x)); // unsigned int, x > 0

	print("cyl_bessel_i", (x < 0) ? floor(v) : v, x, i);
	print("cyl_bessel_j", (x < 0) ? floor(v) : v, x, j);
	print("cyl_bessel_k", v, abs(x), k);
	print("cyl_neumann", v, abs(x), neumann);

	print("sph_bessel", n, abs(x), sph);
	print("sph_neumann", n, abs(x), sph_nm);
}

void betas()
{
	double x = rand_between<double>(0, 100);
	double y = rand_between<double>(0, 100);

	print("beta", x, y, beta(x, y));
}

void ellints()
{
	double k = rand_between<double>(-1, 1);
	double phi = rand_between<double>(-100, 100);
	double v = rand_between<double>(-100, 1 / (pow(sin(phi), 2.0)));

	double first = ellint_1(k, phi);
	double second = ellint_2(k, phi);
	double third = ellint_3(k, v, phi);

	print("ellint_1", k, phi, first);
	print("ellint_2", k, phi, second);
	print("ellint_3", k, v, phi, third);
}

void expints()
{
	double x = rand_between<double>(-100, 100);

	print("expint", x, expint(x));
}

void hermites()
{
	unsigned int n = rand_int(0, 100);
	double x = rand_between<double>(-100, 100);

	print("hermite", n, x, hermite(n, x));
}

void laguerres()
{
	unsigned int n = rand_int(0, 100);
	unsigned int m = rand_int(0, 100);
	double x = rand_between<double>(-100, 100);

	double ret = laguerre(n, m, x);
	print("assoc_laguerre", n, m, x, ret);
}

void legendres()
{
	unsigned int n = rand_int(0, 100);
	unsigned int m = rand_int(0, 100);
	double x = rand_between<double>(-1, 1);

	double ret = legendre_p(n, m, x);
	print("assoc_legendre", n, m, x, ret);
}

void zetas()
{
	double x = rand_between<double>(-100, 100);

	print("riemann_zeta", x, zeta(x));
}

void main()
{
	cout << "[" << endl;
	{
		repeat(bessels);
		repeat(betas);
		repeat(ellints);
		repeat(expints);
		repeat(hermites);
		repeat(laguerres);
		repeat(legendres);
		repeat(zetas);
		cout << "\t[\"clamp\", 1, 6, 5, 5]" << endl;
	};
	cout << "]" << endl;

	system("pause");
}