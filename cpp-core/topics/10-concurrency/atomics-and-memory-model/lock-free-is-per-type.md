---
id: atomics-lock-free-is-per-type
kind: code
version: 1
level: 2
tags: [concurrency, atomics, lock-free]
input: chips
choices:
  c1: ["std::uint64_t", "long double", "std::array<std::uint64_t, 2>", "Rgb", "Xyz"]
compile:
  harness: |
    static_assert(std::atomic<Slot>::is_always_lock_free);
    int main() {}
requires:
  - cpp-essentials/atomics-modification-order
  - cpp-essentials/conc-atomic-or-mutex
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
struct Xyz { float x, y, z; };
using Slot = {{c1::std\::uint64_t}};
std::atomic<Slot> slot;
```

---

**Lock-freedom is a property of the type on a platform, not of
`std::atomic`.** Every choice compiles, since any trivially copyable type
can be atomic, but GCC on x86-64 sets `is_always_lock_free` only for the
8-byte `uint64_t`: 3, 12 and 16 bytes (`long double` included) get no
guarantee. `is_always_lock_free` is the compile-time check to
`static_assert`; `is_lock_free()` asks at run time.
