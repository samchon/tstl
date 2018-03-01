# TSTL Issue Template
When publishing an issue, erase this content and fill your story.

You also can learn more with the [CONTRIBUTING.md](https://github.com/samchon/tstl/blob/master/CONTRIBUTING.md)

## Question
I always welcome any questions about the **TSTL**. However, half of questions can be solved by traveling [Guide Documents](https://github.com/samhon/tstl/wiki), [FAQ](https://github.com/samhon/tstl/wiki/FAQ) section, or old [Issues](https://github.com/samchon/tstl/search?type=Issues). Please visit them before. If you have a question have not treated and you're urgently, then you also can utilize the [Gitter Channel](https://gitter.im/samchon/tstl).



## Bug Report
Note that, the bug you're reporting may have registered in the [Issues](https://github.com/samchon/tstl/search?type=Issues) by another user. Even the bug you're reporting may be fixed in the `@next` version. In those reasons, I recommend you to check the old [Issues](https://github.com/samchon/tstl/search?type=Issues) and reproduct your code with the `@next` version before publishing the bug reporting issue. Also, 

```bash
`npm install --save tstl@next`
```

When same error occurs with the `@next` version, then please fill the below template:

**Summary**:
  - **TSTL Version**: 1.7.0@dev-20180302
  - **Expected behavior**: 
  - **Actual behavior**

**Code occuring the bug**: 
```typescript
import std = require("tstl");

/* Demonstration code occuring the bug you're reporting */
```



## Suggestion
Thanks for your suggestion. Feel free to just state your idea. Writing the issue, it would better to filling the below items:

  - A description of the problem you're trying to solve.
  - An overview of the suggested solution.
  - Examples of how the suggestion whould work in various places.
    - Code examples showing the expected behavior.
  - If relevant, precedent in C++/STL can be useful for establishing context and expected behavior.