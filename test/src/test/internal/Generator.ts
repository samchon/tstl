import { Deque, Vector, randint, ranges, sort } from "tstl";

type Push<T> = { push(...items: T[]): number };

export namespace Generator {
  export function arrange<Container extends Vector<number> | Deque<number>>(
    container: Container,
    count: number,
  ): Container;

  export function arrange<Container extends Vector<any> | Deque<any>>(
    container: Container,
    count: number,
    gen: () => ranges.IForwardContainer.ValueType<Container>,
  ): Container;

  export function arrange<Container extends Vector<any> | Deque<any>>(
    container: Container,
    count: number,
    gen?: () => any,
  ): Container {
    fill(container, count, gen as any);
    sort(container.begin(), container.end());

    return container;
  }

  export function fill<Container extends Push<number>>(
    container: Container,
    count: number,
  ): Container;

  export function fill<Container extends Push<any>>(
    container: Container,
    count: number,
    gen: () => Container extends Push<infer T> ? T : unknown,
  ): Container;

  export function fill<Container extends Push<any>>(
    container: Container,
    count: number,
    gen?: () => any,
  ): Container {
    if (gen === undefined) gen = () => randint(1, count * 2);

    while (count-- > 0) container.push(gen());
    return container;
  }
}
