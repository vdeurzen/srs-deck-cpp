---
id: sort-partition-regions
kind: trace
version: 1
level: 1
tags: [foundations, tracing, sorting, quicksort, partition, invariants]
probes:
  1: { small: "2 1", big: "8 6" }
  2: { small: "2 1 3", big: "6 9 8" }
requires:
  - sort-swap-temp
  - sort-quick-idea
refs:
  - https://en.wikipedia.org/wiki/Quicksort#Lomuto_partition_scheme
  - https://doi.org/10.1093/comjnl/5.1.10
---

A partition scan around pivot 5 (kept in `a[6]`) grows two regions:
`small` = `a[0, s)` and `big` = `a[s, i)`. At each probe, write the
contents of both regions as space-separated values.

```cpp
std::array a{6, 2, 8, 1, 9, 3, 5};
std::size_t s = 0;
auto step = [&](std::size_t i) {
  if (a[i] < 5) { std::swap(a[s], a[i]); ++s; }
};
for (std::size_t i = 0; i < 4; ++i) step(i);    // @1  (i = 4)
for (std::size_t i = 4; i < 6; ++i) step(i);    // @2  (i = 6)
```

---

A value below 5 is swapped into slot `s`, so `small` grows by one and
the big value it displaced moves to the far end of `big`. A big value
needs no swap: `big` grows just because `i` moves on. So **neither
region ends up sorted**: `8 6` became `6 9 8`. A final swap of `a[s]`
with the pivot puts 5 between the regions. (Run with GCC 16.2.)
