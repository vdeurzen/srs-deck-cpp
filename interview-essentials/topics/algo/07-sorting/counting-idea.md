---
id: sort-counting-idea
kind: basic
version: 1
level: 2
tags: [sorting, counting-sort, complexity]
requires:
  - sort-lower-bound
refs:
  - https://www-cs-faculty.stanford.edu/~knuth/taocp.html
  - https://en.wikipedia.org/wiki/Counting_sort
---

## Counting sort orders 1 000 000 exam scores in 0–100 in O(n + k) time. How does it get under the n log n lower bound?

---

**It never compares two keys: each key is used as an array index.**

One pass counts each of the k = 101 scores, a prefix sum turns counts
into end positions, a second pass places every element: about 10⁶
steps, not 2·10⁷. The bound covers only comparison sorts. The price:
k counters, so keys need a small range.
