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

SPSC producer: load its own `tail` `relaxed`, load `head`, write the
slot as a plain store, then store `tail + 1` with
{{c1::release::a memory order}}, so a consumer that sees the new `tail`
also sees the slot's contents. The producer's `acquire` load of `head`
does two jobs: it shows free space, and it orders the consumer's
earlier {{c2::read::which access of the consumer's?}} of the slot before
the producer's overwrite of it, which would otherwise be a data race.

---

The `head` load is `acquire`, pairing with the consumer's release of
`head`; the `tail` store pairs with the consumer's acquire of `tail`.
Relaxed suffices for your own counter: you are its only writer, and
coherence makes your own last store visible to you. Two release/acquire
pairs in all, one per direction, each carrying the data written just
before it. (c2: "load" is the same answer.) The consumer is the mirror image.
