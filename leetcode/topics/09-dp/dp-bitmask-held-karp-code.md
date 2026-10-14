---
id: dp-bitmask-held-karp-code
kind: code
version: 1
level: 4
tags: [dynamic-programming, bitmask-dp, held-karp, lc-943]
input: chips
choices:
  c1: ["!(m >> v & 1)", "m >> v & 1", "m & (1 << v)", "!(m & v)"]
compile:
  harness: |
    constexpr bool examples() {   // GCC 14 needs nested braced vectors inside a function
      return held_karp({{0, 1, 9},
                        {1, 0, 2},
                        {9, 2, 0}}) == std::vector{1'000'000, 11, 3}
          && held_karp({{0, 2, 9, 10},
                        {1, 0, 6, 4},
                        {15, 7, 0, 8},
                        {6, 3, 12, 0}}) == std::vector{1'000'000, 20, 18, 16};
    }
    static_assert(examples());
    int main() {}
requires:
  - dp-bitmask-signal
refs:
  - https://leetcode.com/problems/find-the-shortest-superstring/
  - https://doi.org/10.1137/0110015
elaborate: Why does plain increasing `m` already fill every mask before any mask that extends it?
---

Held–Karp: `d[m][v]` is the shortest path that starts at node 0, visits
exactly the nodes in mask `m`, and ends at `v`. The function returns the
row for the full mask. Complete the test that lets the path step to `v`.

```cpp
#include <bits/stdc++.h>
constexpr std::vector<int> held_karp(const std::vector<std::vector<int>>& w) {
  std::vector d(1 << w.size(), std::vector<int>(w.size(), 1'000'000));
  d[1][0] = 0;
  for (int m = 1; m < int(d.size()); ++m)
    for (std::size_t u = 0; u < w.size(); ++u)
      for (std::size_t v = 0; v < w.size(); ++v)
        if ({{c1::!(m >> v & 1)}})
          d[m | 1 << v][v] = std::min(d[m | 1 << v][v], d[m][u] + w[u][v]);
  return d.back();
}
```

---

**`v` must not be in `m` yet: bit `v` of `m` is 0.** Each step adds one
new node, so the full mask means every node exactly once. O(2ⁿ · n²).

`m >> v & 1` and `m & (1 << v)` both test that `v` *is* in `m`: the
path only revisits, so nothing past the start is reached. `!(m & v)`
tests the number `v` as if it were a mask.
