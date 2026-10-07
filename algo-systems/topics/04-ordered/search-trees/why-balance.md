---
id: ordered-why-balance
kind: basic
version: 1
level: 2
tags: [trees, complexity]
elaborate: Which inputs in your own systems arrive in key order — log replay, timestamps, auto-increment ids?
refs:
  - https://en.wikipedia.org/wiki/Self-balancing_binary_search_tree
  - https://en.cppreference.com/w/cpp/container/map
---

## Keys arrive in sorted order (1, 2, 3, …) into a plain, unbalanced BST. What does a lookup cost once they are in?

---

**O(n): the tree has degenerated into a list down its right spine.**

Each new key is larger than everything so far, so it always goes right.
Random insertion order gives expected depth ~1.39 log₂ n, but sorted
input is the common case: bulk loads in key order, log replay,
timestamps, auto-increment ids.
