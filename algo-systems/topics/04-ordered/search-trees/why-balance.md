---
id: ordered-why-balance
kind: basic
version: 1
level: 2
tags: [trees, complexity]
refs:
  - https://en.wikipedia.org/wiki/Self-balancing_binary_search_tree
  - https://en.cppreference.com/w/cpp/container/map
---

## What exactly goes wrong in an unbalanced BST, and what are the three families of fix?

---

Nothing goes wrong with *random* insertions — a randomly built BST has
expected depth ~1.39 log₂ n. What goes wrong is the input you actually
get: sorted data. Inserting 1, 2, 3, … into a plain BST produces a
linked list, every operation becomes O(n), and the workload that does
this is the most common one there is — loading a table in key order,
replaying a log, inserting timestamps.

Three ways to keep depth logarithmic:

- **Rotation-based, with an invariant**: AVL (heights of siblings differ
  by ≤ 1) and red-black trees (no red-red edge, equal black-height on
  every path). AVL is more tightly balanced, so lookups are slightly
  faster and rebalancing on update slightly more frequent; red-black
  does fewer rotations per update, which is why it is the usual library
  choice (`std::map`, Java's `TreeMap`, the Linux CFS runqueue).
- **Multi-way nodes**: B-trees and B⁺-trees keep *all* leaves at the
  same depth by splitting and merging nodes rather than rotating. Depth
  is log_B n, which is the only one of these three that changes the
  base of the logarithm — and therefore the only one that helps with
  cache and disk.
- **Randomised**: treaps and skip lists get expected O(log n) from
  random priorities or coin flips instead of a maintained invariant. No
  rebalancing logic, much simpler concurrency, and the bound is
  probabilistic rather than guaranteed.

What all of them buy over a hash table is **order**: predecessor and
successor, range scans, and iteration in key order — which is why an
index that must answer `WHERE ts BETWEEN a AND b` is a tree and not a
hash, no matter how much faster the hash is at point lookups.
