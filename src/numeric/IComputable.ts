export interface IComputable<Param, Ret = Param>
{
	plus?(val: Param): Ret;
	minus?(val: Param): Ret;
	negate?(): Ret;

	multiplies?(val: Param): Ret;
	divides?(val: Param): Ret;
	modules?(val: Param): Ret;
}