---
id: heap-top-k-min-heap
kind: basic
version: 1
level: 4
requires:
  - heap-top-k
tags: [heaps, selection]
refs:
  - https://en.cppreference.com/w/cpp/algorithm/push_heap
---

## To keep the k *largest* items of a stream, you use a heap of size k. Why a min-heap and not a max-heap?

---

**The root must be the weakest of the current k — the one a newcomer has to beat.**

Each arrival is compared with the root alone: smaller, discard it in
O(1); larger, replace the root and sift down in O(log k). A max-heap's
root is the best item, which tells you nothing about whether the
newcomer belongs.
