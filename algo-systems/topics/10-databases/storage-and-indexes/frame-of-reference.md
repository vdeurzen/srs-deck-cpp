---
id: db-frame-of-reference
kind: code
version: 1
level: 3
tags: [databases, compression, bits]
input: chips
choices:
  c1: ["std::bit_width(hi - lo)", "std::bit_width(hi)", "std::popcount(hi - lo)", "std::bit_width(hi - lo) + 1"]
compile:
  harness: |
    constexpr std::array<unsigned, 4> ts{1'000'000, 1'000'003, 1'000'017, 1'000'250};
    static_assert(bits_per_value(ts) == 8);
    constexpr std::array<unsigned, 4> ids{64, 65, 66, 67};
    static_assert(bits_per_value(ids) == 2);
    int main() {}
requires:
  - db-columnar-encodings
refs:
  - https://parquet.apache.org/docs/file-format/data-pages/encodings/
  - https://en.cppreference.com/w/cpp/numeric/bit_width
---

A column block is stored as its minimum `lo` plus each value's offset
from it, bit-packed at a fixed width. Complete the width.

```cpp
#include <algorithm>
#include <array>
#include <bit>
constexpr int bits_per_value(const std::array<unsigned, 4>& block) {
  const auto [lo, hi] = std::ranges::minmax(block);
  return {{c1::std\::bit_width(hi - lo)}};
}
```

---

**Enough bits for the largest offset, `hi − lo`, not for the raw values.**
Four timestamps near a million need 20 bits each raw, 8 as offsets:
frame of reference plus bit packing. The offset 0 for `lo` itself needs
no extra bit, and `popcount` counts set bits, not width.
