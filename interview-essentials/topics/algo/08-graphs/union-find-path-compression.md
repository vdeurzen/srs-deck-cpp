---
id: graph-union-find-path-compression
kind: code
version: 1
level: 2
tags: [union-find, amortised]
input: chips
choices:
  c1: ["find(parent[x])", "parent[x]", "parent[parent[x]]", "x"]
compile:
  harness: |
    constexpr Sets chain() { return Sets{{0, 0, 1, 2, 3, 4}}; }   // 5 → 4 → 3 → 2 → 1 → 0
    constexpr int root_of_5() { Sets s = chain(); return s.find(5); }
    constexpr std::array<int, 6> after_find() { Sets s = chain(); s.find(5); return s.parent; }
    static_assert(root_of_5() == 0);
    static_assert(after_find() == std::array<int, 6>{0, 0, 0, 0, 0, 0});
    int main() {}
requires:
  - graph-union-find-forest
refs:
  - https://doi.org/10.1145/364099.364331
  - https://doi.org/10.1145/321879.321884
---

Complete `find` so that it returns the root **and** leaves every node
it walked past pointing straight at that root.

```cpp
#include <array>
struct Sets {
  std::array<int, 6> parent;
  constexpr int find(int x) {
    if (parent[x] == x) return x;
    return parent[x] = {{c1::find(parent[x])}};
  }
};
```

---

**Path compression.** The recursion reaches the root, and on the way
back each node on the path is re-pointed at it. The chain 5 → 4 → … → 0
costs 5 steps once; afterwards every node on it is one step from the
root.

With union by rank as well, a sequence of m operations costs
O(m α(n)): α is the inverse Ackermann function, below 5 for any real n.

`parent[x]` and `parent[parent[x]]` return a parent or grandparent, not
the root; `x` cuts the node loose as its own set.
