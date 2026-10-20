---
id: graph-union-find-union-code
kind: code
version: 1
level: 2
tags: [union-find, invariants]
input: chips
choices:
  c1: ["rank[a] < rank[b]", "rank[a] > rank[b]", "a < b", "false"]
compile:
  harness: |
    #include <array>
    constexpr int find(const auto& parent, int x) {
      while (parent[x] != x) x = parent[x];
      return x;
    }
    constexpr int deepest() {          // join 1, 2, 3 and 4 to 0, one at a time
      std::array<int, 8> parent{0, 1, 2, 3, 4, 5, 6, 7}, rank{};
      for (int x = 1; x < 5; ++x) unite(parent, rank, find(parent, x), find(parent, 0));
      int most = 0;
      for (int x = 0; x < 8; ++x) {
        int d = 0;
        for (int y = x; parent[y] != y; y = parent[y]) ++d;
        most = d > most ? d : most;
      }
      return most;
    }
    static_assert(deepest() == 1);
    int main() {}
refs:
  - https://doi.org/10.1145/321879.321884
  - https://en.wikipedia.org/wiki/Disjoint-set_data_structure#Union_by_rank
requires:
  - graph-union-find-trace
  - sort-std-swap
  - stl-const-auto-param
elaborate: Say in one sentence, as to an interviewer, why `find` stays fast on a million elements joined this way.
---

Union by rank: `rank[r]` bounds the height of the tree under root `r`,
and every rank starts at 0. `unite` receives two different roots `a`
and `b` and hangs `b` under `a`. Complete the test so the trees stay
shallow.

```cpp
#include <utility>
constexpr void unite(auto& parent, auto& rank, int a, int b) {
  if ({{c1::rank[a] < rank[b]}}) std::swap(a, b);
  parent[b] = a;
  if (rank[a] == rank[b]) ++rank[a];
}
```

---

**Hang the lower-rank root under the higher.** The taller tree's height
then does not grow; only two equal ranks make the result one taller, so
a tree of height h holds at least 2^h elements: height ≤ log₂ n.

Here the first union makes a rank-1 tree, and 2, 3, 4 each hang
directly under its root: depth 1. Ignoring rank (`false`, or `a < b`,
which compares element names, not heights) or hanging the taller under
the shorter builds a chain 0 → 1 → 2 → 3 → 4, which `find` walks whole.
