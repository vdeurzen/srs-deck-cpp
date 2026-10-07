---
id: ordered-skip-list-sorted-input
kind: basic
version: 1
level: 4
requires:
  - ordered-skip-list
  - ordered-why-balance
tags: [trees, randomised]
refs:
  - https://dl.acm.org/doi/10.1145/78973.78977
---

## Keys 1, 2, 3, … arrive in sorted order. Does a skip list degrade the way a plain BST does?

---

**No: its shape comes from the coin flips, not from the key order.**

Each node's height is drawn independently of its key, so every input
order gives the same expected O(log n). The only bad case is unlucky
random bits, which an adversary cannot choose without seeing the
generator.
