---
id: atomics-synchronizes-with
kind: basic
version: 1
level: 2
tags: [concurrency, atomics, memory-model]
requires:
  - atomics-memory-order-intro
  - threads-data-race-is-ub
refs:
  - https://en.cppreference.com/w/cpp/atomic/memory_order
  - https://eel.is/c++draft/atomics.order
elaborate: In a hand-off you have written or seen, name the atomic load that pairs with the store, and what B would be allowed to see if it read the old value.
---

## Thread A does a release store, thread B an acquire load, on the same atomic. What one condition makes the store *synchronize with* the load?

---

**B's load must read the value A's store wrote.**

Then everything A did before the release happens before everything B
does after the acquire, plain writes included.
The orders alone pair nothing; the value read does. A load that still
sees the old value does not synchronise with *this* store.
