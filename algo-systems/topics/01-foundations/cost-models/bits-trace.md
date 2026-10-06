---
id: foundations-bits-trace
kind: trace
version: 1
level: 2
tags: [bit-tricks, tracing]
requires:
  - foundations-bits-lowest-set-bit
probes:
  1: { low: "8" }
  2: { rest: "96" }
  3: { ones: "3" }
  4: { k: "3", x: "0" }
refs:
  - https://graphics.stanford.edu/~seander/bithacks.html
  - https://en.cppreference.com/w/cpp/numeric/popcount
---

Give each value in decimal.

```cpp
#include <bit>
#include <cstdint>

int main() {
  std::uint32_t x = 0b0110'1000;                 // 104
  std::uint32_t low  = x & -x;                   // @1
  std::uint32_t rest = x & (x - 1);              // @2
  int ones = std::popcount(x);                   // @3
  int k = 0;
  while (x) { x &= x - 1; ++k; }                 // @4
}
```

---

The three bit tricks every bitset loop is built from:

- `x & -x` **isolates** the lowest set bit: `0000 1000` = 8.
- `x & (x − 1)` **clears** it: subtracting 1 flips that bit and the zeros
  below it, so the AND drops them — `0110 0000` = 96.
- `std::popcount` **counts** set bits (one `popcnt` instruction where the
  target has it).

The loop at @4 is popcount done by hand: it runs once per *set* bit, not
once per bit position, which is why the same `x &= x - 1` step drives
set-bit iteration in dataflow passes and bitmap indexes.

Verified by compiling and running an instrumented copy under GCC 16.2
(`g++ -std=c++23 -Wall -Wextra`).
