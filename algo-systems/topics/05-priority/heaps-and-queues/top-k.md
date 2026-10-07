---
id: heap-top-k
kind: basic
version: 1
level: 4
requires:
  - heap-vocabulary
  - sort-quickselect
tags: [heaps, selection, databases]
elaborate: For n in the thousands, would you bother with anything but sort-and-take? What would you measure before deciding?
refs:
  - https://en.cppreference.com/w/cpp/algorithm/partial_sort
  - https://en.cppreference.com/w/cpp/algorithm/nth_element
---

## Three ways to take the top k of n items: sort, a size-k heap, `nth_element`. What does each cost?

---

**Sort O(n log n); size-k min-heap O(n log k) time, O(k) space; `nth_element` expected O(n).**

Only the heap works in one pass over a stream you cannot store.
`nth_element` needs the whole array and reorders it, leaving the top k
unsorted; `partial_sort` returns them sorted in O(n log k).
