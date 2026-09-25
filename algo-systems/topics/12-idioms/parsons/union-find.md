---
id: parsons-union-find
kind: parsons
version: 1
level: 4
tags: [union-find, amortised, compilers]
distractors:
  - "if (rank[a] < rank[b]) std::swap(a, b);"
  - "parent[find(b)] = find(a);"
compile:
  harness: |
    constexpr DisjointSet built() {
      DisjointSet d{};
      d.unite(0, 1);
      d.unite(2, 3);
      d.unite(0, 2);
      return d;
    }
    static_assert(built().connected(1, 3));
    static_assert(!built().connected(1, 4));
    static_assert(built().size[built().find(3)] == 4);
    int main() {}
refs:
  - https://dl.acm.org/doi/10.1145/321879.321884
  - https://en.wikipedia.org/wiki/Disjoint-set_data_structure
---

```cpp
#include <array>
#include <cstddef>
#include <utility>
struct DisjointSet {
  std::array<std::size_t, 8> parent{0, 1, 2, 3, 4, 5, 6, 7};
  std::array<std::size_t, 8> size{1, 1, 1, 1, 1, 1, 1, 1};
  constexpr std::size_t find(std::size_t x) const {
    while (parent[x] != x) x = parent[x];
    return x;
  }
  constexpr bool connected(std::size_t a, std::size_t b) const {
    return find(a) == find(b);
  }
  constexpr void unite(std::size_t a, std::size_t b) {
    a = find(a);
    b = find(b);
    if (a == b) return;
    if (size[a] < size[b]) std::swap(a, b);
    parent[b] = a;
    size[a] += size[b];
  }
};
```

---

Union by size, with the pieces in the only order that works: resolve
both arguments to their **roots** first (uniting the arguments
themselves would build a chain and lose the existing sets), bail out if
they are already together, then orient the merge so the smaller tree
hangs under the larger, and finally maintain the size of the new root.

Updating `size[a]` *after* the link is not arbitrary either — it reads
`size[b]`, which is still the old subtree's count, and `b` is no longer
a root afterwards.

The distractors are the rank-based variant's line (`rank`, not `size`,
and this structure keeps sizes) and a one-liner that links without
checking whether the sets are already merged or which is larger — it
compiles happily and degrades the structure to a list.

Note that `find` here is the plain version, without path compression,
because it is `const`: the compressing variant is the subject of its
own Card. Union by size alone still bounds the depth at O(log n).

The Harness evaluates the result at compile time, so an ordering that
compiles but computes the wrong sets still fails (SPEC §4.8).
