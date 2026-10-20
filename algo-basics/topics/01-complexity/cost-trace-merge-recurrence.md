---
id: complexity-cost-trace-merge-recurrence
kind: basic
version: 2
level: 2
tags: [foundations, complexity, recurrences]
requires:
  - complexity-cost-trace-shrink-recurrence
  - interview-essentials/complexity-recursion-tree-calls
elaborate: Which well-known sort has exactly this shape, and what is the n units of work in each of its calls?
refs:
  - https://en.wikipedia.org/wiki/Recursion_tree
  - https://en.wikipedia.org/wiki/Merge_sort#Analysis
---

```cpp
long work = 0;
void split(int n) {
  if (n <= 1) return;
  work += n;
  split(n / 2); split(n / 2);
}
```

## How much `work` does `split(16)` add up?

---

**64: four levels of calls, each level adding 16 in total.**

As a tree: the root adds 16, two children 8 each, four calls 4 each,
eight calls 2 each. Every level adds n, and halving 16 down to 1
takes log₂ 16 = 4 levels: n · log₂ n.
