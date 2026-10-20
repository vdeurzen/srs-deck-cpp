---
id: stl-iota-argsort
kind: code
version: 1
level: 3
tags: [stl, sorting, ranges, lc-2418]
input: chips
choices:
  c1:
    - "h[i]"
    - "i"
    - "h[idx[i]]"
    - "-h[i]"
compile:
  harness: |
    static_assert(tallest_first({180, 165, 170}, {0, 1, 2}) == std::vector<int>{0, 2, 1});
    static_assert(tallest_first({155, 185, 150}, {0, 1, 2}) == std::vector<int>{1, 0, 2});
    static_assert(tallest_first({3, 9, 4, 1, 7}, {0, 1, 2, 3, 4}) == std::vector<int>{1, 4, 2, 0, 3});
    int main() {}
requires:
  - stl-argsort-meet
  - stl-greater-comparator
  - cpp-essentials/lambda-amp-capture-intro
  - cpp-essentials/constexpr-fn-static-assert
refs:
  - https://leetcode.com/problems/sort-the-people/
  - https://leetcode.com/problems/how-many-numbers-are-smaller-than-the-current-number/
  - https://en.cppreference.com/w/cpp/algorithm/iota
  - https://en.cppreference.com/w/cpp/algorithm/ranges/sort
elaborate: How Many Numbers Are Smaller Than the Current Number (LC 1365) returns, for each original position `i`, how many values in `nums` are smaller than `nums[i]`. Why does sorting the values alone lose what you need?
---

Sort the People (LC 2418): given `names` and their distinct `heights`,
list the names tallest first. `idx` arrives holding 0, 1, …, n − 1 and
will hold the order in which to read `names`.
The third argument of `std::ranges::sort`, the projection, maps each
element to the key that is compared. Complete what the projection returns.

```cpp
#include <algorithm>
#include <vector>
constexpr std::vector<int> tallest_first(std::vector<int> h, std::vector<int> idx) {
  std::ranges::sort(idx, std::greater{}, [&](int i) { return {{c1::h[i]}}; });
  return idx;
}
```

---

**Map each position to its key, `h[i]`: this is an argsort.** `idx`
starts as 0..n−1 (`std::iota` fills it so); sorting it by `h[i]` leaves the heights alone,
and the caller reads `names[idx[k]]`. Returning `i` sorts the positions
themselves. The sort already passes each *element* of `idx` as `i`, so
`h[idx[i]]` indexes twice: it looks up a position of a position. `-h[i]`
compiles but, with `std::greater{}`, puts the shortest first.
