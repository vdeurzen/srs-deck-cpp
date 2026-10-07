---
id: sort-float-radix-key
kind: code
version: 1
level: 4
tags: [sorting, radix, bit-tricks]
input: chips
choices:
  c1:
    - "(u >> 31) ? 0xFFFF'FFFFu : 0x8000'0000u"
    - "0x8000'0000u"
    - "(u >> 31) ? 0x8000'0000u : 0xFFFF'FFFFu"
    - "0xFFFF'FFFFu"
compile:
  harness: |
    static_assert(radix_key(-1e30f) < radix_key(-2.0f));
    static_assert(radix_key(-2.0f) < radix_key(-1.0f));
    static_assert(radix_key(-1.0f) < radix_key(0.0f));
    static_assert(radix_key(0.0f) < radix_key(1.0f));
    static_assert(radix_key(1.0f) < radix_key(1.5f));
    static_assert(radix_key(1.5f) < radix_key(1e30f));
    int main() {}
requires:
  - sort-radix
elaborate: Signed 32-bit integers need only one of these two flips — which, and why do floats need the other?
refs:
  - https://en.cppreference.com/w/cpp/numeric/bit_cast
  - http://stereopsis.com/radix.html
---

Radix sort compares keys as unsigned integers. Complete the mask so
`radix_key` orders every float the way `<` does.

```cpp
#include <bit>
#include <cstdint>
constexpr std::uint32_t radix_key(float f) {
  const std::uint32_t u = std::bit_cast<std::uint32_t>(f);
  const std::uint32_t mask = {{c1::(u >> 31) ? 0xFFFF'FFFFu : 0x8000'0000u}};
  return u ^ mask;
}
```

---

IEEE 754 floats are sign-magnitude: for positives the bit pattern
already grows with the value, so setting the sign bit lifts them above
every negative. Negatives grow in magnitude as their bits grow, so their
order must be reversed: flip **all** bits. Flipping only the sign bit
leaves −2 above −1; the swapped mask breaks positives instead. One
consequence: `-0.0f` maps below `+0.0f`, though `<` calls them equal.
