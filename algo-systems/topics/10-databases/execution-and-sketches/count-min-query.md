---
id: db-count-min-query
kind: code
version: 1
level: 4
tags: [databases, sketches, probabilistic, streaming]
input: chips
choices:
  c1:
    - "std::min(best, c[r][h(r, key)])"
    - "std::max(best, c[r][h(r, key)])"
    - "best + c[r][h(r, key)]"
    - "c[r][h(r, key)]"
compile:
  harness: |
    constexpr Counters s = [] {
      Counters c{};
      for (int k : {7, 7, 7, 7, 7, 1, 2, 5, 9, 9})
        for (int r = 0; r < 3; ++r) ++c[r][h(r, k)];
      return c;
    }();
    static_assert(estimate(s, 7) == 5);
    static_assert(estimate(s, 1) == 2);   // seen once: inflated, never deflated
    static_assert(estimate(s, 0) == 0);   // never seen, and certain of it
    int main() {}
requires:
  - db-count-min-sketch
refs:
  - http://dimacs.rutgers.edu/~graham/pubs/papers/cm-full.pdf
---

A count-min sketch with 3 rows of 4 counters, one hash per row:
`add(key)` increments `c[r][h(r, key)]` in every row `r`. Complete the
query.

```cpp
#include <algorithm>
#include <array>
constexpr std::array A{3, 5, 7}, B{1, 4, 2};
constexpr int h(int r, int key) { return (key * A[r] + B[r]) % 11 % 4; }
using Counters = std::array<std::array<int, 4>, 3>;
constexpr int estimate(const Counters& c, int key) {
  int best = c[0][h(0, key)];
  for (int r = 1; r < 3; ++r) best = {{c1::std\::min(best, c[r][h(r, key)])}};
  return best;
}
```

---

**The minimum over the rows.** Key 7 was added five times, yet its row-0
counter reads 6 because key 1 shares it; another row escapes that
collision and gives the exact 5. Key 1, added once, shares a counter
with something else in every row, so the best available is 2: the error
is one-sided, never below the truth. Taking the last row alone ignores
the other rows' evidence.
