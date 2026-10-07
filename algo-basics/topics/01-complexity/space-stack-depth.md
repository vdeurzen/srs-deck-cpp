---
id: complexity-space-stack-depth
kind: trace
version: 1
level: 2
tags: [complexity, space, recursion, tracing]
requires:
  - complexity-recursion-tree-calls
probes:
  1: { deepest: "17" }
  2: { deepest: "5" }
refs:
  - https://en.wikipedia.org/wiki/Space_complexity
  - https://en.wikipedia.org/wiki/Call_stack
---

Both functions sum 16 numbers. `deepest` records the most calls alive on
the stack at once. Each probe reads it after its line.

```cpp
int a[16], depth = 0, deepest = 0;
int sum(int n) {                        // peel one element
  deepest = std::max(deepest, ++depth);
  int r = n == 0 ? 0 : a[n - 1] + sum(n - 1);
  --depth; return r;
}
int halves(int lo, int hi) {            // split in two
  deepest = std::max(deepest, ++depth);
  int m = (lo + hi) / 2;
  int r = hi - lo == 1 ? a[lo] : halves(lo, m) + halves(m, hi);
  --depth; return r;
}
int main() {
  sum(16);                     // @1
  deepest = 0; halves(0, 16);  // @2
}
```

---

Same O(n) time, different **space**. Space complexity counts memory
beyond the input, and every live call holds a stack frame. Peeling keeps
n + 1 frames alive, O(n). Splitting finishes the left half before the
right one starts, so only one root-to-leaf path is alive: log₂ 16 + 1 = 5,
O(log n).

Verified by compiling and running an instrumented copy under GCC 16.2 (`g++ -std=c++23 -Wall -Wextra`).
