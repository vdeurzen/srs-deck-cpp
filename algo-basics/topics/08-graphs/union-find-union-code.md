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
    constexpr int deepest() {          // join 1, 2, 3 and 4 to 0, one at a time
      Sets s{};
      for (int x = 1; x < 5; ++x) s.unite(x, 0);
      int most = 0;
      for (int x = 0; x < 8; ++x) {
        int d = 0;
        for (int y = x; s.parent[y] != y; y = s.parent[y]) ++d;
        most = d > most ? d : most;
      }
      return most;
    }
    static_assert(deepest() == 1);
    int main() {}
requires:
  - graph-union-find-forest
refs:
  - https://doi.org/10.1145/321879.321884
  - https://en.wikipedia.org/wiki/Disjoint-set_data_structure#Union_by_rank
---

Union by rank: `rank[r]` bounds the height of the tree under root `r`.
Complete the test so `unite` keeps the trees shallow. (After it, `b`'s
root is hung under `a`'s.)

```cpp
#include <array>
struct Sets {
  std::array<int, 8> parent{0, 1, 2, 3, 4, 5, 6, 7}, rank{};
  constexpr int find(int x) { while (parent[x] != x) x = parent[x]; return x; }
  constexpr void unite(int a, int b) {
    a = find(a); b = find(b);
    if (a == b) return;
    if ({{c1::rank[a] < rank[b]}}) { const int t = a; a = b; b = t; }
    parent[b] = a;
    if (rank[a] == rank[b]) ++rank[a];
  }
};
```

---

**Hang the lower-rank root under the higher.** The taller tree's height
then does not grow; only two equal ranks make the result one taller.

Here the first union makes a rank-1 tree, and 2, 3, 4 each hang
directly under its root: depth 1. Always hanging one fixed side
(`false`, `a < b`) or the taller under the shorter builds the chain
0 → 1 → 2 → 3 → 4, where `find` costs O(n).
