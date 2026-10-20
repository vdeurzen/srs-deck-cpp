---
id: bit-mask-enumerate-code
kind: code
version: 1
level: 2
tags: [bit-tricks, subsets, bitmask, lc-1863, lc-78]
input: chips
choices:
  c1: ["m >> i & 1", "m & i", "m >> i", "i >> m & 1"]
compile:
  harness: |
    static_assert(subset_xor_sum({1, 3}) == 6);                  // LC 1863, example 1
    static_assert(subset_xor_sum({5, 1, 6}) == 28);              // example 2
    static_assert(subset_xor_sum({3, 4, 5, 6, 7, 8}) == 480);    // example 3
    static_assert(subset_xor_sum({4}) == 4);
    int main() {}
requires:
  - bit-precedence-trap
  - bits-mask-as-set
  - cpp-essentials/vector-basics
  - cpp-essentials/constexpr-fn-static-assert
refs:
  - https://leetcode.com/problems/sum-of-all-subset-xor-totals/
  - https://leetcode.com/problems/subsets/
  - https://en.cppreference.com/w/cpp/language/operator_precedence
elaborate: The answer always equals the OR of all elements times 2ⁿ⁻¹. Why is each bit that some element has set in exactly half of the subsets' XORs?
---

Sum of All Subset XOR Totals (LC 1863): add up the XOR of every subset
of `nums` (the empty subset's XOR is 0; `n ≤ 12`). Each mask `m` from
0 to 2ⁿ − 1 is one subset. Complete the test for whether element `i`
is in it.

```cpp
#include <vector>
constexpr int subset_xor_sum(const std::vector<int>& a) {
  int n = a.size(), total = 0;
  for (int m = 0; m < (1 << n); ++m) {
    int x = 0;
    for (int i = 0; i < n; ++i) if ({{c1::m >> i & 1}}) x ^= a[i];
    total += x;
  }
  return total;
}
```

---

**`m >> i & 1`: bit `i` of the mask, shifted down and masked to 0 or 1.**
Bit `i` set means element `i` is in. 2ⁿ masks × n tests: O(n · 2ⁿ), no
recursion and no undo.

`m & i` tests against the index, not the bit `1 << i`. `m >> i` is
nonzero whenever any higher bit is set too. `i >> m & 1` swaps the
roles. `m & 1 << i` would also work: `<<` binds tighter than `&`.
