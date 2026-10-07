---
id: str-kmp-amortised
kind: basic
version: 1
level: 4
tags: [strings, amortised]
requires:
  - str-kmp-failure-function
refs:
  - https://doi.org/10.1137/0206024
---

## KMP's inner `while (k > 0 && p[i] != p[k]) k = f[k - 1];` can run many times at one position. Why is the whole scan still O(n)?

---

**`k` rises by at most one per character, and each fallback lowers it.**

`k` never goes below 0, so the total number of fallbacks over the run
cannot exceed the total number of increments, at most n. A single
position may pay for many, but only for increments made earlier: the
potential argument.
