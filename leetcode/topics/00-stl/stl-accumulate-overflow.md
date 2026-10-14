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
    static_assert(mean(std::vector<int>(50'000, 100'000)) == 100'000);
    static_assert(mean({1, 2, 6}) == 3);
    int main() {}
requires:
  - cpp-basics/stdalgo-accumulate-init
refs:
  - https://leetcode.com/problems/minimum-average-difference/
  - https://en.cppreference.com/w/cpp/algorithm/accumulate
elaborate: Before your next submission, which line of the constraints tells you whether a sum or a product fits in an `int`?
---

An LC 2256-style average: up to 10⁵ values, each up to 10⁵, so sums
reach 10¹⁰. The mean itself fits an `int`. Complete the call so it is
right for every such input.

```cpp
#include <numeric>
#include <vector>
constexpr int mean(const std::vector<int>& nums) {
  return std::accumulate(nums.begin(), nums.end(), {{c1::0LL}}) / std::ssize(nums);
}
```

---

**`0LL`: as in `stdalgo-accumulate-init`, the initial value's type is
the sum's type.** With `0` the sum is an `int` (max ≈ 2.1 × 10⁹) and
overflows: undefined behaviour, which the harness's constant evaluation
rejects. It overflows inside `accumulate`, before the division. `0u` wraps at 2³². `0L`
also works where `long` is 64-bit (Linux), not on Windows.
