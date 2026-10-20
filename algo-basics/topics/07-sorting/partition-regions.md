---
id: sort-partition-regions
kind: trace
version: 2
level: 1
tags: [foundations, tracing, sorting, quicksort, partition, invariants]
probes:
  1: { x: "8", y: "6" }
requires:
  - interview-essentials/sort-lomuto-worked
  - interview-essentials/sort-quick-idea
  - cpp-essentials/iter-array-fixed-size
  - cpp-essentials/types-size-t
elaborate: Say in one sentence, as to an interviewer, what partition guarantees about the two regions and what it leaves to the recursion.
refs:
  - https://en.wikipedia.org/wiki/Quicksort#Lomuto_partition_scheme
  - https://doi.org/10.1093/comjnl/5.1.10
---

A partition scan around pivot 5, kept in `a[4]`, grows two regions:
`small` = `a[0]` … `a[s - 1]`, and `big` = `a[s]` … `a[i - 1]`.

```cpp
std::array a{6, 2, 8, 1, 5};
std::size_t s = 0;
for (std::size_t i = 0; i < 4; ++i)
  if (a[i] < 5) { std::swap(a[s], a[i]); ++s; }
int x = a[2], y = a[3];        // @1
```

---

2 swaps into slot 0, sending 6 to slot 1; then 1 swaps into slot 1,
sending that 6 on to slot 3. The scan ends with `2 1 | 8 6`: `big` holds
8 before 6, the reverse of their input order. **Neither region ends up
sorted**, which is why quicksort recurses on both. A final swap of
`a[s]` with the pivot would put 5 between them. (Run with GCC 16.2.)
