---
id: complexity-recursion-tree-calls
kind: trace
version: 1
level: 2
tags: [complexity, recurrences, tracing]
requires:
  - complexity-log-halvings
probes:
  1: { calls: "5" }
  2: { calls: "31" }
refs:
  - https://en.wikipedia.org/wiki/Recursion_tree
  - https://dl.acm.org/doi/10.1145/1008861.1008865
---

Each probe reads `calls` after the statement on its line.

```cpp
int calls = 0;
void halve(int n) { ++calls; if (n > 1) halve(n / 2); }
void split(int n) { ++calls; if (n > 1) { split(n / 2); split(n / 2); } }

int main() {
  halve(16);             // @1
  calls = 0; split(16);  // @2
}
```

---

`halve` makes one call per level: 16, 8, 4, 2, 1 → log₂ n + 1 = 5.
`split` makes two per call, so level k has 2ᵏ calls: 1 + 2 + … + 16 =
31 = 2n − 1. Same depth, but the number
of children per call decides whether the tree is a path (O(log n)) or
fills out to n leaves (O(n)).

Verified by compiling and running an instrumented copy under GCC 16.2
(`g++ -std=c++23 -Wall -Wextra`).
