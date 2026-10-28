---
id: sel-median-code
kind: code
version: 1
level: 3
tags: [algorithms, rearranging]
input: chips
choices:
  c1:
    - "v.begin() + v.size() / 2"
    - "v.size() / 2"
    - "v.begin() + v.size() / 2 - 1"
    - "v.end() - 1"
compile:
  harness: |
    static_assert(median({9, 2, 7, 4, 5}) == 5);
    static_assert(median({6, 1, 9, 3, 7, 2, 8}) == 6);
    static_assert(median({1, 1, 8}) == 1);
    static_assert(median({3}) == 3);
    int main() {}
requires:
  - sel-top-three-ordered
  - constexpr-fn-static-assert
  - types-size-t
elaborate: Say how you would get the median of an even-size vector with the same call.
refs:
  - https://en.cppreference.com/w/cpp/algorithm/nth_element
---

`v` has an odd number of values. Complete the position so `median`
returns the middle value of sorted order without sorting `v`.

```cpp
#include <algorithm>
#include <vector>
constexpr int median(std::vector<int> v) {
    auto mid = {{c1::v.begin() + v.size() / 2}};
    std::nth_element(v.begin(), mid, v.end());
    return *mid;
}
```

---

**The middle index is `v.size() / 2`, and `nth_element` takes it as a position.**
`v.size() / 2` alone is a `std::size_t`, not an iterator, so it doesn't
compile. `- 1` selects the value just below the middle. `v.end() - 1`
selects the largest.
