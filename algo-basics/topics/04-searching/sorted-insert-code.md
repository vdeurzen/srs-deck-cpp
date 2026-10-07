---
id: search-sorted-insert-code
kind: code
version: 1
level: 2
tags: [binary-search, lower-bound]
requires:
  - search-lower-bound-meaning
  - linear-array-insert-shift
input: chips
choices:
  c1: ["std::lower_bound(v.begin(), v.end(), x)", "std::find(v.begin(), v.end(), x)", "v.end()", "v.begin() + v.size() / 2"]
compile:
  harness: |
    constexpr bool sorted_after(std::vector<int> v, int x) {
      insert_sorted(v, x);
      return std::is_sorted(v.begin(), v.end());
    }
    static_assert(sorted_after({1, 3, 5, 7}, 4));
    static_assert(sorted_after({1, 3, 5, 7}, 0));
    static_assert(sorted_after({1, 3, 5, 7}, 9));
    static_assert(sorted_after({1, 3, 5, 7, 9}, 8));
    int main() {}
refs:
  - https://en.cppreference.com/w/cpp/algorithm/lower_bound
  - https://en.cppreference.com/w/cpp/container/vector/insert
---

Keep a vector sorted while adding values to it. Complete the position.

```cpp
#include <algorithm>
#include <vector>

constexpr void insert_sorted(std::vector<int>& v, int x) {
  auto pos = {{c1::std\::lower_bound(v.begin(), v.end(), x)}};
  v.insert(pos, x);
}
```

---

**The lower bound is the insertion point**: everything before it is
smaller than `x`, so `x` fits there without breaking the order. Finding
it is O(log n); the `insert` that shifts the tail is still O(n).

`std::find` returns `end()` for a missing `x`, which appends it.
