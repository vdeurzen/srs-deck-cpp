---
id: dp-held-karp-parsons
kind: parsons
version: 1
level: 4
tags: [dynamic-programming, bitmask-dp, held-karp, lc-943]
distractors:
  - "      if (m >> v & 1) d[m][v] = std::min(d[m][v], d[m ^ 1 << v][u] + w[v][u]);"
  - "      if (m >> v & 1) d[m][v] = std::min(d[m][v], d[m][u] + w[u][v]);"
compile:
  harness: |
    constexpr bool examples() {   // GCC 14 needs nested braced vectors inside a function
      return path({{0}}, 1) == 0
          && path({{0, 1, 9}, {1, 0, 2}, {9, 2, 0}}, 3) == 3                         // 0-1-2
          && path({{0, 2, 9, 10}, {1, 0, 6, 4}, {15, 7, 0, 8}, {6, 3, 12, 0}}, 4) == 16
          && path({{0, 5, 1, 9}, {5, 0, 9, 1}, {9, 1, 0, 9}, {9, 9, 9, 0}}, 4) == 3;  // 0-2-1-3, one way
    }
    static_assert(examples());
    int main() {}
requires:
  - dp-bitmask-held-karp-code
refs:
  - https://leetcode.com/problems/find-the-shortest-superstring/
  - https://doi.org/10.1137/0110015
elaborate: Find the Shortest Superstring (LC 943), the shortest string containing every one of `words`, needs the order of the words, not only the cost. What would you store beside `d[m][v]` to rebuild the path at the end?
---

Held–Karp in pull form: `d[m][v]`
is the shortest path that starts at node 0, visits exactly the nodes in
mask `m`, and ends at `v`, computed from the masks without `v`. Return
the shortest path through all `n` nodes. Order the lines.

```cpp
#include <bits/stdc++.h>
constexpr int path(const std::vector<std::vector<int>>& w, int n) {
  std::vector d(1 << n, std::vector<int>(n, 1'000'000));
  d[1][0] = 0;
  for (int m = 1; m < 1 << n; ++m)
    for (int v = 1; v < n; ++v) for (int u = 0; u < n; ++u)
      if (m >> v & 1) d[m][v] = std::min(d[m][v], d[m ^ 1 << v][u] + w[u][v]);
  return std::ranges::min(d.back());
}
```

---

**Pull from `m` without `v`, with masks in increasing order.** Removing
a bit makes a smaller number, so every mask `d[m][v]` reads is already
final. Masks outermost: a node loop outside them would read cells that
later masks still improve.

`w[v][u]` walks the edge backwards; the harness's costs are not
symmetric, so it gives wrong lengths. Reading `d[m][u]` keeps `v` in
the mask, so a path may "visit" `v` twice.
