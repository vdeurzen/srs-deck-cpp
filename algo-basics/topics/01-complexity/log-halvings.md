---
id: complexity-log-halvings
kind: trace
version: 1
level: 1
tags: [complexity, logarithms, tracing]
requires:
  - complexity-count-loop-steps
probes:
  1: { a: "3" }
  2: { b: "9" }
  3: { c: "19" }
refs:
  - https://en.wikipedia.org/wiki/Binary_logarithm
---

`halvings(n)` counts how often n can be halved (integer division) before
it reaches 1.

```cpp
int halvings(int n) {
  int steps = 0;
  while (n > 1) { n /= 2; ++steps; }
  return steps;
}

int main() {
  int a = halvings(8);          // @1
  int b = halvings(1000);       // @2
  int c = halvings(1'000'000);  // @3
}
```

---

The answer is ⌊log₂ n⌋: 2³ = 8, 2⁹ = 512 ≤ 1000 < 1024, and
2¹⁹ = 524 288 ≤ 10⁶ < 2²⁰. A thousand times more input costs only ten
more steps. Anything that halves its remaining work each step (binary
search, walking down a balanced tree) inherits this log.

Verified by compiling and running an instrumented copy under GCC 16.2
(`g++ -std=c++23 -Wall -Wextra`).
