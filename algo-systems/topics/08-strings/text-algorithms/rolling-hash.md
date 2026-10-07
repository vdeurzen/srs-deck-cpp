---
id: str-rolling-hash
kind: basic
version: 1
level: 4
tags: [strings, hashing]
requires:
  - str-naive-matching
  - algo-basics/hashing-order-sensitive-hash
refs:
  - https://doi.org/10.1147/rd.312.0249
  - https://en.wikipedia.org/wiki/Rolling_hash
---

## What makes a hash "rolling"?

---

**Sliding the window one position updates the hash in O(1), without rereading the window.**

For a polynomial hash, drop the outgoing character's term, multiply by
the base, add the incoming character. Hashing every k-length window
then costs O(n), not O(nk). Rabin–Karp compares each window's hash
with the pattern's and checks the characters only on equal hashes.
