---
id: ll-aba-tagged-pointer
kind: basic
version: 1
level: 5
tags: [low-latency, lock-free, concurrency]
requires:
  - ll-aba-problem
  - cpp-core/atomics-lock-free-is-per-type
refs:
  - https://www.cs.rochester.edu/~scott/papers/1996_PODC_queues.pdf
  - https://en.cppreference.com/w/cpp/atomic/atomic/is_always_lock_free
---

## A lock-free stack CASes `{Node* head; uint64_t tag}` as one 16-byte unit, bumping `tag` on every successful CAS. Why does the stale ABA CAS now fail?

---

**The tag has moved on, so `{A, 7}` no longer equals the current
`{A, 10}`.** Three operations bumped it, even though the pointer came back.
The cost is a double-width CAS (`cmpxchg16b`): GCC does not report a
16-byte `std::atomic` as always lock-free, so `static_assert` it or the
"lock-free" stack hides a lock.
