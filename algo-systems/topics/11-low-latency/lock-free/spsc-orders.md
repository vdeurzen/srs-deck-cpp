---
id: ll-spsc-orders
kind: cloze
version: 1
level: 5
tags: [low-latency, lock-free, queues, memory-model]
requires:
  - ll-spsc-ring
refs:
  - https://en.cppreference.com/w/cpp/atomic/memory_order
  - https://eel.is/c++draft/intro.races
---

SPSC producer: load its own `tail` `relaxed`, load `head` `acquire`,
write the slot as a plain store, then store `tail + 1` with
{{c1::release::a memory order}}, so the slot's contents happen-before
any consumer read that follows its acquire of `tail`. The producer's
acquire of `head` is not about seeing space: it orders the consumer's
earlier {{c2::read of the slot::an access to the ring}} before the
producer's overwrite of it, which would otherwise be a data race.

---

Relaxed suffices for your own counter: you are its only writer, and
coherence makes your own last store visible to you. Two release/acquire
pairs in all, one per direction, each carrying the data written just
before it. The consumer is the mirror image.
