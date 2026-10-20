---
id: trap-random-access-is-free
kind: basic
version: 1
level: 3
tags: [transfer, misconception, memory-hierarchy]
elaborate: Which loop in your hot path reads an address that comes from data, and how could you reorder the data so the reads become sequential?
requires:
  - foundations-cache-cost-model
refs:
  - https://en.algorithmica.org/hpc/cpu-cache/
  - https://en.wikipedia.org/wiki/Random-access_machine
---

## Many expect every load from memory to cost the same, wherever it lands. `a` is a 256 MB `std::vector<int>`, and the loop loads every element once. Roughly how do the run times compare when `idx` is `0, 1, 2, …` versus the same indices shuffled (`for (unsigned i : idx)` runs once per element of `idx`)?

```cpp
long sum = 0;
for (unsigned i : idx) sum += a[i];
```

---

**Shuffled is typically 10–20× slower: nearly every load misses the cache.**

In order, each 64-byte line serves 16 ints and the prefetcher runs
ahead; shuffled, every load fetches a fresh line from main memory. Measured (GCC 16.2 `-O2`, Ryzen 7 PRO 6850U): 0.45 versus 9.2 ns
per element. Count misses, not operations.
