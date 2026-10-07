---
id: search-upper-bound-code
kind: code
version: 1
level: 3
tags: [binary-search, lower-bound]
requires:
  - search-bounds-trace
input: chips
choices:
  c1: ["a[mid] <= key", "a[mid] < key", "a[mid] >= key", "a[mid] > key"]
compile:
  harness: |
    inline constexpr int kV[] = {1, 3, 3, 3, 5, 8};
    static_assert(upper_index(kV, 3) == 4);   // just past the last 3
    static_assert(upper_index(kV, 4) == 4);
    static_assert(upper_index(kV, 0) == 0);
    static_assert(upper_index(kV, 8) == 6);
    int main() {}
refs:
  - https://en.cppreference.com/w/cpp/algorithm/upper_bound
---

Return the first index whose element is **greater than** `key`, the
`upper_bound` contract. Complete the test that moves `lo`.

```cpp
#include <span>

constexpr int upper_index(std::span<const int> a, int key) {
  int lo = 0, hi = (int)a.size();
  while (lo < hi) {
    int mid = lo + (hi - lo) / 2;
    if ({{c1::a[mid] <= key}}) lo = mid + 1;
    else hi = mid;
  }
  return lo;
}
```

---

**`lo` passes every element that is not greater than the key, equal ones
included.** That is the only difference from `lower_bound`, which passes
only elements strictly less (`a[mid] < key`) and so stops at the first
copy instead of after the last.
