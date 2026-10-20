---
id: foundations-memory-hierarchy
kind: basic
version: 2
level: 1
tags: [foundations, memory-hierarchy, cost-model]
refs:
  - https://en.algorithmica.org/hpc/cpu-cache/cache-lines/
  - https://en.algorithmica.org/hpc/cpu-cache/
---

## A cache is small, fast memory beside the processor; a read it lacks is a *miss* and waits for main memory. Both loops add the same 10 million 4-byte ints of `a`; `idx` holds 0 … n − 1 shuffled. Loop B takes over ten times as long. How many of loop A's reads does one miss serve?

```cpp
for (int i = 0; i < n; ++i) s += a[i];       // loop A
for (int i = 0; i < n; ++i) s += a[idx[i]];  // loop B
```

---

**16: a miss loads a whole 64-byte cache line, 16 ints.**

Loop A's next 15 reads fall in the line just loaded. Loop B jumps
elsewhere in 40 MB each time, so nearly every read is a fresh miss.
