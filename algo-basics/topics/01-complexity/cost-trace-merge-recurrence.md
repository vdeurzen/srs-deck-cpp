---
id: complexity-cost-trace-merge-recurrence
kind: trace
version: 1
level: 2
tags: [foundations, complexity, recurrences, tracing]
requires:
  - complexity-cost-trace-shrink-recurrence
probes:
  1: { work: "64" }
  2: { work: "384" }
refs:
  - https://en.wikipedia.org/wiki/Recursion_tree
  - https://en.wikipedia.org/wiki/Merge_sort#Analysis
---

`split` does `n` units of work, then calls itself on both halves: the
shape of merge sort. Each probe reads `work` after the statement on its
line.

```cpp
long work = 0;
void split(int n) {
  if (n <= 1) return;
  work += n;
  split(n / 2); split(n / 2);
}

int main() {
  split(16);            // @1
  work = 0; split(64);  // @2
}
```

---

Draw the calls as a tree. The root does 16; its two children do 8 each,
16 again; the four grandchildren 4 each, 16 again. **Every level does n
work**, and halving 16 to 1 takes 4 levels: 4 · 16 = 64. For 64, six
levels of 64 is 384. That is T(n) = 2T(n/2) + n = n·log₂ n: levels ×
work per level.

Verified by compiling and running an instrumented copy under GCC 16.2
(`g++ -std=c++23 -Wall -Wextra`).
