---
id: linear-two-pointers-code
kind: code
version: 1
level: 2
tags: [two-pointers, arrays]
requires:
  - linear-two-pointers-trace
input: chips
choices:
  c1: ["++lo;", "--hi;", "++hi;", "lo = hi;"]
compile:
  harness: |
    inline constexpr int kA[] = {1, 3, 4, 6, 9, 11};
    static_assert(has_pair(kA, 13));    // 4 + 9
    static_assert(has_pair(kA, 7));     // 1 + 6 and 3 + 4
    static_assert(has_pair(kA, 20));    // 9 + 11
    static_assert(!has_pair(kA, 2));
    static_assert(!has_pair(kA, 21));
    int main() {}
refs:
  - https://en.wikipedia.org/wiki/3SUM
---

Does a sorted array hold two elements (at different positions) that sum
to `target`? Complete the branch for a sum that is too small.

```cpp
#include <span>

constexpr bool has_pair(std::span<const int> a, int target) {
  int lo = 0, hi = (int)a.size() - 1;
  while (lo < hi) {
    int s = a[lo] + a[hi];
    if (s == target) return true;
    if (s < target) {{c1::++lo;}}
    else --hi;
  }
  return false;
}
```

---

**Too small: drop the smaller end, because even its largest partner
falls short.** Moving `hi` down would only shrink the sum further and
can skip the real pair (7 = 1 + 6 is missed).

`while (lo < hi)` keeps the two positions distinct; each step moves one
pointer, so at most n − 1 steps.
