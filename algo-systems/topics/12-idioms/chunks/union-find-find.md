---
id: chunks-union-find-find
kind: chunk
version: 1
level: 3
tags: [idioms, union-find, compilers]
expose_ms: 5000
compile:
  harness: |
    constexpr bool halves() {
      int p[8] = {0, 0, 1, 2, 3, 4, 5, 6};   // one chain 7 -> 6 -> ... -> 0
      if (find(p, 7) != 0) return false;
      const int want[8] = {0, 0, 1, 1, 3, 3, 5, 5};
      for (int i = 0; i < 8; ++i)
        if (p[i] != want[i]) return false;
      return true;
    }
    static_assert(halves());
    int main() {}
requires:
  - graph-union-find
refs:
  - https://doi.org/10.1145/62.2160
  - https://en.wikipedia.org/wiki/Disjoint-set_data_structure#Finding_set_representatives
---

```cpp
constexpr int find(auto& parent, int x) {
  while (parent[x] != x) {
    parent[x] = parent[parent[x]];   // path halving
    x = parent[x];
  }
  return x;
}
```

---

Union-find's `find` with **path halving**: each node on the walk is
pointed at its grandparent, then the walk jumps there. No recursion,
no second pass, and with union by size the same O(α(n)) amortised bound
as full compression. Without the rewiring line, chains stay long and the
bound is lost.

It turns up far from its textbook home: type unification, register
coalescing, e-graph congruence closure. Compile-checked: the harness
asserts the halved `parent` array, not only the root.
