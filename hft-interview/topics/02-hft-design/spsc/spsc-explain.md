---
id: spsc-explain
kind: explain
version: 1
level: 5
tags: [spsc, lock-free, queues, low-latency, interview]
requires:
  - spsc-try-pop-parsons
  - spsc-layout-chunk
refs:
  - https://rigtorp.se/ringbuffer/
  - https://lmax-exchange.github.io/disruptor/disruptor.html
  - https://en.cppreference.com/w/cpp/atomic/memory_order
elaborate: The strategy thread now wants to hand back acknowledgements. Would you reuse this ring or add a second one, and why?
---
The interviewer: "Implement the queue between our feed-handler thread
and the strategy thread. Walk me through each choice you make."
---
- [ ] Names a power-of-two capacity with free-running indices masked by `N - 1`, so `tail_ - head_` tells full from empty
- [ ] Names one writer per index, producer `tail_` and consumer `head_`, so plain atomic loads and stores suffice
- [ ] Names a `release` index store after the slot write, paired with an `acquire` load, so the slot shows first
- [ ] Names caching the other side's index, refreshed only when full or empty, since each refresh is a cross-core miss
- [ ] Names one cache line per writer, slots apart, because two cores writing one line bounce it on every operation
