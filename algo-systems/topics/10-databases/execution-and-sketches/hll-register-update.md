---
id: db-hll-register-update
kind: code
version: 1
level: 4
tags: [databases, sketches, probabilistic, bits]
input: chips
choices:
  c1: ["std::max(reg[i], rank)", "rank", "std::min(reg[i], rank)", "std::uint8_t(reg[i] + 1)"]
compile:
  harness: |
    constexpr Registers r = [] {
      Registers r{};
      add(r, 0x3040'0000u);    // register 3, rank 6
      add(r, 0x3040'0000u);    // the same value again
      add(r, 0x3800'0000u);    // register 3, rank 1
      add(r, 0x7000'1000u);    // register 7, rank 16
      return r;
    }();
    static_assert(r[3] == 6 && r[7] == 16 && r[0] == 0);
    int main() {}
requires:
  - db-hyperloglog
refs:
  - http://algo.inria.fr/flajolet/Publications/FlFuGaMe07.pdf
  - https://en.cppreference.com/w/cpp/numeric/countl_zero
---

A HyperLogLog with 16 registers. A hash's first 4 bits pick the
register; `rank` is the position of the first 1-bit in the remaining
bits. Complete the update.

```cpp
#include <algorithm>
#include <array>
#include <bit>
#include <cstdint>
using Registers = std::array<std::uint8_t, 16>;
constexpr void add(Registers& reg, std::uint32_t hash) {
  const unsigned i = hash >> 28;
  const auto rank = std::uint8_t(std::countl_zero(hash << 4) + 1);
  reg[i] = {{c1::std\::max(reg[i], rank)}};
}
```

---

**Each register keeps the largest rank it has seen.** That makes an
update idempotent, so the repeated hash changes nothing, and order
independent: a later, shorter run cannot erase evidence of a longer one.
Overwriting with the newest rank forgets the 6; counting arrivals
counts duplicates.
