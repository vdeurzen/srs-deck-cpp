---
id: sort-counting-idea
kind: basic
version: 1
level: 2
tags: [sorting, complexity]
requires:
  - sort-counting-worked
  - sort-merge-idea
refs:
  - https://www-cs-faculty.stanford.edu/~knuth/taocp.html
  - https://en.wikipedia.org/wiki/Counting_sort
elaborate: Name one key you sort in your own work whose range is small enough for this, and one whose range is not.
---

## Merge sort takes Θ(n log n), and a proof shows every sort built on merge sort's basic step does too. Counting sort orders 1 000 000 exam scores in 0–100 in linear time. How does it get under that bound?

---

**It never compares two keys: each key is used as an array index.**

One pass counts each of the k = 101 scores, a prefix sum turns counts
into end positions, a second pass places every element: about 10⁶
steps, not 2·10⁷. The bound covers only comparison sorts. The price:
k counters, so keys need a small range.
