---
id: ordered-lower-bound-loop
kind: code
version: 1
level: 3
tags: [binary-search, invariants]
input: chips
choices:
  c1: ["lo = mid + 1;", "lo = mid;", "hi = mid + 1;", "hi = mid - 1;"]
compile:
  harness: |
    inline constexpr int kData[] = {1, 3, 3, 5, 8, 13};
    static_assert(lower_index(kData, 0) == 0);
    static_assert(lower_index(kData, 1) == 0);
    static_assert(lower_index(kData, 3) == 1);   // first of the duplicates
    static_assert(lower_index(kData, 4) == 3);
    static_assert(lower_index(kData, 13) == 5);
    static_assert(lower_index(kData, 14) == 6);  // past the end
    int main() {}
requires:
  - algo-basics/search-binary-search-trace
refs:
  - https://en.cppreference.com/w/cpp/algorithm/lower_bound
  - https://en.wikipedia.org/wiki/Binary_search_algorithm#Procedure_for_finding_the_leftmost_element
---

Complete the loop so it returns the first index whose element is **not
less than** `key` — the `lower_bound` contract.

```cpp
#include <span>
constexpr std::size_t lower_index(std::span<const int> a, int key) {
  std::size_t lo = 0, hi = a.size();
  while (lo < hi) {
    const std::size_t mid = lo + (hi - lo) / 2;
    if (a[mid] < key) {{c1::lo = mid + 1;}}
    else hi = mid;
  }
  return lo;
}
```

---

**`a[mid] < key` puts `mid` in the left region, so `lo` moves past it.**
The invariant: `[0, lo)` is less than `key` and `[hi, n)` is not, so
the answer stays in `[lo, hi]` and the loop ends when the range is
empty. Otherwise `mid` may be the answer, so `hi = mid` keeps it.

`lo = mid` does not shrink the range when `hi == lo + 1` and loops
forever. `hi = mid - 1` discards a candidate (key 3 gives 0, not 1),
and at `mid == 0` wraps to `SIZE_MAX`. `hi = mid + 1` is in the wrong
branch entirely. `lo + (hi - lo) / 2` avoids the overflow of
`(lo + hi) / 2`.
