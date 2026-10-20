---
id: hashing-direct-address-limit
kind: basic
version: 1
level: 1
tags: [foundations, direct-addressing]
requires:
  - hashing-direct-address
elaborate: "Which keys in your own systems span a range small enough for a direct array, and which force you to compute an index?"
refs:
  - Cormen, Leiserson, Rivest, Stein, Introduction to Algorithms, 4th ed., §11.1–11.2
---

## A service tracks 10,000 active users keyed by 64-bit user id. Why can't it look them up in an array with one slot per possible id?

---

**That array needs 2⁶⁴ slots (about 1.8 · 10¹⁹) to hold 10,000 users.**

A direct-address table grows with the number of *possible* keys, not
the number stored. Computing a small index from the key instead keeps
the O(1) jump with about n slots, at the price that two keys can get
the same index.
