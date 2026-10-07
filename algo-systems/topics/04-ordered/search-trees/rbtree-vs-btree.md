---
id: ordered-rbtree-vs-btree
kind: basic
version: 1
level: 3
requires:
  - algo-basics/tree-why-balance
  - foundations-cache-cost-model
tags: [trees, memory-hierarchy, databases]
elaborate: On disk the page is 4–16 KiB instead of 64 bytes. What does that do to the gap between the two trees?
refs:
  - https://en.cppreference.com/w/cpp/container/map
  - https://abseil.io/docs/cpp/guides/container
---

## Both are O(log n). Why does an in-memory B-tree beat a red-black tree on lookups?

---

**Fewer cache misses: ~20 scattered node hops become 4–5 for a million keys.**

Each red-black node is its own allocation, so each of the ~log₂ n hops
is a likely miss on a line holding one key. A B-tree node of a few cache
lines holds ~30 contiguous keys, so depth is log₃₀ n and one line
answers many comparisons.
