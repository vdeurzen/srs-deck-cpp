---
id: foundations-memory-hierarchy
kind: basic
version: 1
level: 1
tags: [foundations, memory-hierarchy, cost-model]
refs:
  - https://en.algorithmica.org/hpc/cpu-cache/cache-lines/
  - https://en.algorithmica.org/hpc/cpu-cache/
---

## Both loops add the same 10 million ints of one array `a`; `idx` holds 0 … n − 1 shuffled. Loop B takes more than ten times as long. What hardware fact explains it?

```cpp
for (int i = 0; i < n; ++i) s += a[i];       // loop A
for (int i = 0; i < n; ++i) s += a[idx[i]];  // loop B
```

---

**The cache loads whole 64-byte lines: in order, one miss brings in 16 ints.**

A cache is small, fast memory beside the processor; a read it lacks is
a miss and waits for main memory. With 4-byte ints, loop A misses once
per 16 reads; loop B misses on nearly every read.
