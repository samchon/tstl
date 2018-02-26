// Compiled on https://wandbox.org/
#include "utils.hpp"

#include <iostream>
#include <algorithm>
#include <cmath>

#define PI 3.14159265358979323846264338327950288
#define K 10

using namespace std;

void gammas()
{
	double x = rand_between<double>(-100, 100);
	if (rand_between<double>(0, 1) < .1)
		x = floor(x);

	double t = std::tgamma(x);
	double l = std::lgamma(x);

	print("tgamma", x, t);
	print("lgamma", x, l);
}

void bessels()
{
	double v = rand_between<double>(0, K);
	double x = rand_between<double>(0, K);
	unsigned int n = rand_int(0, K);

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
	double x = rand_between<double>(0, K);
	double y = rand_between<double>(0, K);

	print("beta", x, y, beta(x, y));
}

void ellints()
{
	double k = rand_between<double>(-1, 1);
	double phi = rand_between<double>(0, PI/2.0);
	double v = rand_between<double>(-K, min<double>(1 / (pow(sin(phi), 2.0)), K));

	double first = ellint_1(k, phi);
	double second = ellint_2(k, phi);
	double third = ellint_3(k, v, phi);

	print("ellint_1", k, phi, first);
	print("ellint_2", k, phi, second);
	print("ellint_3", k, v, phi, third);
}

void expints()
{
	double x = rand_between<double>(-K, K);

	print("expint", x, expint(x));
}

void hermites()
{
	unsigned int n = rand_int(0, K);
	double x = rand_between<double>(-K, K);

	print("hermite", n, x, hermite(n, x));
}

void laguerres()
{
	unsigned int n = rand_int(0, K);
	unsigned int m = rand_int(0, K);
	double x = rand_between<double>(0, K);

	double ret = assoc_laguerre(n, m, x);
	print("assoc_laguerre", n, m, x, ret);
}

void legendres()
{
	unsigned int n = rand_int(0, 3);
	unsigned int m = rand_int(0, 3);
	double x = rand_between<double>(0, 1);

	//double ret = assoc_legendre(n, m, x);
	//print("assoc_legendre", n, m, x, ret);
}

void zetas()
{
	double x = rand_between<double>(-K, K);

	print("riemann_zeta", x, riemann_zeta(x));
}

int main()
{
	cout << "[" << endl;
	{
		repeat(gammas);
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

	return 0;
}