---
id: str-simd-prefix-xor
kind: code
version: 1
level: 5
tags: [strings, simd, bit-tricks, parsing]
input: chips
choices:
  c1: ["m << s", "m >> s", "quotes << s", "m << 1"]
compile:
  harness: |
    static_assert(inside_string(0) == 0);
    static_assert(inside_string(0b100100) == 0b011100);
    static_assert(inside_string(0b1001'0010'0100) == 0b0111'0001'1100);
    static_assert(inside_string(1ULL | 1ULL << 63) == ~0ULL >> 1);
    static_assert(inside_string(0b1000) == ~0ULL << 3);   // unterminated
    int main() {}
requires:
  - str-simd-scanning
refs:
  - https://arxiv.org/abs/1902.08318
  - https://en.wikipedia.org/wiki/Prefix_sum
---

Bit `i` of `quotes` is set where byte `i` is an unescaped `"`. Complete
the loop so bit `i` of the result is the XOR of quote bits `0..i`:
set from an opening quote up to, not including, its closing quote.

```cpp
#include <cstdint>
constexpr std::uint64_t inside_string(std::uint64_t quotes) {
  std::uint64_t m = quotes;
  for (int s = 1; s < 64; s *= 2) m ^= {{c1::m << s}};
  return m;
}
```

---

A **prefix XOR** in six doubling steps: after the step with shift `s`,
bit `i` holds the XOR of the 2s bits ending at `i`. Each bit then says
"an odd number of quotes so far": inside a string. `m >> s` builds the
suffix XOR, `quotes << s` folds the original bits instead of the
partial sums, and a fixed `<< 1` never reaches far enough.

simdjson gets the same mask in one instruction, a carry-less multiply
by all ones, and uses it to blank out string contents before looking
for structural characters — no branch per quote.
