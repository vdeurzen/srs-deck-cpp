---
id: ll-explain-queue-choice
kind: explain
version: 2
level: 5
tags: [low-latency, lock-free, queues, interview]
requires:
  - ll-mpmc-blocking
  - ll-michael-scott-helping
  - ll-hazard-vs-epoch
refs:
  - https://www.1024cores.net/home/lock-free-algorithms/queues/bounded-mpmc-queue
  - https://www.cs.rochester.edu/~scott/papers/1996_PODC_queues.pdf
elaborate: The trading path forbids allocation after start-up. What would you change about the shared work queue, and what new hazard would that bring?
---
A service passes messages between threads in three places: one feed
thread to one strategy thread; eight gateway threads to one risk thread;
and a shared work queue where no stalled thread may block the others.
An interviewer asks which queue you would use in each place, and what
each choice costs. Answer aloud.
---
- [ ] Feed to strategy: an SPSC ring, since each counter has one writer, so release/acquire suffices and no CAS
- [ ] Gateways to risk: a bounded MPMC ring with per-slot sequence numbers, which never allocates
- [ ] Its cost: it is not lock-free; a producer stalled after claiming a slot makes the consumer see it empty
- [ ] Shared queue: Michael–Scott, lock-free because any thread CASes a lagging `tail` forward, at one allocation per message
- [ ] Its freed nodes need safe reclamation: hazard pointers bound memory, epochs cost readers less but grow during stalls
