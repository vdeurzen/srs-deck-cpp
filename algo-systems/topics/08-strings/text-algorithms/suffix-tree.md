---
id: str-suffix-tree
kind: basic
version: 1
level: 4
tags: [strings, indexing, tries]
requires:
  - ordered-radix-trie
refs:
  - https://doi.org/10.1109/SWAT.1973.13
  - https://en.wikipedia.org/wiki/Suffix_tree
---

## Why does a text's suffix tree find any pattern of length m in O(m), however long the text?

---

**It is a compressed trie of all suffixes: every substring is a root path.**

Each substring is a prefix of some suffix, so matching walks one edge
label per pattern character, independent of the text's length.
Compressing unary chains keeps it at O(n) nodes, and Ukkonen's or
Weiner's construction builds it in O(n).
