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
  - ordered-binary-search-trace
refs:
  - https://en.cppreference.com/w/cpp/algorithm/lower_bound
  - https://en.wikipedia.org/wiki/Binary_search_algorithm#Procedure_for_finding_the_leftmost_element
---

Complete the loop so it returns the first index whose element is **not
less than** `key` — the `lower_bound` contract.

```cpp
#include <cstddef>
#include <span>

constexpr std::size_t lower_index(std::span<const int> a, int key) {
  std::size_t lo = 0, hi = a.size();
  while (lo < hi) {
    const std::size_t mid = lo + (hi - lo) / 2;
    if (a[mid] < key)
      {{c1::lo = mid + 1;}}
    else
      hi = mid;
  }
  return lo;
}
```

---

The invariant is the whole card: **`[0, lo)` is known to be less than
`key`, and `[hi, n)` is known to be not less than it**, so the answer is
always in `[lo, hi]` and the loop ends when the range is empty. Once
that is stated, each branch writes itself — `a[mid] < key` proves
`mid` belongs to the left region, so `lo` moves *past* it; otherwise
`mid` might itself be the answer, so `hi = mid` keeps it in range.

The two classic bugs are both visible in the invariant. `lo = mid` does
not shrink the range when `hi == lo + 1` and loops forever; `hi = mid −
1` discards a candidate and returns an index one too *small* for some
inputs (key 3 gives 0, not 1) — and when `mid` is 0 it wraps `hi` round
to `SIZE_MAX`, sending the next probe out of bounds. And `mid = lo + (hi − lo) / 2` rather than `(lo + hi) / 2`
avoids overflow — famously the bug that sat in the JDK's binary search
for nine years.

Three details worth keeping. The result is where the key **would be
inserted**, so it doubles as an insertion point and needs a separate
`a[i] == key` check to answer "is it present". `upper_bound` is the same
loop with `!(key < a[mid])` as the condition. And the standard library's
version takes the comparison as a parameter and works on any forward
range, at the cost of O(n) *steps* (though still O(log n) comparisons)
on non-random-access iterators — which is why `std::set::find` exists
rather than calling `std::lower_bound` on a `set`.
