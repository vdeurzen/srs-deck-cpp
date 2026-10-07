---
id: search-ship-capacity-code
kind: code
version: 1
level: 3
tags: [binary-search, search-on-answer]
requires:
  - search-on-answer-monotone
input: chips
choices:
  c1: ["hi = mid;", "lo = mid + 1;", "hi = mid - 1;", "lo = mid;"]
compile:
  harness: |
    inline constexpr int kW[] = {3, 2, 2, 4, 1, 4};
    static_assert(min_capacity(kW, 3) == 6);   // [3,2] [2,4] [1,4]
    static_assert(min_capacity(kW, 1) == 16);
    static_assert(min_capacity(kW, 6) == 4);
    int main() {}
refs:
  - https://en.cppreference.com/w/cpp/algorithm/partition_point
---

Find the smallest capacity that ships the packages, in order, within
`days`. `fits` is monotone in `cap`. Complete the branch taken when
`mid` fits.

```cpp
#include <span>

constexpr bool fits(std::span<const int> w, int days, int cap) {
  int used = 1, load = 0;
  for (int x : w) { if (load + x > cap) { ++used; load = 0; } load += x; }
  return used <= days;
}
constexpr int min_capacity(std::span<const int> w, int days) {
  int lo = 0, hi = 0;
  for (int x : w) { lo = lo > x ? lo : x; hi += x; }   // [heaviest, total]
  while (lo < hi) {
    int mid = lo + (hi - lo) / 2;
    if (fits(w, days, mid)) {{c1::hi = mid;}} else lo = mid + 1;
  }
  return lo;
}
```

---

**A capacity that fits might be the answer, so `hi` keeps it.** One that
does not fit is ruled out with everything smaller, so `lo` moves past it.
It is the lower-bound loop with `fits` in place of `a[mid] >= key`.

The range starts at the heaviest package (anything less cannot carry
it) and ends at the total (one day). Cost: O(n · log(total)).
