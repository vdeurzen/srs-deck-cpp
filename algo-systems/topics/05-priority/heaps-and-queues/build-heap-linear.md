---
id: heap-build-linear
kind: basic
version: 1
level: 3
tags: [heaps, complexity, amortised]
refs:
  - https://en.cppreference.com/w/cpp/algorithm/make_heap
  - https://en.wikipedia.org/wiki/Binary_heap#Building_a_heap
---

## Building a heap by `n` pushes is O(n log n), but `make_heap` is O(n). Where does the log go?

---

Both walk a path per element; the difference is **which** path, and how
many elements have a long one.

Pushing sifts *up* from a leaf: the cost is the depth of the node being
added, and half the elements of a heap are leaves, so half the
insertions pay the full log n. Total Θ(n log n).

Bottom-up building sifts *down* from each internal node, starting at the
last one. The cost of sifting down node `i` is the height of its
subtree, not its depth — and that is the reverse distribution: half the
nodes are leaves with height 0 and cost nothing, a quarter have height
1, an eighth height 2. The total is

    n · Σ (h / 2^(h+1)) over h ≥ 0 = n · 2 = Θ(n)

because the series converges. The intuition to keep: **most nodes are
near the bottom, and sifting down is cheap exactly there**, while
sifting up is expensive exactly there.

The practical reading is that heap-based algorithms should build in bulk
when they can — `make_heap` over a filled vector, not a loop of
`push`. Heapsort is then Θ(n) to build plus Θ(n log n) to extract, which
is where its total comes from.

The same shape appears whenever an algorithm gets to see all its input
first: `std::sort` on a vector beats inserting into a `set`, bulk-loading
a B⁺-tree bottom-up beats `n` inserts (and packs the pages full), and
building a hash table with `reserve` beats growing it. "Do you know the
data up front?" is one of the highest-value questions you can ask about
a hot path.
