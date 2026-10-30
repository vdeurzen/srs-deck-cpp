---
id: atomics-explain-publish-with-flag
kind: explain
version: 3
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
why the reader is guaranteed to get the writer's value.
---
- [ ] Two threads touch plain `payload`, one writing; without ordering that would be a data race
- [ ] The acquire load that reads the release store's value synchronizes with that store
- [ ] A load that still reads the old `false` pairs with nothing, which is why the reader spins until `true`
- [ ] So everything before the store happens before everything after the load: the reader sees 42
- [ ] With `relaxed` on either side nothing synchronizes, so reading `payload` is a data race
