---
id: chunks-iterate-set-bits
kind: chunk
version: 1
level: 3
tags: [idioms, bit-tricks, compilers]
expose_ms: 6000
compile:
  harness: |
    static_assert(sum_members(0, 0) == 0);
    static_assert(sum_members(0b1011, 0) == 0 + 1 + 3);
    static_assert(sum_members(0b1011, 64) == 64 * 3 + 0 + 1 + 3);
    static_assert(sum_members(1ULL << 63, 128) == 128 + 63);
    static_assert(sum_members(~0ULL, 0) == 64 * 63 / 2);
    int main() {}
requires:
  - graph-iterate-set-bits
  - foundations-bits-trace
refs:
  - https://en.cppreference.com/w/cpp/numeric/countr_zero
  - https://graphics.stanford.edu/~seander/bithacks.html
---

```cpp
#include <bit>
constexpr int sum_members(unsigned long long word, int base) {
  int sum = 0;
  for (; word != 0; word &= word - 1)
    sum += base + std::countr_zero(word);
  return sum;
}
```

---

Visiting the members of one word of a bit set: **once per set bit**,
not once per position. `std::countr_zero` (`tzcnt`) finds the lowest
member; the loop step `word &= word - 1` clears it. `base` is
`64 * w` for word `w` of a larger set.

Without the idiom, `for (i = 0; i < 64; ++i) if (word >> i & 1)` runs
64 iterations with an unpredictable branch each, however sparse the set.
This is the inner loop of dataflow passes, BFS frontiers and bitmap
indexes. Compile-checked: the harness sums member indices.
