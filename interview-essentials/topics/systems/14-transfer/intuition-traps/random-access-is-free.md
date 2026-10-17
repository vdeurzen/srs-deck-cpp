---
id: trap-random-access-is-free
kind: basic
version: 1
level: 3
tags: [transfer, misconception, memory-hierarchy]
elaborate: Which loop in your hot path has a data-dependent address? Could the data be reordered so the access becomes sequential?
requires:
  - foundations-cache-cost-model
refs:
  - https://en.algorithmica.org/hpc/cpu-cache/
  - https://en.wikipedia.org/wiki/Random-access_machine
---

## `a` is a 256 MB `std::vector<int>`. Both loops load every element once. How do they compare when `idx` is `0, 1, 2, …` versus the same indices shuffled?

```cpp
long sum = 0;
for (unsigned i : idx) sum += a[i];
```

---

**Shuffled is typically 10–20× slower: nearly every load misses cache and TLB.**

In order, each 64-byte line serves 16 ints and the prefetcher runs
ahead; shuffled, every load fetches a fresh line, often after a page
walk. Measured (GCC 16.2 `-O2`, Ryzen 7 PRO 6850U): 0.45 versus 9.2 ns
per element. Count misses, not operations.
