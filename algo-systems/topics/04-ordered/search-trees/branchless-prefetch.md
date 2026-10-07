---
id: ordered-branchless-prefetch
kind: basic
version: 1
level: 5
tags: [binary-search, branchless, memory-hierarchy, low-latency]
requires:
  - ordered-branchless-large-array
refs:
  - https://en.algorithmica.org/hpc/data-structures/binary-search/
  - https://gcc.gnu.org/onlinedocs/gcc/Other-Builtins.html#index-_005f_005fbuiltin_005fprefetch
---

## In the branchless loop, why can you `__builtin_prefetch` the next iteration's element before the current comparison resolves?

---

**The next probe is one of only two addresses, both computable now.**

Prefetching both turns the serial chain of misses into overlapping ones:
one wasted fetch per step buys back the large-array case. Batching
independent searches overlaps their latencies the same way.
