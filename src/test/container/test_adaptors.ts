import * as std from "../../index";

export function test_priority_queue(): void
{
    let pq = new std.PriorityQueue<number>(std.greater);
    for (let i: number = 0; i < 1000; ++i)
        pq.push(Math.random() * 100);

    let items: std.Vector<number> = new std.Vector();
    while (pq.empty() === false)
    {
        items.push_back(pq.top());
        pq.pop();
    }

    if (std.is_sorted(std.begin(items), std.end(items), std.less) === false)
        throw new Error("Bug on PriorityQueue: stored elements are not sorted");
}

export function test_adaptors(): void
{
    // CONSTRUCT ADAPTOR CONATINERS
    let queue = _Construct_adaptor(new std.Queue<number>());
    let stack = _Construct_adaptor(new std.Stack<number>());

    // VALIDATE QUEUE
    let queue_items: number[] = [];
    while (queue.empty() === false)
    {
        queue_items.push(queue.front());
        queue.pop();
    }
    _Validate_adaptor_items(queue_items, [0, 1, 2, 3, 4]);

    // VALIDATE STACK
    let stack_items: number[] = [];
    while (stack.empty() === false)
    {
        stack_items.push(stack.top());
        stack.pop();
    }
    _Validate_adaptor_items(stack_items, queue_items.reverse());
}

function _Construct_adaptor<T extends IAdaptor>
    (adaptor: T): T
{
    for (let i: number = 0; i < 5; ++i)
        adaptor.push(i);

    return adaptor;
}

function _Validate_adaptor_items(items: number[], answer: number[]): void
{
    if (items.length !== answer.length)
        throw new std.DomainError("Number of elements are wrong.");

    for (let i: number = 0; i < items.length; ++i)
        if (items[i] !== answer[i])
            throw new std.DomainError("Wrong element is inserted in.");
}

interface IAdaptor
{
    push(val: number): void;
}