#pragma once
#include <random>

namespace
{
	auto random() -> double
	{
		static std::random_device device;
		static std::uniform_real_distribution<double> distribution(0.0, 1.0);

		return distribution(device);
	};

	template <typename T>
	auto rand_int(T x, T y)
	{
		return rand_between(x, y + 1);
	};

	template <typename T>
	auto rand_between(T x, T y) -> T
	{
		if (x > y)
			swap(x, y);

		T ret = (T)(random() * (y - x));
		return ret + x;
	};

	template <typename Function>
	void repeat(Function &&func, size_t n = 100)
	{
		while (n-- != 0)
			func();
	};

	template <typename ...Args>
	void print(const char *name, Args&& ...rest)
	{
		cout << "\t[\"" << name << "\", ";
		print(rest...);
	};

	template <typename T, typename ...Args>
	void print(T&& val, Args&& ...rest)
	{
		cout << val << ", ";
		print(rest...);
	};

	template <typename T>
	void print(T&& val)
	{
		cout << val << "]," << endl;
	};
};