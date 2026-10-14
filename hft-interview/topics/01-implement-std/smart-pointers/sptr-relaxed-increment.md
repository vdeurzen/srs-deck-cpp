---
id: sptr-relaxed-increment
kind: basic
version: 1
level: 4
tags: [smart-pointers, atomics, memory-model, implement-std]
requires:
  - sptr-refcount-orders
refs:
  - https://www.boost.org/doc/libs/release/libs/atomic/doc/html/atomic/usage_examples.html#boost_atomic.usage_examples.example_reference_counters
  - https://github.com/llvm/llvm-project/blob/main/libcxx/include/__memory/shared_count.h
  - https://github.com/gcc-mirror/gcc/blob/master/libstdc%2B%2B-v3/include/ext/atomicity.h
---

## Your `shared_ptr` copy constructor increments the strong count with `memory_order_relaxed`. Why is no stronger order needed?

---

**The source is a live owner, so the count is already ≥ 1 and can't
reach zero during the copy.** The increment publishes nothing and needs
to see nothing; ordering matters where the object may be deleted, at
the decrement. (`weak_ptr::lock` differs: it must refuse a zero count.)
libc++ and Boost.Atomic's example use `relaxed`; libstdc++ uses
`acq_rel`, stronger than needed.
