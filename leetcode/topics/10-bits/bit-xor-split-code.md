---
id: bit-xor-split-code
kind: code
version: 1
level: 4
tags: [bit-tricks, xor, lowest-set-bit, lc-260]
input: chips
choices:
  c1:
    - "unsigned(d) & -unsigned(d)"
    - "unsigned(d & -d)"
    - "unsigned(d) & (unsigned(d) - 1)"
    - "unsigned(d) & 1u"
compile:
  harness: |
    #include <algorithm>
    constexpr std::array<int, 2> sorted(std::array<int, 2> p) { std::ranges::sort(p); return p; }
    static_assert(sorted(singles({1, 2, 1, 3, 2, 5})) == std::array{3, 5});       // LC 260, example 1
    static_assert(sorted(singles({-1, 0})) == std::array{-1, 0});                 // example 2
    static_assert(sorted(singles({2, 6, 7, 7})) == std::array{2, 6});             // same parity
    static_assert(sorted(singles({0, 9, -2147483647 - 1, 9})) == std::array{-2147483647 - 1, 0});
    int main() {}
requires:
  - interview-essentials/bit-xor-single-signal
  - interview-essentials/foundations-bits-lowest-set-bit
refs:
  - https://leetcode.com/problems/single-number-iii/
  - https://graphics.stanford.edu/~seander/bithacks.html
  - https://en.cppreference.com/w/cpp/language/operator_arithmetic#Overflows
elaborate: Any set bit of `d` would split the two numbers. Why reach for the lowest one rather than, say, the highest?
---

Single Number III (LC 260): return the two values of `nums` that appear
once; every other value appears twice, and
`-2^31 <= nums[i] <= 2^31 - 1`. XOR-ing everything leaves `d`, the XOR of
the two singles. Complete `bit`: the lowest set bit of `d`, safe at
`INT_MIN`.

```cpp
#include <array>
#include <vector>
constexpr std::array<int, 2> singles(const std::vector<int>& a) {
  int d = 0;
  for (int x : a) d ^= x;
  const auto bit = {{c1::unsigned(d) & -unsigned(d)}};
  std::array<int, 2> r{};
  for (int x : a) r[(unsigned(x) & bit) != 0] ^= x;
  return r;
}
```

---

**The lowest set bit of `d`, taken on `unsigned`.** A set bit of `d`
is a position where the two singles differ, so that bit splits the
array into two groups, each holding one single plus whole pairs; XOR
each group.

`d & -d` on `int` is the classic overflow: when `d` is `INT_MIN`,
`-d` does not exist, so it is undefined behaviour (and not a constant
expression). `d & (d - 1)` clears the low bit instead of isolating it,
which gives 0 when `d` is a power of two. Bit 0 only splits singles of
different parity.
