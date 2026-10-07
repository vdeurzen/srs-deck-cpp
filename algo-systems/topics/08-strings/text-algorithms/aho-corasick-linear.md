---
id: str-aho-corasick-linear
kind: basic
version: 1
level: 4
tags: [strings, automata, amortised]
requires:
  - str-aho-corasick
refs:
  - https://doi.org/10.1145/360825.360855
elaborate: When the pattern set is small, a skipping algorithm can beat Aho–Corasick. What does it get to skip that Aho–Corasick cannot?
---

## Why does an Aho–Corasick scan cost the same per input byte with 50 patterns as with 50 000?

---

**The input pointer never moves back: each byte is one trie step plus amortised failure steps.**

Each goto step deepens the node by one, each failure step makes it
shallower, so failures never outnumber gotos: O(n + matches). Linear is
not cheap, though: a 50 000-pattern trie outgrows the cache, so a step
can be a miss.
