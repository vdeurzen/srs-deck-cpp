---
id: trap-more-threads
kind: basic
version: 1
level: 4
tags: [transfer, misconception, concurrency, throughput]
elaborate: In a system you know, what is the one shared mutable thing every thread touches? What would partitioning it look like?
requires:
  - ll-shared-counter-scaling
refs:
  - http://www.perfdynamics.com/Manifesto/USLscalability.html
  - https://en.wikipedia.org/wiki/Amdahl%27s_law
---

## Every request increments one shared counter, then does a few hundred nanoseconds of independent work. What happens to throughput as threads grow from 1 to 16 on 16 cores?

```cpp
std::atomic<long> requests{0};

void handle(const Request& r) {
  requests.fetch_add(1, std::memory_order_relaxed);
  serve(r);   // touches nothing shared
}
```

---

**It rises, peaks, then falls: the counter's cache line bounces between cores.**

Each `fetch_add` needs the line exclusively, so increments serialise,
each a cross-core transfer; more threads mean more transfers per useful
request. Gunther's Universal Scalability Law names this coherence term
(≈ N²). Fix: per-thread padded counters, summed when read.
