---
id: ordered-trie-path-compression
kind: basic
version: 1
level: 3
requires:
  - ordered-radix-trie
tags: [tries, strings]
refs:
  - https://doi.org/10.1145/321479.321481
---

## Storing a few long URLs in a plain trie creates one node per character. What does path compression (a radix tree, Patricia) change?

---

**Single-child chains collapse into one node holding the shared substring.**

Depth then counts branching points, not characters, so a handful of long
keys is a handful of nodes and far fewer cache misses per lookup.
