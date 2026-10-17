---
id: atomics-modification-order
kind: basic
version: 1
level: 1
tags: [concurrency, atomics, memory-model]
refs:
  - https://en.cppreference.com/w/cpp/atomic/atomic
  - https://eel.is/c++draft/intro.races
---

## What does `std::atomic<T>` guarantee about operations on *one* object, whatever `memory_order` they pass?

---

**Every operation is indivisible, and all writes to that object form a
single modification order every thread agrees on.**

So a load never sees a torn value, a read-modify-write (`fetch_add`,
`exchange`, `compare_exchange`) always acts on the latest value in that
order, and no increment is lost. Not promised: any ordering against
*other* objects — that is the `memory_order`'s job.
