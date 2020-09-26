# Contribution Guide
## Publishing a Issue
Thanks for your advise. Before publishing a issue, please check some components.

### 1. Search for duplicates
Before publishing a issue, please check whether the duplicated issue exists or not.
  - [Ordinary Issues](https://github.com/samchon/tstl/issues)

### 2. Did you find a bug?
When you reporting a bug, then please write about those items:

  - What version of TSTL you're using
  - If possible, give me an isolated way to reproduce the behavior.
  - The behavior your expect to see, and the actual behavior.

### 3. Do you have a suggestion?
I always welcome your suggestion. When you publishing a suggestion, then please write such items: 

  - A description of the problem you're trying to solve.
  - An overview of the suggested solution.
  - Examples of how the suggestion whould work in various places.
    - Code examples showing the expected behavior.
  - If relevant, precedent in C++/STL can be useful for establishing context and expected behavior.



## Contributing Code
### Test your code
Before sending a pull request, please test your new code. You type the command `npm run build`, then compiling your code and test-automation will be all processed.

```bash
# COMPILE & TEST AT ONCE
npm run build

####
# SPECIAL COMMANDS
####
tsc # COMPILE ONLY
npm run test # TEST ONLY

npm run clean # CLEAN COMPILED RESULTS UP
```

If you succeeded to compile, but failed to pass the test-automation, then *debug* the test-automation module. I've configured the `.vscode/launch.json`. You just run the `VSCode` and click the `Start Debugging` button or press `F5` key. By the *debugging*, find the reason why the *test* is failed and fix it.

### Adding a Test
If you want to add a testing-logic, then goto the `src/test` directory. It's the directory containing the test-automation module. Declare some functions starting from the prefix `test_`. Then, they will be called after the next testing.

Note that, the special functions starting from the prefix `test_` must be `export`ed. They also must return one of them:
  - `void`
  - `Promise<void>`

When you detect an error, then throw exception such below:

```typescript
export function test_my_specific_logic1(): void
{
    const vec = new std.Vector<number>();
    for (let i: number = 0; i < 100; ++i)
        vec.push_back(Math.random());

    std.sort(vec.begin(), vec.end());

    if (std.is_sorted(vec.begin(), vec.end()) === false)
        throw new std.DomainError("std.sort doesn't work.");
}

export async function test_my_specific_logic2(): Promise<void>
{
    const t1: Date = new Date();
    await std.sleep_for(1000);

    const t2: Date = new Date();
    if (t2.getTime() - t1.getTime() < 1000)
        throw new std.DomainError("std.sleep_for doesn't work.");
}
```



## Sending a Pull Request
Thanks for your contributing. Before sending a pull request to me, please check those components.

### 1. Include enough descriptions
When you send a pull request, please include a description, of what your change intends to do, on the content. Title, make it clear and simple such below:
  - Refactor features
  - Fix issue #17
  - Add tests for issue #28

### 2. Include adequate tests
As I've mentioned in the `Contributing Code` section, your PR should pass the test-automation module. Your PR includes *new features* that have not being handled in the ordinary test-automation module, then also update *add the testing unit* please.

If there're some specific reasons that could not pass the test-automation (not error but *intended*), then please update the ordinary test-automation module or write the reasons on your PR content and *const me update the test-automation module*.

### 3. Follow coding conventions
The basic coding convention of STL is the [`snake_case`](https://en.wikipedia.org/wiki/Snake_case). TypeScript-STL follows the basic coding convention; `snake_case`. However, there's a difference when naming the classes. TSTL uses `snake_case` and [`PascalCase`](https://en.wikipedia.org/wiki/PascalCase) on the classes at the same time. 

```typescript
export class Vector<T> // class base: PascalCase
{
    // methods: snake_cases
    public push_back(val: T): void;
    public pop_back(): void;
}
export import vector = Vector; // class alias := snake_case

// global functions: snake_case
export function less_equal_to<T>(x: T, y: T): boolean;
export function sleep_until(at: Date): Promise<void>;
```

Thus, when you creating a new class, the make it to follow the [PascalCase] and make an alias following the `snake_case`. Methods in the classes or global functions, they just use the basic coding convention; `snake_case`.

  - The detailed coding convention will be provided soon.



## References
I've referenced contribution guidance of the TypeScript.
  - https://github.com/Microsoft/TypeScript/blob/master/CONTRIBUTING.md