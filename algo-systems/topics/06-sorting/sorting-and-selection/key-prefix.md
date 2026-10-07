---
id: sort-key-prefix
kind: basic
version: 1
level: 5
tags: [sorting, databases, cache]
requires:
  - sort-key-normalisation
elaborate: Which of your keys share long common prefixes (URLs, paths, tenant ids) — and what does that do to this trick?
refs:
  - https://dl.acm.org/doi/10.1145/1132960.1132964
---

## A sort's entries are (first 8 bytes of the normalised key, row pointer). What does the inline prefix save?

---

**A cache miss per comparison: the prefix usually decides without touching the row.**

Without it, each comparison dereferences two pointers into rows spread
across memory. Only ties within the first 8 bytes follow the pointer to
the full key. In practice this is the single biggest win of pointer sorting.
