---
id: foundations-bits-power-of-two
kind: code
version: 1
level: 2
tags: [bit-tricks]
requires:
  - foundations-bits-trace
input: chips
choices:
  c1: ["(x & (x - 1)) == 0", "(x & -x) == 0", "(x & (x + 1)) == 0", "x % 2 == 0"]
compile:
  harness: |
    static_assert(is_pow2(1));
    static_assert(is_pow2(64));
    static_assert(is_pow2(1u << 31));
    static_assert(!is_pow2(0));
    static_assert(!is_pow2(6));
    static_assert(!is_pow2(96));
    static_assert(!is_pow2(0xFFFF'FFFFu));
    int main() {}
refs:
  - https://en.cppreference.com/w/cpp/numeric/has_single_bit
  - https://graphics.stanford.edu/~seander/bithacks.html#DetermineIfPowerOf2
---

A power of two has exactly one set bit. Complete the test.

```cpp
#include <cstdint>

constexpr bool is_pow2(std::uint32_t x) {
  return x != 0 && {{c1::(x & (x - 1)) == 0}};
}
```

---

Clearing the lowest set bit leaves zero **only if it was the only one**.
The `x != 0` guard is needed because 0 has no set bit but survives the
same test.

This is the check behind every "capacity must be a power of two"
assertion — a ring buffer that indexes with `i & (cap − 1)`, an
allocator's alignment argument, a hash table that masks instead of
taking `%`. C++20 spells it `std::has_single_bit`.
