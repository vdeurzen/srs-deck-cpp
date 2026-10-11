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

## A lock-free stack CASes `{Node* head; uint64_t tag}` as one 16-byte unit instead of the bare head pointer. What does `tag` do that defeats ABA?

---

**It counts successful CASes, so a recycled pointer no longer compares
equal.** After three pops and pushes, `{A, 7}` is not the current `{A, 10}`.
The cost is a double-width CAS (`cmpxchg16b`): GCC does not report a
16-byte `std::atomic` as always lock-free, so `static_assert` it or the
"lock-free" stack hides a lock.
