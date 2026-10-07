---
id: compiler-dominator-intersect
kind: code
version: 2
level: 5
tags: [compilers, dominance, cfg]
input: chips
choices:
  c1: ["a < b", "a > b", "idom[a] < idom[b]", "a != idom[a]"]
compile:
  harness: |
    // A -> B -> D -> F, A -> C -> {D, E}, E -> F, numbered in postorder:
    // F=0, D=1, B=2, E=3, C=4, A=5.
    inline constexpr int kIdom[] = {5, 5, 5, 4, 5, 5};
    static_assert(intersect(kIdom, 3, 4) == 4);   // E and C  -> C
    static_assert(intersect(kIdom, 4, 3) == 4);   // C and E  -> C
    static_assert(intersect(kIdom, 2, 4) == 5);   // B and C  -> A
    static_assert(intersect(kIdom, 1, 3) == 5);   // D and E  -> A
    static_assert(intersect(kIdom, 0, 3) == 5);   // F and E  -> A
    static_assert(intersect(kIdom, 5, 5) == 5);   // A with itself
    int main() {}
requires:
  - compiler-dominator-tree
refs:
  - https://www.cs.rice.edu/~keith/EMBED/dom.pdf
  - https://en.wikipedia.org/wiki/Dominator_(graph_theory)
---

The Cooper–Harvey–Kennedy dominator algorithm needs one helper: the
nearest common ancestor of two blocks in the partially built dominator
tree. Blocks are numbered in **postorder**, so a block's dominators
always have *higher* numbers. Complete the walk.

```cpp
#include <span>

constexpr int intersect(std::span<const int> idom, int a, int b) {
  while (a != b) {
    if ({{c1::a < b}}) a = idom[a];
    else b = idom[b];
  }
  return a;
}
```

---

Two fingers walking up the tree: whichever is *lower* in postorder is
further from the entry, so it steps towards the root, and they meet at
the nearest common ancestor. `idom[x] > x` for every block except the
entry, whose `idom[entry] == entry` self-loop stops the fingers at the
top. Stepping the *higher* number instead walks the finger already
nearer the root, which sticks at the entry and never meets the other;
comparing the `idom`s, or stepping `a` until it is the entry, can walk
past the common ancestor.

The full pass: number blocks in **postorder** (so these comparisons
work), set `idom[entry] = entry`, then walk the blocks in **reverse**
postorder, setting each block's idom to the fold of `intersect` over its
already-processed predecessors, until nothing changes. Two or three
passes on real CFGs, and none of Lengauer–Tarjan's semidominators or
path compression.
