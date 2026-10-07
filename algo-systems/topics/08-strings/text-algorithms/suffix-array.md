---
id: str-suffix-array
kind: basic
version: 2
level: 4
tags: [strings, indexing, databases]
requires:
  - ordered-lower-bound-loop
refs:
  - https://doi.org/10.1137/0222058
  - https://en.wikipedia.org/wiki/Suffix_array
---

## The suffix array of `banana` is `[5, 3, 1, 0, 4, 2]`. How does it find every occurrence of `ana`?

---

**Binary-search for the run of suffixes starting with `ana`: positions 3 and 1.**

The array lists suffix start positions in sorted suffix order, so all
suffixes sharing a prefix sit together. Two binary searches bound that
run: O(m log n) character comparisons, one 4-byte integer per text
position.
