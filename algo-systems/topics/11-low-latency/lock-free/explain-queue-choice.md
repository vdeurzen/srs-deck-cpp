---
id: ll-explain-queue-choice
kind: explain
version: 1
level: 5
tags: [low-latency, lock-free, queues, interview]
requires:
  - ll-mpmc-blocking
  - ll-michael-scott-helping
  - ll-hazard-vs-epoch
refs:
  - https://www.1024cores.net/home/lock-free-algorithms/queues/bounded-mpmc-queue
  - https://www.cs.rochester.edu/~scott/papers/1996_PODC_queues.pdf
---
A service passes messages between threads in three places: one feed
thread to one strategy thread; eight gateway threads to one risk thread;
and a shared work queue where no stalled thread may block the others.
Choose a queue for each and, where nodes are freed, how memory is
reclaimed.
---
- [ ] Feed → strategy: an SPSC ring, because each counter has one writer, so release/acquire loads and stores suffice and there is no CAS
- [ ] Gateways → risk: a bounded MPMC ring with per-slot sequence numbers (Vyukov): no allocation and no holes, accepting that it is blocking per slot — a stalled claimant makes consumers see it empty
- [ ] Shared work queue: Michael–Scott, whose helping rule (advancing a lagging `tail`) makes it lock-free, at the price of a node allocation per message
- [ ] Michael–Scott's freed nodes need safe reclamation: hazard pointers when unreclaimed memory must stay bounded, epochs (or RCU) when reads must be nearly free and memory can grow during a stall
- [ ] Or avoid freeing altogether: recycle nodes through a pre-sized pool, the usual choice on a trading path where allocation was never allowed anyway
