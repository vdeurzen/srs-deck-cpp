---
id: complexity-halving-inner-loop
kind: trace
version: 1
level: 2
tags: [complexity, logarithms, tracing]
requires:
  - complexity-sequential-vs-nested
  - complexity-log-halvings
probes:
  1: { nested: "384" }
  2: { halving: "127" }
refs:
  - https://en.wikipedia.org/wiki/Geometric_series
---

Both are a loop inside a loop. Each probe reads its counter after that
loop nest has finished.

```cpp
int main() {
  const int n = 64;
  int nested = 0, halving = 0;
  for (int i = 0; i < n; ++i)
    for (int j = 1; j < n; j *= 2) ++nested;   // @1
  for (int i = n; i > 0; i /= 2)
    for (int j = 0; j < i; ++j) ++halving;     // @2
}
```

---

- `nested`: n outer passes × log₂ 64 = 6 inner steps = 384, O(n log n).
- `halving`: the inner loop runs i times while i halves:
  64 + 32 + … + 1 = 127 = 2n − 1, so **O(n)**, not O(n log n).

Multiplying loop bounds is only safe when the inner count is the same on
every pass. When it shrinks geometrically, add the series: its sum is
dominated by the first term.

Verified by compiling and running an instrumented copy under GCC 16.2
(`g++ -std=c++23 -Wall -Wextra`).
