---
id: uniq-dedupe-code
kind: code
version: 1
level: 3
tags: [algorithms, rearranging]
input: chips
choices:
  c1:
    - "v.erase(std::unique(v.begin(), v.end()), v.end());"
    - "std::unique(v.begin(), v.end());"
    - "v.erase(std::unique(v.begin(), v.end()));"
compile:
  harness: |
    constexpr bool check() {
      return count_distinct({2, 2, 5, 8, 8, 8}) == 3
          && count_distinct({1, 4, 6}) == 3
          && count_distinct({9, 9}) == 1
          && count_distinct({}) == 0;
    }
    static_assert(check());
    int main() {}
requires:
  - uniq-steps-cloze
  - constexpr-fn-static-assert
  - types-size-t
elaborate: Say how you would count distinct values without changing the caller's vector, and what that costs.
refs:
  - https://en.cppreference.com/w/cpp/algorithm/unique
  - https://en.cppreference.com/w/cpp/container/vector/erase
---

`v` arrives sorted ascending, so the first step of sort · unique · erase
the tail is done. Complete the statement that dedupes `v` in place, so
that `v.size()` is the number of distinct values.

```cpp
#include <algorithm>
#include <cstddef>
#include <vector>

constexpr std::size_t count_distinct(std::vector<int> v) {
    {{c1::v.erase(std\::unique(v.begin(), v.end()), v.end());}}
    return v.size();
}
```

---

**`erase(new end, v.end())` cuts the whole unspecified tail `unique` leaves.**
`unique` alone keeps the size, so every duplicate is still counted. With
one argument, `erase` removes a single element at the new end, so only one
leftover goes.
