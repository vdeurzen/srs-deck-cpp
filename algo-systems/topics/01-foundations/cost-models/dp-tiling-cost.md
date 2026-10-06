---
id: foundations-dp-tiling-cost
kind: code
version: 1
level: 3
tags: [dynamic-programming, tiling, compilers]
requires:
  - foundations-dp-optimal-substructure
input: chips
choices:
  c1:
    - "best[i - len] + kCost[len]"
    - "best[i - 1] + kCost[len]"
    - "best[i - len] + kCost[i - len]"
    - "kCost[len]"
compile:
  harness: |
    static_assert(min_cover(1) == 4);
    static_assert(min_cover(2) == 5);
    static_assert(min_cover(3) == 7);
    static_assert(min_cover(4) == 10);   // 2 + 2, not greedy 3 + 1 (11)
    static_assert(min_cover(6) == 14);
    int main() {}
refs:
  - https://doi.org/10.1090/S0002-9904-1954-09848-8
  - https://en.wikipedia.org/wiki/Dynamic_programming
---

Cover a row of `n` cells with tiles 1, 2 or 3 cells long, at minimum
total cost. Complete the recurrence: the cheapest cover of the first `i`
cells ends with some tile of length `len`.

```cpp
#include <algorithm>
#include <array>

constexpr int kCost[4] = {0, 4, 5, 7};   // kCost[len]
constexpr int min_cover(int n) {
  std::array<int, 32> best{};            // best[i]: first i cells
  for (int i = 1; i <= n; ++i) {
    best[i] = 1 << 20;
    for (int len = 1; len <= 3 && len <= i; ++len)
      best[i] = std::min(best[i], {{c1::best[i - len] + kCost[len]}});
  }
  return best[n];
}
```

---

**Last tile plus the best cover of what is left**: optimal substructure
in one line, filled left to right so every `best[i − len]` is ready.

Greedy "biggest tile first" covers 4 cells as 3 + 1 for 11; the table
finds 2 + 2 for 10. That gap is the whole argument for instruction
selection by dynamic programming over maximal munch: there, the row is an
expression tree and the tiles are machine instructions.
