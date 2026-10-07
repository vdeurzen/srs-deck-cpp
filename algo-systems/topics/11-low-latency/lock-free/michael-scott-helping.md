---
id: ll-michael-scott-helping
kind: basic
version: 1
level: 5
tags: [low-latency, lock-free, queues, concurrency]
requires:
  - ll-mpmc-queue
  - ll-progress-ladder
refs:
  - https://www.cs.rochester.edu/~scott/papers/1996_PODC_queues.pdf
---

## In the Michael–Scott linked queue, an enqueuer finds `tail->next` non-null: another producer linked a node but has not yet swung `tail`. What does it do?

---

**It CASes `tail` forward to that node itself, then retries.** This
*helping* means a producer descheduled between its two CASes cannot stall
anyone, which makes the queue lock-free. The price is a node allocation
per element, and therefore the reclamation problem.
