---
id: complexity-cost-trace-doubling
kind: trace
version: 1
level: 1
tags: [foundations, complexity, logarithms, tracing]
requires:
  - complexity-cost-trace-single-loop
probes:
  1: { steps: "10" }
  2: { steps: "7" }
  3: { steps: "13" }
refs:
  - https://en.wikipedia.org/wiki/Logarithm
---

The loop variable is multiplied by `factor`, not incremented. Each probe
reads `steps` after the call on its line.

```cpp
int steps = 0;
void grow(long n, int factor) {
  steps = 0;
  for (long i = 1; i < n; i *= factor) ++steps;
}

int main() {
  grow(1'000, 2);      // @1
  grow(1'000, 3);      // @2
  grow(1'000'000, 3);  // @3
}
```

---

Doubling: 1, 2, 4, …, 512 is 10 values below 1 000 (2¹⁰ = 1 024).
Tripling: 1, 3, 9, …, 729 is 7, and 13 below 10⁶ (3¹² = 531 441,
3¹³ = 1 594 323). A thousand times the input cost **six more steps**,
not a thousand times more. A loop that multiplies (or divides) its
variable by a constant costs log n passes; the base only changes the
constant factor (10 against 7 here).

Verified by compiling and running an instrumented copy under GCC 16.2
(`g++ -std=c++23 -Wall -Wextra`).
