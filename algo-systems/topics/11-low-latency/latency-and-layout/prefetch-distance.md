---
id: ll-prefetch-distance
kind: basic
version: 1
level: 5
tags: [low-latency, memory-hierarchy, optimisation]
requires:
  - ll-prefetching
refs:
  - https://en.algorithmica.org/hpc/cpu-cache/prefetching/
  - https://gcc.gnu.org/onlinedocs/gcc/Other-Builtins.html
---

```cpp
for (size_t i = 0; i < n; ++i) {
  if (i + 8 < n) __builtin_prefetch(&table[idx[i + 8]]);
  sum += table[idx[i]];
}
```

## `table` is 1 GiB, accessed through `idx`. Why prefetch `idx[i + 8]` rather than `idx[i + 1]`?

---

**The prefetch must be issued about one DRAM latency before the load
needs it.** At ~10 ns per iteration, an ~80 ns miss needs about 8
iterations of lead; `i + 1` arrives far too late. Too far ahead, and the
line is evicted before use, so the distance is tuned by measurement.
