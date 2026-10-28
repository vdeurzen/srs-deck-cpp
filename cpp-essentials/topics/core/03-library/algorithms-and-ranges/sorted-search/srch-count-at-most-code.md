---
id: srch-count-at-most-code
kind: code
version: 1
level: 3
tags: [algorithms, searching]
input: chips
choices:
  c1:
    - "std::upper_bound"
    - "std::lower_bound"
    - "std::find"
    - "std::binary_search"
compile:
  harness: |
    static_assert(count_at_most(7) == 5);
    static_assert(count_at_most(1) == 0);
    static_assert(count_at_most(9) == 5);
    static_assert(count_at_most(4) == 4);
    static_assert(count_at_most(5) == 4);
    int main() {}
requires:
  - srch-lower-bound-trace
  - constexpr-fn-static-assert
elaborate: Say how you would count the values of a sorted vector that lie in [a, b] with two such calls.
refs:
  - https://en.cppreference.com/w/cpp/algorithm/upper_bound
  - https://en.cppreference.com/w/cpp/algorithm/binary_search
---

Searching a sorted vector: *sort first · search · check the miss · read
the position*. Here `v` is sorted and a count needs no miss check.
Complete the search so `count_at_most(x)` returns how many values are
≤ `x`. (`std::binary_search` reports whether a value is present.)

```cpp
#include <algorithm>
#include <vector>
constexpr long count_at_most(int x) {
    std::vector<int> v{2, 4, 4, 4, 7};
    auto it = {{c1::std\::upper_bound}}(v.begin(), v.end(), x);
    return it - v.begin();
}
```

---

**`upper_bound` returns the first element greater than `x`; all before it are ≤ `x`.**
`lower_bound` stops at the first 4, so it misses the run of 4s (gives 1
for 4). `find` finds one equal element, or `end()` on a miss.
`binary_search` returns a `bool`, not a position.
