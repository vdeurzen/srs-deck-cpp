---
id: qry-spread-code
kind: code
version: 1
level: 3
tags: [algorithms, extremes]
input: chips
choices:
  c1:
    - "*hi - *lo"
    - "hi - lo"
    - "*lo - *hi"
compile:
  harness: |
    static_assert(spread({4, 9, 1}) == 8);
    static_assert(spread({2, 6, 3}) == 4);
    static_assert(spread({5, 5}) == 0);
    int main() {}
requires:
  - qry-empty-range
  - structured-bindings-basics
  - constexpr-fn-static-assert
elaborate: Say what `spread` must do first if `v` may be empty, and why.
refs:
  - https://en.cppreference.com/w/cpp/algorithm/minmax_element
---

`std::minmax_element` returns a pair of iterators: to the smallest
element and to the largest. `v` is never empty. Complete `spread` so it
returns the largest value minus the smallest.

```cpp
#include <algorithm>
#include <vector>
constexpr int spread(std::vector<int> v) {
    auto [lo, hi] = std::minmax_element(v.begin(), v.end());
    return {{c1::*hi - *lo}};
}
```

---

**`*hi` and `*lo` read the values; the iterators only say where they are.**
`hi - lo` is the distance between their positions (−1 for `{4, 9, 1}`),
not the gap between values. `*lo - *hi` has the sign reversed. Both ends
come from one pass over `v`, not two.
