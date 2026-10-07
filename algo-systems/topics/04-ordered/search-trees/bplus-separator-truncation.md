---
id: ordered-bplus-separator-truncation
kind: basic
version: 1
level: 5
requires:
  - ordered-bplus-tree
tags: [trees, databases, storage]
refs:
  - https://dl.acm.org/doi/10.1145/320521.320530
---

## A leaf split falls between `"smith"` and `"smyth"`. Why may the B⁺-tree post `"smy"` to the parent, a key that exists nowhere?

---

**A separator only routes searches; any value between the two sides works.**

Since no record hangs off it, the shortest distinguishing prefix suffices
(suffix truncation, Bayer and Unterauer's prefix B-tree). Shorter
separators raise fanout, and deleting `"smyth"` later needs no separator
repair.
