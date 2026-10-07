---
id: tree-min-height
kind: code
version: 1
level: 1
tags: [trees, complexity, logarithms]
requires:
  - tree-terms
  - complexity-log-halvings
input: chips
choices:
  c1: ["(1L << h) - 1", "1L << h", "2L * h + 1", "(long)h * h"]
compile:
  harness: |
    static_assert(min_levels(1) == 1);
    static_assert(min_levels(7) == 3);
    static_assert(min_levels(8) == 4);
    static_assert(min_levels(1'000'000) == 20);
    int main() {}
refs:
  - https://en.wikipedia.org/wiki/Binary_tree#Properties_of_binary_trees
---

Each new level of a full binary tree holds twice as many nodes as the one
above it: 1, 2, 4, 8, … Complete the loop so `min_levels(n)` is the fewest
levels any binary tree with `n` nodes can have.

```cpp
constexpr int min_levels(long n) {
  int h = 0;
  while ({{c1::(1L << h) - 1}} < n) ++h;   // nodes in a full tree of h levels
  return h;
}
```

---

h full levels hold 1 + 2 + … + 2^(h−1) = **2^h − 1** nodes, so 7 nodes fit
in 3 levels and the 8th needs a 4th. Inverting gives the bound every tree
Card relies on: n nodes need at least ⌈log₂(n + 1)⌉ levels, so a million
keys need 20. A tree that achieves this is as short as a tree can be.

`1L << h` counts the nodes of the *next* level alone (and sends 8 nodes to
3 levels); `2h + 1` grows linearly and gives 0 levels for one node.
