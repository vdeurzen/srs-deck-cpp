---
id: graph-handshake-odd-sum
kind: basic
version: 1
level: 2
tags: [foundations, graphs, proof]
requires:
  - interview-essentials/graph-degree-from-edge-list
refs:
  - https://en.wikipedia.org/wiki/Handshaking_lemma
elaborate: A party of 9 people where everyone shook exactly 5 hands — possible?
---

## A design doc proposes 7 servers, each cabled directly to exactly 3 of the others. Can that network exist?

```
servers = vertices   cables = undirected edges   7 × degree 3
```

---

**No: the degrees would sum to 21, but any graph's degree sum is 2E, which is even.**

Each cable has two ends and adds 1 to two servers' degrees, so the sum
counts every edge twice. 21 = 2E has no whole-number E. Same reason:
every graph has an even number of odd-degree vertices.
