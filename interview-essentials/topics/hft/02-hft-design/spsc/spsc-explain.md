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
---
The interviewer: "Implement the queue between our feed-handler thread
and the strategy thread. Walk me through each choice you make."
---
- [ ] Names a power-of-two capacity with free-running indices masked by `N - 1`, because `tail_ - head_` then tells full from empty and indexing costs one AND
- [ ] Names one writer per index (producer `tail_`, consumer `head_`), because then plain atomic loads and stores suffice: no CAS and no shared count
- [ ] Names a `release` store after writing the slot, paired with an `acquire` load on the other side, because that makes the plain slot write visible before the index
- [ ] Names a private cached copy of the other side's index, refreshed only when the ring looks full or empty, because each refresh is a cross-core cache miss
- [ ] Names one cache line per writer with the slots on separate lines, because two cores writing one line bounce it on every operation
