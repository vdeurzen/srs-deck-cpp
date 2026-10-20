---
id: tree-trie-end-flag
kind: basic
version: 1
level: 2
tags: [tries, strings, trees]
requires:
  - tree-terms
elaborate: "Where else must a structure mark 'a complete item ends here' apart from 'a path exists', such as a URL router or autocomplete?"
refs:
  - https://doi.org/10.1145/367390.367400
  - https://en.wikipedia.org/wiki/Trie
---

## A trie is a tree whose edges carry one letter each, so a word is stored as a path down from the root. This one stores "car" and "cart" and records no word ends. What does `contains("ca")` return?

```
(root) -c-> o -a-> o -r-> o -t-> o
```

---

**`true`, wrongly: a bare path can't tell a stored word from a mere prefix.**

Each node stands for the prefix spelled on the way to it, so it needs a
"word ends here" flag: set on r and t, not on a. Lookup succeeds only if
the walk ends on a flagged node.
