---
id: compiler-dominator-intersect
kind: code
version: 1
level: 5
tags: [compilers, dominance, cfg]
input: chips
choices:
  c1: ["idom[a]", "idom[b]", "a + 1", "b"]
compile:
  harness: |
    // A -> B -> D -> F, A -> C -> {D, E}, E -> F, numbered in postorder:
    // F=0, D=1, B=2, E=3, C=4, A=5.
    inline constexpr int kIdom[] = {5, 5, 5, 4, 5, 5};
    static_assert(intersect(kIdom, 3, 4) == 4);   // E and C  -> C
    static_assert(intersect(kIdom, 2, 4) == 5);   // B and C  -> A
    static_assert(intersect(kIdom, 1, 3) == 5);   // D and E  -> A
    static_assert(intersect(kIdom, 0, 3) == 5);   // F and E  -> A
    static_assert(intersect(kIdom, 5, 5) == 5);   // A with itself
    int main() {}
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
    while (a < b) a = {{c1::idom[a]}};
    while (b < a) b = idom[b];
  }
  return a;
}
```

---

Two fingers walking up the tree: whichever is *lower* in postorder is
further from the entry, so it takes a step towards the root, and they
meet at the nearest common ancestor. Postorder numbering is what makes
"which one is deeper?" a single integer comparison — the entry block
has the highest number, and `idom[x] > x` holds for every block except
the entry, where `idom[entry] == entry` — that self-loop is what stops
the two fingers walking off the top of the tree.

This tiny function is the whole reason the iterative algorithm is
practical. The full pass is: number the blocks in **postorder** (so
`intersect`'s comparisons work), set `idom[entry] = entry`, then
repeatedly walk the blocks in **reverse** postorder and set each block's idom to the fold of `intersect` over its
already-processed predecessors, until nothing changes. Two or three
passes over a real CFG; a few dozen lines; no dominator forest, no
semidominators, no path compression.

The `while (a != b)` outer loop matters: a single pass of the two inner
loops can overshoot, because stepping `a` up may take it past `b`. The
loops alternate until the fingers land on the same block.

Once `idom` exists, most of the compiler's structural questions become
cheap — ancestor tests for "does this definition dominate that use",
back-edge detection for loops, and the dominance frontier for φ
placement — which is why this is typically among the first analyses a
pipeline computes and among the most carefully cached.
