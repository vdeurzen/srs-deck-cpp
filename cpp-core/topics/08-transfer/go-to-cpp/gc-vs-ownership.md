---
id: transfer-gc-vs-ownership
kind: basic
version: 1
level: 2
tags: [transfer, misconception, ownership]
elaborate: In Go you can hand a pointer to three different goroutines and never think about who frees it. Name the one C++ owner-tracking tool that gets closest to that experience, and what it costs you that Go's GC does not.
refs:
  - https://en.cppreference.com/w/cpp/memory/new/operator
  - https://en.cppreference.com/w/cpp/memory/unique_ptr
---

## True or false: `new SomeType()` in C++ is roughly equivalent to Go's `new(SomeType)` — the runtime tracks it and reclaims it once nothing points to it anymore.

---

**False**, and this is one of the most expensive misconceptions to carry
over from Go. Go's `new` allocates memory the garbage collector will
scan, track, and eventually reclaim once nothing reachable references
it — the programmer never calls a matching "free". C++ has no garbage
collector: `new SomeType()` allocates and hands back a raw, owning
pointer that **nothing reclaims automatically**. If that pointer is
dropped, leaked into an unreachable local, or simply never `delete`d,
the memory is gone for the life of the program. C++ ownership has to be
tracked explicitly — by a `std::unique_ptr` or `std::shared_ptr`, by a
container that owns its elements, or by hand — and "I'll just `new` it
and let something clean it up later" has no "something" waiting to help.
