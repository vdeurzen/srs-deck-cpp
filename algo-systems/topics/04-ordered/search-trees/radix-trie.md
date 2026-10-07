---
id: ordered-radix-trie
kind: basic
version: 1
level: 3
requires:
  - ordered-why-balance
tags: [tries, strings, databases]
refs:
  - https://doi.org/10.1145/367390.367400
  - https://en.wikipedia.org/wiki/Trie
---

## What does a trie's lookup cost depend on that a comparison tree's does not?

---

**The key's length, not the number of keys stored.**

A trie routes on the key's symbols, one level per symbol, so a million or
a billion entries cost the same walk. A comparison tree's depth grows
with log n, and each step compares whole keys.
