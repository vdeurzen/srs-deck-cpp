---
id: heap-decrease-key-handle
kind: basic
version: 1
level: 3
requires:
  - heap-vocabulary
tags: [heaps, invariants]
refs:
  - https://en.cppreference.com/w/cpp/container/priority_queue
  - https://doi.org/10.1145/28869.28874
---

## Vertex 7's key in an array heap of 10⁶ entries just dropped. Sifting it up is O(log n). What makes `decrease_key(7)` expensive anyway?

---

**Finding where 7 sits: O(n), since heap order says nothing about non-root positions.**

The sift needs a slot index, and a heap is only ordered along each
root-to-leaf path, so locating an entry is a linear scan. A cheap
`decrease_key` needs a handle per element, kept current through every
swap — which `std::priority_queue` does not expose.
