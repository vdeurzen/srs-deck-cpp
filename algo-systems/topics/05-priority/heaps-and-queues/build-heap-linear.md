---
id: heap-build-linear
kind: basic
version: 1
level: 3
requires:
  - heap-vocabulary
tags: [heaps, complexity, amortised]
elaborate: Where else does seeing all the input first beat n inserts — a sorted vector versus a `std::set`, a bulk-loaded B⁺-tree?
refs:
  - https://en.cppreference.com/w/cpp/algorithm/make_heap
  - https://doi.org/10.1145/355588.365103
  - https://en.wikipedia.org/wiki/Binary_heap#Building_a_heap
---

## Building a heap by `n` pushes is O(n log n), but `make_heap` is O(n). Where does the log go?

---

**Sift-down costs a node's height, and most nodes sit near the bottom.**

A push sifts *up*, costing up to its depth — large exactly where most
nodes are. Bottom-up building sifts *down*: n/2 leaves cost 0, n/4 cost
1, n/8 cost 2, so the total is n · Σ h/2^(h+1) = n · 1 = Θ(n).
