---
id: str-aho-corasick
kind: basic
version: 1
level: 4
tags: [strings, automata, scanning]
requires:
  - str-kmp-failure-function
refs:
  - https://doi.org/10.1145/360825.360855
  - https://en.wikipedia.org/wiki/Aho%E2%80%93Corasick_algorithm
---

## You must find which of 50 000 patterns occur in a stream. What does Aho–Corasick build?

---

**A trie of all the patterns, plus a failure link from every node.**

A node's failure link points to the longest proper suffix of its string
that is also a trie node: KMP's failure function, generalised to many
patterns. A BFS builds them, parents' links first. On a mismatch the
scan follows links instead of rereading input.
