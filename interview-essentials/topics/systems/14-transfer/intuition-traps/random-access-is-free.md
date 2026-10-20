---
id: trap-random-access-is-free
kind: basic
version: 2
level: 3
tags: [transfer, misconception, memory-hierarchy]
elaborate: Which loop in your hot path reads only one field of each element, and how could you lay the data out so that field's values sit side by side?
requires:
  - foundations-cache-cost-model
refs:
  - https://en.algorithmica.org/hpc/cpu-cache/bandwidth/
  - https://en.algorithmica.org/hpc/cpu-cache/cache-lines/
---

## Many expect run time to follow the number of loads, each costing the same. `a` is a 256 MB array of 4-byte `int`s, far larger than any cache. Loop B makes 1/16 as many loads as loop A. Roughly how do their run times compare?

```cpp
long sa = 0, sb = 0;
for (int i = 0; i < n; i += 1)  sa += a[i];   // loop A
for (int i = 0; i < n; i += 16) sb += a[i];   // loop B
```

---

**About the same: B is barely faster, not 16× faster.**

Sixteen ints fill one 64-byte line, so both loops pull every line of
`a` from main memory exactly once. That traffic sets the time; the
adds hide under it. Measured (GCC 16.2 `-O2`, Ryzen 7 PRO 6850U):
~17 versus ~13 ms. Count lines loaded, not loads.
