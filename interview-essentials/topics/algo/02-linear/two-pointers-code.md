---
id: linear-two-pointers-code
kind: code
version: 1
level: 2
tags: [two-pointers, arrays]
input: chips
choices:
  c1: ["if (s < target) ++lo; else --hi;", "if (s < target) --hi; else ++lo;", "if (a[lo] < a[hi]) ++lo; else --hi;", "if (s < target) ++hi; else --lo;"]
compile:
  harness: |
    #include <array>
    inline constexpr std::array kA{1, 3, 4, 6, 9, 11};
    static_assert(has_pair(kA, 13));    // 4 + 9
    static_assert(has_pair(kA, 7));     // 1 + 6 and 3 + 4
    static_assert(has_pair(kA, 20));    // 9 + 11
    static_assert(!has_pair(kA, 2));
    static_assert(!has_pair(kA, 21));
    int main() {}
elaborate: "Which other sorted-input problem lets one comparison discard a whole row of candidates, and which pointer moves there?"
refs:
  - https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/
requires:
  - linear-two-pointers-sorted-pair
  - stl-const-auto-param
---

Does the sorted array `a` hold two elements (at different positions)
that sum to `target`? Complete the step that moves an index when `s`
misses.

```cpp
constexpr bool has_pair(const auto& a, int target) {
  int lo = 0, hi = a.size() - 1;
  while (lo < hi) {
    int s = a[lo] + a[hi];
    if (s == target) return true;
    {{c1::if (s < target) ++lo; else --hi;}}
  }
  return false;
}
```

---

**Too small: drop the smaller end, because even its largest partner
falls short.** Moving `hi` down would only shrink the sum further and
can skip the real pair (7 = 1 + 6 is missed). Moving the smaller
*element* ignores the target entirely, and `++hi` runs off the end.

`while (lo < hi)` keeps the two positions distinct; each step moves one
pointer, so at most n − 1 steps.
