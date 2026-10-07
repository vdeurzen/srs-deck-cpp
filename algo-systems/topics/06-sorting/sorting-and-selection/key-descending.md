---
id: sort-key-descending
kind: code
version: 1
level: 5
tags: [sorting, databases, bit-tricks]
input: chips
choices:
  c1: ["~ts", "ts", "ts ^ 0x8000'0000u", "-ts"]
compile:
  harness: |
    static_assert(sort_key(-5, 1) < sort_key(3, 9));          // price ASC across sign
    static_assert(sort_key(3, 9) < sort_key(3, 1));           // ts DESC
    static_assert(sort_key(3, 1) < sort_key(3, 0));           // down to zero
    static_assert(sort_key(3, 0) < sort_key(4, 0xFFFF'FFFFu)); // price decides first
    int main() {}
requires:
  - sort-key-normalisation
refs:
  - https://dl.acm.org/doi/10.1145/1132960.1132964
  - https://en.cppreference.com/w/cpp/container/array/operator_cmp
---

`ORDER BY price ASC, ts DESC` as an 8-byte key compared byte by byte,
as `memcmp` would. The price half is done; complete the timestamp.

```cpp
#include <array>
#include <cstdint>
using u8 = std::uint8_t;
constexpr std::array<u8, 8> sort_key(std::int32_t price, std::uint32_t ts) {
  const std::uint32_t p = static_cast<std::uint32_t>(price) ^ 0x8000'0000u;
  const std::uint32_t t = {{c1::~ts}};
  return {u8(p >> 24), u8(p >> 16), u8(p >> 8), u8(p),     // big-endian:
          u8(t >> 24), u8(t >> 16), u8(t >> 8), u8(t)};    // first byte decides
}
```

---

Inverting every bit reverses an unsigned order exactly, so DESC is `~`.
The sign-bit flip is the *signed ascending* trick, not a reversal;
`-ts` reverses all values except 0, which stays the smallest.
Big-endian byte order is what makes a byte-wise compare agree with the
integer compare, and `std::array`'s `<` is that byte-wise compare.
