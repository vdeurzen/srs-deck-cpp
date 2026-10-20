---
id: stl-accumulate-overflow
kind: code
version: 1
level: 2
tags: [stl, integers, lc-2256]
input: chips
choices:
  c1:
    - "0LL"
    - "0"
    - "0u"
compile:
  harness: |
    static_assert(total(std::vector<int>(50'000, 100'000)) == 5'000'000'000LL);
    static_assert(total({1, 2, 6}) == 9);
    int main() {}
requires:
  - stl-accumulate-init-type
  - cpp-essentials/types-overflow-rules
  - stl-const-auto-param
refs:
  - https://leetcode.com/problems/minimum-average-difference/
  - https://en.cppreference.com/w/cpp/algorithm/accumulate
elaborate: Before your next submission, which line of the constraints tells you whether a sum or a product fits in an `int`?
---

Minimum Average Difference (LC 2256) averages prefixes and suffixes of
`nums`: up to 10⁵ values, each up to 10⁵, so sums reach 10¹⁰. The
suffix `LL` makes a literal a 64-bit `long long`. Complete the call so
`total` is right for every such input.

```cpp
#include <numeric>
#include <vector>
constexpr long long total(const std::vector<int>& nums) {
  return std::accumulate(nums.begin(), nums.end(), {{c1::0LL}});
}
```

---

**`0LL`: `accumulate` adds in the type of `init`, so `init` sets the
sum's type.** With `0` the sum is an `int` (max ≈ 2.1 × 10⁹) and
overflows inside `accumulate`, before the return widens it: undefined
behaviour. `0u` wraps
at 2³². `0L` works where `long` is 64-bit (Linux), not on Windows.
