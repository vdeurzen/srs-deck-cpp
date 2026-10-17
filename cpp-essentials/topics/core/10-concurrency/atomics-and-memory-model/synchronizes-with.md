---
id: atomics-synchronizes-with
kind: basic
version: 1
level: 2
tags: [concurrency, atomics, memory-model]
requires:
  - atomics-modification-order
  - threads-data-race-is-ub
refs:
  - https://en.cppreference.com/w/cpp/atomic/memory_order
  - https://eel.is/c++draft/atomics.order
---

## Thread A does a release store, thread B an acquire load, on the same atomic. What one condition makes the store *synchronize with* the load?

---

**B's load must read the value A's store wrote** (or a later value in
that store's release sequence).

Then everything sequenced before the release in A *happens-before*
everything sequenced after the acquire in B, plain writes included.
The orders alone pair nothing; the value read does. A load that still
sees the old value does not synchronise with *this* store.
