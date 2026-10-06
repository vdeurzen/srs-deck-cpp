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
---
A writer sets a plain `int payload` and then `ready.store(true,
release)`; a reader spins on `ready.load(acquire)` and then reads
`payload`. Walk through, in the standard's own terms, the chain of
guarantees that makes the read correct — and where that chain breaks if
both orders become `relaxed`.
---
- [ ] `payload = 42` is *sequenced before* the release store because they are in one thread, in program order
- [ ] The acquire load that ends the spin read the value the release store wrote, so the store *synchronizes with* that load; an acquire load that read `false` would synchronise with nothing
- [ ] *happens-before* is sequenced-before plus synchronizes-with, closed transitively, so the write of `payload` happens-before the read of `payload`
- [ ] Two conflicting accesses ordered by happens-before are not a data race, and the read sees the write it is ordered after: 42, on every platform
- [ ] With `relaxed` on either side nothing synchronizes, the two accesses conflict with no happens-before, and the program has undefined behaviour — not "may read 0" — even on x86, where it appears to work
