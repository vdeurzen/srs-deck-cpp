---
id: atomics-lock-free-is-per-type
kind: code
version: 1
level: 2
tags: [concurrency, atomics, lock-free]
input: chips
choices:
  c1: ["std::uint64_t", "std::array<std::uint64_t, 2>", "Rgb"]
compile:
  harness: |
    static_assert(std::atomic<Slot>::is_always_lock_free);
    int main() {}
requires:
  - atomics-modification-order
refs:
  - https://en.cppreference.com/w/cpp/atomic/atomic/is_always_lock_free
  - https://en.cppreference.com/w/cpp/atomic/atomic
---

A lock-free queue keeps one of these per slot. Complete the slot type
so the queue's `static_assert` on lock-freedom holds on x86-64 GCC.

```cpp
#include <array>
#include <atomic>
#include <cstdint>
struct Rgb { unsigned char r, g, b; };
using Slot = {{c1::std\::uint64_t}};
std::atomic<Slot> slot;
```

---

**Lock-freedom is a property of the type on a platform, not of
`std::atomic`.** Eight bytes is one instruction on x86-64. The other two
*compile* — any trivially copyable type can be atomic — but GCC reports
`is_always_lock_free == false` for them: a three-byte `Rgb` is not a
hardware size, and for sixteen bytes GCC gives no compile-time
guarantee (even with `-mcx16`; `libatomic` picks `cmpxchg16b` at run
time and falls back to a lock). `is_always_lock_free` is the
compile-time check to `static_assert` on; `is_lock_free()` is the
run-time one, and a "lock-free" structure built on an atomic that is
not is just a slower mutex.
