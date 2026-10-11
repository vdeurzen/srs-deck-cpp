---
id: linear-queue-adt
kind: basic
version: 1
level: 1
tags: [foundations, queues, adt]
requires:
  - linear-adt-vs-implementation
refs:
  - Cormen, Leiserson, Rivest, Stein, Introduction to Algorithms, 4th ed., §10.1 (stacks and queues)
  - https://en.cppreference.com/w/cpp/container/queue
---

## Print jobs A, B and C arrive, in that order, into a queue. The printer then takes one job from it. Which job?

---

**A: a queue hands out the oldest element still in it (first in, first out: FIFO).**

The ADT is `enqueue(x)` at the back, `dequeue()` from the front and
`front()` to read it. Arrival order is service order, which is what
makes it fair for jobs, packets or requests waiting their turn.
