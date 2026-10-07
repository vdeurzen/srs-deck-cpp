---
id: sort-radix
kind: basic
version: 1
level: 4
tags: [sorting, databases, low-latency]
requires:
  - algo-basics/sort-stable-meaning
elaborate: A hash join's radix-partitioning phase is one pass of this sort — what does stopping after one pass buy it?
refs:
  - https://en.algorithmica.org/hpc/algorithms/sorting/
  - https://en.wikipedia.org/wiki/Radix_sort
---

## Radix sort is O(n). Why is `std::sort` still the default?

---

**Radix needs fixed-width keys that order as bytes; `std::sort` needs only a comparator.**

And its O(n) is O(d·n): 64-bit keys in 8-bit digits are 8 passes over
all the data. At n = 10⁶ a comparison sort does ~20 (log₂ n) comparisons
per element. Radix wins on large arrays of normalisable numeric keys.
