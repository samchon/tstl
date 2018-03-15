import { tgamma } from "./gamma";

export function beta(x: number, y: number): number
{
	return tgamma(x) * tgamma(y) / tgamma(x + y);
}