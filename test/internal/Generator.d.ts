import { Vector } from "../../container/Vector";
import { Deque } from "../../container/Deque";
import { IForwardContainer } from "../../ranges/container/IForwardContainer";
import { IPush } from "../../internal/container/partial/IPush";
export declare namespace Generator {
    function arrange<Container extends Vector<number> | Deque<number>>(container: Container, count: number): Container;
    function arrange<Container extends Vector<any> | Deque<any>>(container: Container, count: number, gen: () => IForwardContainer.ValueType<Container>): Container;
    function fill<Container extends IPush<number>>(container: Container, count: number): Container;
    function fill<Container extends IPush<any>>(container: Container, count: number, gen: () => Container extends IPush<infer T> ? T : unknown): Container;
}
//# sourceMappingURL=Generator.d.ts.map