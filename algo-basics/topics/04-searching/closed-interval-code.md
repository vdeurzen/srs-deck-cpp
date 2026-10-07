---
id: search-closed-interval-code
kind: code
version: 1
level: 3
tags: [binary-search, invariants]
requires:
  - search-half-open-invariant
input: chips
choices:
  c1: ["hi = mid - 1;", "hi = mid;", "lo = mid - 1;", "hi = mid + 1;"]
compile:
  harness: |
    inline constexpr int kA[] = {2, 5, 8, 12, 17};
    static_assert(find(kA, 2) == 0);
    static_assert(find(kA, 12) == 3);
    static_assert(find(kA, 17) == 4);
    static_assert(find(kA, 1) == -1);
    static_assert(find(kA, 9) == -1);
    static_assert(find(kA, 20) == -1);
    int main() {}
refs:
  - https://en.wikipedia.org/wiki/Binary_search_algorithm
---

This binary search keeps the answer in the **closed** range `[lo, hi]`
and returns as soon as it sees the key. Complete the branch for a middle
element that is too big.

```cpp
#include <span>

constexpr int find(std::span<const int> a, int key) {   // index or -1
  int lo = 0, hi = (int)a.size() - 1;
  while (lo <= hi) {
    int mid = lo + (hi - lo) / 2;
    if (a[mid] == key) return mid;
    if (a[mid] < key) lo = mid + 1;
    else {{c1::hi = mid - 1;}}
  }
  return -1;
}
```

---

**In a closed range `hi` is still a candidate, so a ruled-out `mid` must
be excluded with `mid - 1`.** In the half-open form `hi` is already
outside the range, so `hi = mid` is what excludes it.

Mixing the two conventions is the classic bug: with `hi = mid` here,
`lo == hi == mid` never shrinks, and looking up 1 loops forever.
