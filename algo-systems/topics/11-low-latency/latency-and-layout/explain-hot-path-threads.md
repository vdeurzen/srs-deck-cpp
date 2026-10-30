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
elaborate: A third stage wants to read the same messages. What breaks in this design, and what would you change?
---
An interviewer asks how two pipeline stages of a hot path can pass
messages through an SPSC ring, correctly and fast, with no lock and no
CAS. Answer aloud.
---
- [ ] Each counter has one writer, producer `tail` and consumer `head`, so plain atomic loads and stores suffice
- [ ] The producer's release store of `tail + 1` publishes the slot to the consumer's acquire load of `tail`
- [ ] The producer's acquire load of `head` orders the consumer's earlier read of a slot before the producer overwrites it
- [ ] `head` and `tail` sit on separate cache lines, or every store to one invalidates the line the other side reads
- [ ] Each side caches the other's counter and rereads it only when the ring looks full or empty: once per batch
