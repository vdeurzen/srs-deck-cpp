---
id: heap-heapify-linear
kind: basic
version: 1
level: 3
tags: [heaps, complexity]
requires:
  - heap-heapify-order-code
  - heap-op-costs
elaborate: Where else does seeing all the input at once beat inserting it one item at a time?
refs:
  - https://doi.org/10.1145/355588.365103
  - https://en.cppreference.com/w/cpp/algorithm/make_heap
---

## A heap of 1023 keys (10 full levels). Pushing them one at a time in increasing order costs 8194 swaps; bottom-up heapify (sift each internal node down, last first) makes at most 1013. What makes heapify so much cheaper?

---

**A node sifts down at most its height, and most nodes are near the bottom.**

512 leaves pay 0, 256 at most 1, 128 at most 2, …, the root 9:
less than n in total, so O(n). A push sifts *up*, by up to its depth,
and most nodes are deep: n log n worst case.
