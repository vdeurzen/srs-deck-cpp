---
id: arr-diff-code
kind: code
version: 2
level: 3
tags: [difference-array, prefix-sums, lc-370, lc-1109]
input: chips
choices:
  c1: ["u[1] + 1", "u[1]", "u[1] - 1", "n"]
compile:
  harness: |
    constexpr std::vector<int> first(std::vector<int> d, int n) {
      d.resize(n);   // the spare cell is not part of the answer
      return d;
    }
    constexpr bool examples() {   // GCC 14 needs nested braced vectors inside a function
      return first(range_add(5, {{1, 3, 2}, {2, 4, 3}, {0, 2, -2}}), 5)
                 == std::vector{-2, 0, 3, 5, 3}                        // LC 370, example 1
          && first(range_add(2, {{0, 0, 10}, {1, 1, 15}}), 2) == std::vector{10, 15}
          && first(range_add(4, {{2, 2, 7}}), 4) == std::vector{0, 0, 7, 0}
          && first(range_add(3, {{0, 2, 1}}), 3) == std::vector{1, 1, 1};
    }
    static_assert(examples());
    int main() {}
requires:
  - arr-diff-trace
  - cpp-essentials/vector-of-vectors
  - stl-const-auto-param
refs:
  - https://leetcode.com/problems/range-addition/
  - https://leetcode.com/problems/corporate-flight-bookings/
  - https://cp-algorithms.com/data_structures/fenwick.html#2-range-update-and-point-query
elaborate: Corporate Flight Bookings (LC 1109) numbers its flights 1 to `n` instead. Which two indices does a booking `[first, last, seats]` change in a 0-based `d`?
---

Start from `n` zeros; update `u = [l, r, v]` adds `v` to every index
`l..r` (0-based, inclusive). Init `d` with a spare cell, mark each
update, integrate. Complete where an update stops adding.

```cpp
#include <vector>
constexpr std::vector<int> range_add(int n, const std::vector<std::vector<int>>& ups) {
  std::vector<int> d(n + 1);
  for (const auto& u : ups) {
    d[u[0]] += u[2];
    d[{{c1::u[1] + 1}}] -= u[2];
  }
  for (int i = 1; i < n; ++i) d[i] += d[i - 1];
  return d;
}
```

---

**`r + 1`: the first index outside the update, where its `+v` must be cancelled.**
The spare cell takes it when `r == n - 1`, so no bounds check is needed.

`u[1]` cancels on `r` itself, so `r` is never updated. `u[1] - 1`
cancels one index too early (and reads `d[-1]` when `r == 0`). `n`
cancels in the spare cell every time, so every update runs to the end.
