---
id: ll-icache-layout
kind: basic
version: 1
level: 4
tags: [low-latency, layout, front-end, inlining]
requires:
  - foundations-cache-cost-model
refs:
  - https://en.algorithmica.org/hpc/architecture/layout/
  - https://www.agner.org/optimize/microarchitecture.pdf
---

```cpp
for (const Order& o : batch) {
  if (o.qty <= 0)    // no attribute on the branch
    log_reject(o);   // inlined at -O2
  book.apply(o);
}
```

## The reject branch never runs in production, yet moving `log_reject`'s body out of this function makes the loop faster. Why?

---

**The hot instructions spread over more 64 B lines and µop-cache windows,
with dead bytes between them.** The front end has its own caches: an L1
instruction cache, filled by the line, and a decoded-µop cache (Intel DSB,
AMD op cache). Outgrow that and the loop is decoded again every pass.
Confirm with `perf stat -e L1-icache-load-misses`.
