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
    constexpr DisjointSet built() {
      DisjointSet d{};
      d.unite(0, 1); d.unite(2, 3); d.unite(0, 2);
      d.unite(4, 5); d.unite(6, 7); d.unite(4, 6);
      d.unite(0, 4);                       // 7 -> 6 -> 4 -> 0
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
refs:
  - https://dl.acm.org/doi/10.1145/321879.321884
  - https://en.wikipedia.org/wiki/Disjoint-set_data_structure
---

Complete `find` so that it performs **path halving**: every node on the
path is pointed at its grandparent as the walk goes up.

```cpp
#include <array>
#include <cstddef>

struct DisjointSet {
  std::array<std::size_t, 8> parent{0, 1, 2, 3, 4, 5, 6, 7};
  std::array<std::size_t, 8> size{1, 1, 1, 1, 1, 1, 1, 1};

  constexpr std::size_t find(std::size_t x) {
    while (parent[x] != x) {
      parent[x] = {{c1::parent[parent[x]]}};
      x = parent[x];
    }
    return x;
  }

  constexpr void unite(std::size_t a, std::size_t b) {
    a = find(a);
    b = find(b);
    if (a == b) return;
    if (size[a] < size[b]) { const std::size_t t = a; a = b; b = t; }
    parent[b] = a;                       // union by size
    size[a] += size[b];
  }
};
```

---

Two techniques, and you need both for the famous bound. **Union by size
or rank** keeps trees shallow by hanging the smaller tree under the
larger, which alone gives O(log n) per operation. **Path compression**
flattens the path you just walked, which alone also gives about
O(log n). Together they give O(α(n)) amortised — inverse Ackermann,
below 5 for any n you will ever allocate, so effectively constant.

Path *halving* is the loop-shaped variant: it needs no recursion and no
second pass, it costs one extra store per two levels, and it achieves
the same asymptotic bound as full compression. Full compression (the
recursive `find(parent[x])`) flattens more aggressively but touches the
stack; plain `parent[x]` is no compression at all and quietly gives back
the bound.

None of these change *what* `find` returns — every variant answers the
same connectivity question — which is why this Card's harness asserts on
the resulting `parent` array rather than on the roots. A structure
invariant is sometimes the only observable difference between a right
answer and a slow one.

Where it earns its place in systems work: **compilers** use it for type
unification in Hindley–Milner inference (each `union` merges two type
variables, and the occurs check walks the same structure), for register
coalescing, and for congruence closure in e-graphs and GVN. Elsewhere it
is Kruskal's MST, connected components, and cycle detection in
dependency graphs. Note the operations it does *not* support: no split,
no delete, no enumeration of a set's members without a separate
structure.
