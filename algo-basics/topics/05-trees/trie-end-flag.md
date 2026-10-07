---
id: tree-trie-end-flag
kind: basic
version: 1
level: 2
tags: [tries, strings, trees]
requires:
  - tree-terms
refs:
  - https://doi.org/10.1145/367390.367400
  - https://en.wikipedia.org/wiki/Trie
---

## A trie stores "car" and "cart", one letter per edge, and records no word ends. What does `contains("ca")` return?

```
(root) -c-> o -a-> o -r-> o -t-> o
```

---

**`true`, wrongly: the path c-a exists, so a bare path can't tell a stored word from a prefix.**

Each node stands for the prefix spelled on the way to it, so it needs a
"word ends here" flag: set on r and t, not on a. Lookup succeeds only if
the walk ends on a flagged node.
