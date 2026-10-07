---
id: graph-iterate-set-bits
kind: code
version: 1
level: 4
tags: [bitsets, bit-tricks, compilers, graphs]
input: chips
choices:
  c1: ["word - 1", "word + 1", "~word", "word >> 1"]
compile:
  harness: |
    static_assert(sum_of_indices(0) == 0);
    static_assert(sum_of_indices(0b1011) == 0 + 1 + 3);
    static_assert(sum_of_indices(0b1000'0000) == 7);
    static_assert(sum_of_indices(~0ULL) == 64 * 63 / 2);
    static_assert(sum_of_indices(1ULL << 63) == 63);
    int main() {}
requires:
  - graph-bitset-graphs
refs:
  - https://en.cppreference.com/w/cpp/numeric/countr_zero
  - https://graphics.stanford.edu/~seander/bithacks.html
---

Walking the members of a bit set, one instruction per member.
Complete the step that clears the bit just visited.

```cpp
#include <bit>
#include <cstdint>

constexpr int sum_of_indices(std::uint64_t word) {
  int total = 0;
  while (word) {
    total += std::countr_zero(word);
    word &= {{c1::word - 1}};
  }
  return total;
}
```

---

`x & (x − 1)` clears the **lowest set bit**: subtracting one flips that
bit to 0 and every bit below it to 1, so the AND keeps only what is
above. With `std::countr_zero` (`tzcnt`) the loop runs once per *set*
bit, not once per position. `word + 1`, `~word` and `word >> 1` keep
the visited bit or drop the wrong one.

Keep it on unsigned types: `1 << 63` on a signed `int` is undefined
behaviour; `1ULL << 63` is what you meant.
