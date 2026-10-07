---
id: ordered-art-key-bytes
kind: code
version: 1
level: 5
tags: [tries, databases, bit-tricks]
requires:
  - ordered-adaptive-radix-tree
input: chips
choices:
  c1:
    - "std::bit_cast<std::uint32_t>(x) ^ 0x8000'0000u"
    - "std::bit_cast<std::uint32_t>(x)"
    - "std::bit_cast<std::uint32_t>(~x)"
    - "std::bit_cast<std::uint32_t>(x) ^ 0x0000'0080u"
compile:
  harness: |
    #include <climits>
    constexpr bool before(std::int32_t a, std::int32_t b) {
      return key_bytes(a) < key_bytes(b);          // lexicographic, byte by byte
    }
    static_assert(before(INT_MIN, -1000));
    static_assert(before(-2, -1));
    static_assert(before(-1, 0));
    static_assert(before(0, 1));
    static_assert(before(255, 256));
    static_assert(before(1000, INT_MAX));
    int main() {}
refs:
  - https://db.in.tum.de/~leis/papers/ART.pdf
  - https://en.cppreference.com/w/cpp/numeric/bit_cast
---

A radix tree compares keys byte by byte, most significant first. Complete
the encoding so that comparing the bytes of two `int32_t` keys gives the
same order as comparing the integers.

```cpp
#include <array>
#include <bit>
#include <cstdint>

constexpr std::array<std::uint8_t, 4> key_bytes(std::int32_t x) {
  const std::uint32_t u = {{c1::std\::bit_cast<std\::uint32_t>(x) ^ 0x8000'0000u}};
  return {std::uint8_t(u >> 24), std::uint8_t(u >> 16),   // big-endian
          std::uint8_t(u >> 8), std::uint8_t(u)};
}
```

---

Big-endian byte order makes unsigned bytes compare like unsigned
integers. Two's complement then puts negatives *above* positives as
unsigned (`-1` is `0xFFFFFFFF`), so flipping the sign bit shifts the
whole range: `INT_MIN` becomes `0`, `-1` becomes `0x7FFFFFFF`, `0`
becomes `0x80000000`. The raw cast sorts `-1` after `0`; `~x` reverses
the order; flipping bit 7 fixes nothing. This is the same binary-comparable
key a column store or a sort's key normalisation builds, so `memcmp` can
replace a typed comparator.
