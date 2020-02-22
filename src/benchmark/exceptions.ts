import { Vector, List, ForwardList } from "../container/index";
import { FlatMap } from "../experimental/container/FlatMap";
import { SharedMutex } from "../thread/SharedMutex";
import { Semaphore } from "../thread/Semaphore";

import { advance } from "../iterator/global";
import { 
    cyl_bessel_j, cyl_neumann, 
    cyl_bessel_i, cyl_bessel_k, 
    ellint_3, 
    hermite, 
    assoc_laguerre, assoc_legendre 
} from "../numeric/special_math/index";

async function except(proc: Procedure): Promise<string>
{
    try 
    { 
        await proc(); 
    } 
    catch (exp) 
    {  
        if (exp instanceof Error)
            return ` ${exp.name} | ${exp.message} `;
    }
    return " NULL | NULL ";
}

export async function main(): Promise<string>
{
    let ret: string = "# Exceptions\n" +
        " name | message \n" +
        "------|---------\n";

    let v: Vector<number> = new Vector();
    let fl: ForwardList<number> = new ForwardList();
    let l: List<number> = new List();
    let m: FlatMap<number, number> = new FlatMap();
    let mtx: SharedMutex = new SharedMutex();
    let sph: Semaphore<4> = new Semaphore(4);

    let exceptions: string[] = [
        // VECTOR
        await except(() => { v.end().value; }),
        await except(() => { v.at(1); }),
        await except(() => { v.set(-1, 4); }),
        await except(() => { v.set(1, 4); }),
        await except(() => { v.insert(new Vector<number>().begin(), 4); }),
        await except(() => { v.insert(v.nth(-1), 4); }),
        await except(() => { v.erase(new Vector<number>().begin()); }),
        await except(() => { v.erase(v.nth(-1)); }),
        await except(() => { v.erase(v.nth(4), v.nth(2)); }),

        // LIST
        await except(() => { l.insert(new List<number>().begin(), 4 ); }),
        await except(() => { l.erase(new List<number>().begin()); }),
        await except(() => { l.end().value; }),
        await except(() => { l.end().value = 3 }),
        await except(() => { fl.end().value; }),
        await except(() => { fl.end().value = 3 }),
        await except(() => { fl.before_begin().value; }),
        await except(() => { fl.before_begin().value = 3 }),

        // ASSOCIATIVE
        await except(() => { m.get(3); }),
        await except(() => { m.extract(3); }),
        await except(() => { m.end().value.second = 5; }),
        await except(() => { m.find(3).second = 5; }),

        // GLOBAL
        await except(() => { advance(fl.begin(), -4); }),
        await except(() => { cyl_bessel_j(2.3, -5); }),
        await except(() => { cyl_bessel_j(2.3, 0); }),
        await except(() => { cyl_neumann(2.3, -4); }),
        await except(() => { cyl_bessel_i(-2.1, -0.5); }),
        await except(() => { cyl_bessel_i(2.3, 0); }),
        await except(() => { cyl_bessel_k(1, -0.3); }),
        await except(() => 
        {
            let phi: number = 1.5;
            let v: number = 1 / Math.pow(Math.sin(phi), 2) + 1;
            ellint_3(0.5, v, phi);
        }),
        await except(() => { hermite(-5, 2); }),
        await except(() => { assoc_laguerre(-1, -1, 1); }),
        await except(() => { assoc_legendre(-1, -1, 0.5); }),
        await except(() => { assoc_legendre(0.5, 0.5, 2.5); }),

        // MUTEX
        await except(() => mtx.unlock()),
        await except(() => mtx.unlock_shared()),
        await except(() => sph.release(0)),
        await except(() => sph.release(5)),
        await except(() => sph.release(2)),
    ];
    ret += exceptions.join("\n") + "\n";
    
    return ret;
}
type Procedure = () => void | Promise<void>;