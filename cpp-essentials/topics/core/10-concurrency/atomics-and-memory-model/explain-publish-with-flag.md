---
id: atomics-explain-publish-with-flag
kind: explain
version: 1
level: 3
tags: [concurrency, atomics, memory-model]
requires:
  - atomics-trace-message-passing
refs:
  - https://eel.is/c++draft/intro.races
  - https://en.cppreference.com/w/cpp/atomic/memory_order
elaborate: Where else have you handed data from one thread to another, and which operation played the role of the release store there?
---
A writer sets a plain `int payload`, then calls `ready.store(true,
release)`; a reader spins (loops re-reading `ready`) on
`ready.load(acquire)`, then reads `payload`. Explain to an interviewer
why the reader is guaranteed to get the writer's value.
---
- [ ] Problem: two threads touch plain `payload`, one writing; without ordering that is a data race
- [ ] Mechanism: the acquire load that reads the release store's value synchronizes with that store
- [ ] Example: the write precedes the store and the read follows the load, so the reader sees 42
- [ ] Cost: the reader must spin until a load reads `true`; only that load synchronizes
- [ ] Pitfall: with `relaxed` on either side nothing synchronizes, so reading `payload` is a data race
