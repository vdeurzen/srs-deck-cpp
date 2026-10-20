---
id: sort-heap-sort-worked
kind: basic
version: 1
level: 2
tags: [sorting, heap-sort, worked-example]
requires:
  - heap-sift-down-worked
refs:
  - https://doi.org/10.1145/512274.512284
  - https://en.cppreference.com/w/cpp/algorithm/sort_heap
---

## Heap sort on the max-heap `7 5 6 2`: swap the root with the heap's last slot, shrink the heap by one, sift the new root down, repeat. `|` marks the heap's end.

```
step              array        why
start             7 5 6 2 |    max at the root
swap root, end    2 5 6 | 7    7 leaves the heap
sift 2 down       6 5 2 | 7    6 is the larger child
swap root, end    2 5 | 6 7    6 leaves the heap
sift 2 down       5 2 | 6 7    5 is the only child
```

Why is 7 in its final sorted slot after row 2, with no further comparison?

---

**It was the heap's maximum, so it belongs in the last unsorted slot.**

The root is the largest key still in the heap, and everything right of
`|` is larger still and already placed. Each round puts the next largest
just left of them: the sorted part grows as the heap shrinks.
