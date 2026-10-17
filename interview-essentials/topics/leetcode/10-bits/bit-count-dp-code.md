---
id: bit-count-dp-code
kind: code
version: 1
level: 3
tags: [bit-tricks, dynamic-programming, popcount, lc-338]
input: chips
choices:
  c1: ["i & (i - 1)", "i >> 1", "i & -i", "i - 1"]
compile:
  harness: |
    #include <bit>
    static_assert(count_bits(2) == std::vector{0, 1, 1});               // LC 338, example 1
    static_assert(count_bits(5) == std::vector{0, 1, 1, 2, 1, 2});      // example 2
    static_assert(count_bits(0) == std::vector{0});
    constexpr bool matches_popcount() {
      auto v = count_bits(1000);
      for (unsigned i = 0; i <= 1000; ++i) if (v[i] != std::popcount(i)) return false;
      return true;
    }
    static_assert(matches_popcount());
    int main() {}
requires:
  - foundations-bits-trace
refs:
  - https://leetcode.com/problems/counting-bits/
  - https://graphics.stanford.edu/~seander/bithacks.html#CountBitsSetKernighan
  - https://en.cppreference.com/w/cpp/numeric/popcount
elaborate: "`ans[i >> 1] + (i & 1)` is the other O(n) recurrence. Which bit of `i` does each recurrence drop?"
---

LC 338: return the number of 1 bits of every `i` in `0..n`, in O(n)
and without a built-in popcount. Complete the index of the earlier
answer that `i` extends by one bit.

```cpp
#include <vector>
constexpr std::vector<int> count_bits(int n) {
  std::vector<int> ans(n + 1);
  for (int i = 1; i <= n; ++i) ans[i] = ans[{{c1::i & (i - 1)}}] + 1;
  return ans;
}
```

---

**`i & (i - 1)`: `i` with its lowest set bit cleared.** That number is
smaller than `i`, so its answer is already in the table, and it has
exactly one 1 bit fewer. Each entry costs one AND and one load: a DP
whose subproblem is a bit trick.

`i >> 1` drops the lowest bit *position*, which may be 0, so the `+ 1`
over-counts even `i`. `i & -i` keeps only the lowest bit; `i - 1` can
change many bits at once.
