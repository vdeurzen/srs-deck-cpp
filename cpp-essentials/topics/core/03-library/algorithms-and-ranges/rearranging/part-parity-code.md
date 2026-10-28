---
id: part-parity-code
kind: code
version: 1
level: 3
tags: [algorithms, rearranging]
input: chips
choices:
  c1:
    - "std::partition"
    - "std::remove_if"
    - "std::find_if"
compile:
  harness: |
    constexpr bool check(std::vector<int> in) {
        auto out = evens_first(in);
        auto is_even = [](int x) { return x % 2 == 0; };
        auto a = in;
        auto b = out;
        std::sort(a.begin(), a.end());
        std::sort(b.begin(), b.end());
        return a == b && std::is_partitioned(out.begin(), out.end(), is_even);
    }
    static_assert(check({3, 8, 5, 6, 2}));
    static_assert(check({4, 7, 4}));
    static_assert(check({1, 3}));
    static_assert(check({}));
    int main() {}
requires:
  - part-partition-trace
  - constexpr-fn-static-assert
elaborate: Say which other problem splits a vector into two groups in place, and which test you would pass.
refs:
  - https://en.cppreference.com/w/cpp/algorithm/partition
  - https://leetcode.com/problems/sort-array-by-parity/
---

Sort Array By Parity: put every even value before every odd one, any
order within each group. Complete the call.

```cpp
#include <algorithm>
#include <vector>
constexpr std::vector<int> evens_first(std::vector<int> v) {
    auto is_even = [](int x) { return x % 2 == 0; };
    {{c1::std\::partition}}(v.begin(), v.end(), is_even);
    return v;
}
```

---

**`partition` reorders the values so the evens come first, keeping every value.**
`remove_if(is_even)` packs the *odds* forward and leaves leftovers behind
them, so values are lost. `find_if` only finds the first even; `v` stays
unchanged.
