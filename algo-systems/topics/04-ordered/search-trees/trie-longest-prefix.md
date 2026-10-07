---
id: ordered-trie-longest-prefix
kind: basic
version: 1
level: 3
requires:
  - ordered-radix-trie
tags: [tries, networking]
refs:
  - https://doi.org/10.1145/321479.321481
  - https://www.rfc-editor.org/rfc/rfc4632
---

## A router must find the most specific route for `10.1.2.3` among prefixes like `10/8` and `10.1/16`. Why is a trie the natural structure?

---

**The deepest marked node on the address's path is the longest matching prefix.**

Walking the address bit by bit passes every stored prefix of it in order
of length, so one descent answers the query. A hash table needs a probe
per candidate prefix length; a comparison tree cannot express "prefix of"
at all.
