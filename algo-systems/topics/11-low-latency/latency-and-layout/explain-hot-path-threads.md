---
id: ll-explain-hot-path-threads
kind: explain
version: 1
level: 5
tags: [low-latency, hft, concurrency]
requires:
  - ll-spsc-orders
  - ll-spsc-cached-index
refs:
  - https://lmax-exchange.github.io/disruptor/disruptor.html
  - https://en.cppreference.com/w/cpp/atomic/memory_order
---
Explain how two pipeline stages of a hot path pass messages through an
SPSC ring with no lock and no CAS, and what keeps it fast.
---
- [ ] Each counter has one writer (producer `tail`, consumer `head`), so plain atomic loads and stores suffice and no read-modify-write is needed
- [ ] The producer's release store of `tail + 1` publishes the slot written before it to the consumer's acquire load of `tail`
- [ ] The producer's acquire load of `head` orders the consumer's earlier read of a slot before the producer overwrites it
- [ ] `head` and `tail` sit on separate cache lines, or every store to one invalidates the line the other side reads
- [ ] Each side caches the other's counter and re-reads it only when the ring looks full (or empty), so the shared line moves once per batch, not per item
