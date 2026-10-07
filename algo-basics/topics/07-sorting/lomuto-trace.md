---
id: sort-lomuto-trace
kind: trace
version: 1
level: 2
tags: [tracing, sorting, quicksort, partition]
probes:
  1: { p: "3" }
requires:
  - sort-quick-idea
refs:
  - https://en.wikipedia.org/wiki/Quicksort#Lomuto_partition_scheme
  - https://en.cppreference.com/w/cpp/algorithm/partition
---

Lomuto partition, pivot = the last element. `p` is where the pivot
ends up.

```cpp
std::array a{4, 7, 2, 9, 1, 5};   // pivot = a[5] = 5
std::size_t store = 0;
for (std::size_t i = 0; i < 5; ++i)
  if (a[i] < 5) std::swap(a[i], a[store++]);
std::swap(a[store], a[5]);
std::size_t p = store;            // @1
```

---

Invariant: `a[0, store)` < pivot and `a[store, i)` ≥ pivot. Three
elements (4, 2, 1) are smaller: the loop leaves `4 2 1 9 7 5` with
`store` = 3, and the final swap drops the pivot between the groups,
`4 2 1 5 7 9`, at its sorted position 3. One scan,
n − 1 comparisons: **partition is Θ(n)**. (Run with GCC 16.2.)
