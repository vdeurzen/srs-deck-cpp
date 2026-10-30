---
id: graph-union-find
kind: code
version: 1
level: 4
tags: [union-find, amortised, compilers]
input: chips
choices:
  c1: ["parent[parent[x]]", "parent[x]", "x", "find(parent[x])"]
compile:
  harness: |
    constexpr void unite(DisjointSet& d, std::size_t a, std::size_t b) {
      a = d.find(a);
      b = d.find(b);
      if (a != b) d.parent[b] = a;         // equal sizes throughout
    }
    constexpr DisjointSet built() {
      DisjointSet d{};
      unite(d, 0, 1); unite(d, 2, 3); unite(d, 0, 2);
      unite(d, 4, 5); unite(d, 6, 7); unite(d, 4, 6);
      unite(d, 0, 4);                      // 7 -> 6 -> 4 -> 0
      return d;
    }
    constexpr DisjointSet halved() {
      DisjointSet d = built();
      d.find(7);
      return d;
    }
    static_assert(built().find(7) == 0);
    static_assert(built().find(3) == 0);
    // Path halving rewires every other node on the path, and only those.
    static_assert(halved().parent ==
                  std::array<std::size_t, 8>{0, 0, 0, 2, 0, 4, 4, 4});
    int main() {}
requires:
  - interview-essentials/graph-union-find-forest
refs:
  - https://dl.acm.org/doi/10.1145/321879.321884
  - https://en.wikipedia.org/wiki/Disjoint-set_data_structure
---

Complete `find` so that it performs **path halving**: one loop, no
second pass, and the path it walks gets roughly half as long.

```cpp
#include <array>
struct DisjointSet {
  std::array<std::size_t, 8> parent{0, 1, 2, 3, 4, 5, 6, 7};
  constexpr std::size_t find(std::size_t x) {
    for (; parent[x] != x; x = parent[x])
      parent[x] = {{c1::parent[parent[x]]}};
    return x;
  }
};
```

---

**Path halving**: each node on the walk is pointed at its grandparent,
so the path roughly halves on every `find`, in one loop with no
recursion or second pass. `find(parent[x])` is full compression (more
flattening, but recursive); plain `parent[x]` compresses nothing and
quietly loses the bound; `x` cuts the node loose as its own root.

Three of the four return the same roots, so the rewired `parent` array,
a structure invariant, is the only observable difference
between the right answer and a slow one.
