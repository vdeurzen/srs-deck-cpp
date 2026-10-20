---
id: complexity-cost-trace-shrink-recurrence
kind: basic
version: 2
level: 2
tags: [foundations, complexity, recurrences]
requires:
  - complexity-cost-trace-doubling
elaborate: Say in one sentence why a recursion that halves its input can never be more than about log₂ n calls deep.
refs:
  - https://en.wikipedia.org/wiki/Recurrence_relation
---

```cpp
int calls = 0;
void by_one(int n)  { ++calls; if (n > 0) by_one(n - 1); }
void by_half(int n) { ++calls; if (n > 1) by_half(n / 2); }
```

## `by_one(1000)` makes 1 001 calls in all. How many does `by_half(1000)` make?

---

**10: on inputs 1000, 500, 250, 125, 62, 31, 15, 7, 3, 1.**

Each call does constant work and passes on half its input, so calls grow
like log n, where `by_one`'s grow like n. A halving recursion is the
halving loop in other clothes: how fast the input shrinks sets the cost.
