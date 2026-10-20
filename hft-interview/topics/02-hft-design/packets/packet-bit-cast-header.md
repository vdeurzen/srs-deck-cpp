---
id: packet-bit-cast-header
kind: code
version: 1
level: 3
tags: [packets, bit-cast, endianness, c++20, c++23]
input: chips
choices:
  c1:
    - "std::byteswap(std::bit_cast<Wire>(pkt).seq)"
    - "std::bit_cast<Wire>(pkt).seq"
    - "std::byteswap(reinterpret_cast<const Wire*>(pkt.data())->seq)"
    - "std::byteswap(std::bit_cast<std::uint32_t>(pkt))"
compile:
  harness: |
    static_assert(std::endian::native == std::endian::little);   // x86-64, where the app compiles
    constexpr std::array<unsigned char, 8> pkt{0x00, 0x08, 0x00, 0x41, 0x00, 0x01, 0x02, 0x03};
    static_assert(seq_of(pkt) == 0x00010203);
    int main() {}
requires:
  - packet-reinterpret-ub
refs:
  - https://en.cppreference.com/w/cpp/numeric/bit_cast
  - https://en.cppreference.com/w/cpp/numeric/byteswap
  - https://timsong-cpp.github.io/cppwp/n4950/bit.cast#1
elaborate: How would you write `seq_of` so it is also right on a big-endian host?
---

The feed sends every integer in network byte order (big-endian), and the
handler runs on x86-64. Complete `seq_of` so it returns the header's
sequence number.

```cpp
#include <array>
#include <bit>
#include <cstdint>
struct Wire { std::uint16_t len, type; std::uint32_t seq; };   // the 8-byte header
constexpr std::uint32_t seq_of(const std::array<unsigned char, 8>& pkt) {
  return {{c1::std\::byteswap(std\::bit_cast<Wire>(pkt).seq)}};
}
```

---

**Copy the bytes into a real `Wire` with `std::bit_cast`, then reverse the
field's byte order with `std::byteswap` (C++23).** `bit_cast` creates a
new object from the bytes, so there is no aliasing or alignment question.

- Without the swap, a little-endian host reads `00 01 02 03` as
  `0x03020100`.
- The `reinterpret_cast` gives a `Wire*` that points at no `Wire`:
  `pkt.data()` points to an `unsigned char`, and an `array<unsigned char, 8>` is only 1-aligned
  for a 4-aligned `Wire`. A constant expression rejects the cast.
- `bit_cast` requires equal sizes, so the 8-byte packet can't become a
  4-byte `uint32_t`.

Endianness and padding are implementation properties: x86-64 is little-endian and gives this `Wire` no padding.
