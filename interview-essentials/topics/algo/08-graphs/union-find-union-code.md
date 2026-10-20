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
    constexpr int deepest() {          // join 1, 2, 3 and 4 to 0, one at a time
      std::array<int, 8> parent{0, 1, 2, 3, 4, 5, 6, 7}, rank{};
      for (int x = 1; x < 5; ++x) unite(parent, rank, x, 0);
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
  - graph-union-find-forest
  - stl-const-auto-param
elaborate: Say in one sentence, as to an interviewer, why a tree built this way has height at most log₂ n.
---

Union by rank: `rank[r]` bounds the height of the tree under root `r`.
Complete the test so `unite` keeps the trees shallow. (After it, `b`'s
root is hung under `a`'s.)

```cpp
// parent[x]: x's parent, a root is its own; rank starts all 0
constexpr int find(const auto& parent, int x) {
  while (parent[x] != x) x = parent[x];
  return x;
}
constexpr void unite(auto& parent, auto& rank, int a, int b) {
  a = find(parent, a); b = find(parent, b);
  if (a == b) return;
  if ({{c1::rank[a] < rank[b]}}) { const int t = a; a = b; b = t; }
  parent[b] = a;
  if (rank[a] == rank[b]) ++rank[a];
}
```

---

**Hang the lower-rank root under the higher.** The taller tree's height
then does not grow; only two equal ranks make the result one taller.

Here the first union makes a rank-1 tree, and 2, 3, 4 each hang
directly under its root: depth 1. Ignoring rank (`false`, or
`a < b`, which compares vertex names, not heights) or hanging the taller
under the shorter builds the chain 0 → 1 → 2 → 3 → 4 here, where `find`
walks the whole chain.
