---
id: str-lcp-array
kind: basic
version: 1
level: 5
tags: [strings, indexing]
requires:
  - str-suffix-array
refs:
  - https://doi.org/10.1007/3-540-48194-X_17
  - https://en.wikipedia.org/wiki/LCP_array
---

## The LCP array holds the longest common prefix of each pair of *adjacent* suffixes in suffix-array order. How does it give the longest repeated substring?

---

**It is the largest LCP entry: suffixes sharing a long prefix sort next to each other.**

For `banana` the sorted suffixes `a, ana, anana, banana, na, nana` have
LCPs `1, 3, 0, 0, 2`, so the answer is `ana`. Kasai's algorithm builds
the LCP array in O(n) from the suffix array.
