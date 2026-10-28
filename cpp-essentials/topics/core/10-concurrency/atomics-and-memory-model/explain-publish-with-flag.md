---
id: atomics-explain-publish-with-flag
kind: explain
version: 2
level: 3
tags: [concurrency, atomics, memory-model]
requires:
  - threads-data-race-is-ub
  - atomics-synchronizes-with
  - atomics-trace-message-passing
  - atomics-default-order
  - atomics-handoff-relaxed-store
refs:
  - https://eel.is/c++draft/intro.races
  - https://en.cppreference.com/w/cpp/atomic/memory_order
elaborate: Where else have you handed data from one thread to another, and which operation played the role of the release store there?
---
A writer sets a plain `int payload = 42`, then calls `ready.store(true,
release)`; a reader spins (loops re-reading `ready`) on
`ready.load(acquire)`, then reads `payload`. Explain to an interviewer
why the reader is guaranteed to get the writer's value, and why these two
memory orders rather than others.
---
- [ ] Problem: two threads touch plain `payload`, one writing; without ordering that is a data race
- [ ] Mechanism: the acquire load that reads the release store's value synchronizes with that store
- [ ] Example: the write precedes the store and the read follows the load, so the reader sees 42
- [ ] Cost: acquire/release is cheaper than the default sequentially consistent order, but the reader waits for the flag
- [ ] Pitfall: with `relaxed` on either side nothing synchronizes, so reading `payload` is a data race
