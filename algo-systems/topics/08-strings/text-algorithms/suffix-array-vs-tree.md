---
id: str-suffix-array-vs-tree
kind: basic
version: 1
level: 5
tags: [strings, indexing, memory-hierarchy]
requires:
  - str-suffix-array
  - str-suffix-tree
refs:
  - https://doi.org/10.1016/S1570-8667(03)00065-0
  - https://en.wikipedia.org/wiki/Suffix_tree
---

## A suffix tree answers more queries, in O(m), than a suffix array. Why did suffix arrays displace it in practice?

---

**Memory and locality: one 4-byte entry per character, in one contiguous array.**

A suffix tree's nodes and child pointers cost several times that per
character, and every step is a pointer chase. The array's binary search
touches few cache lines; with an LCP array it simulates most tree
traversals (Abouelhoda et al., "enhanced suffix arrays").
