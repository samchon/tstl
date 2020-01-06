export namespace TimeWatch
{
    export function measure(proc: ()=>void): number
    {
        let time: number = Date.now();
        proc();
        return Date.now() - time;
    }
}