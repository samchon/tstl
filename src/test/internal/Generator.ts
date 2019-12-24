import { _IPush } from "../../internal/container/IPartialContainers";
import { Vector } from "../../container/Vector";
import { Deque } from "../../container/Deque";
import { randint } from "../../algorithm/random";
import { sort } from "../../algorithm/sorting";

import { IForwardContainer } from "../../internal/container/IForwardContainer";
import { Temporary } from "../../internal/types/Temporary";

export namespace Generator
{
    export function arrange<Container extends Vector<number> | Deque<number>>
        (container: Container, count: number): Container;

    export function arrange<Container extends Vector<any> | Deque<any>>
        (container: Container, count: number, gen: () => IForwardContainer.ValueType<Container>): Container;

    export function arrange<Container extends Vector<any> | Deque<any>>
        (container: Container, count: number, gen?: () => any): Container
    {
        fill(container, count, gen as Temporary);
        sort(container.begin(), container.end());

        return container;
    }

    export function fill<Container extends _IPush<number>>
        (container: Container, count: number): Container;

    export function fill<Container extends _IPush<any>>
        (container: Container, count: number, gen: () => Container extends _IPush<infer T> ? T : unknown): Container;

    export function fill<Container extends _IPush<any>>
        (container: Container, count: number, gen?: () => any): Container
    {
        if (gen === undefined)
            gen = () => randint(1, count * 2);

        while (count-- > 0)
            container.push(gen());
        return container;
    }
}