---
id: sel-top-three-ordered
kind: basic
version: 1
level: 3
tags: [algorithms, rearranging]
requires:
  - sel-nth-element-intro
elaborate: Say when sorting the whole vector would be the simpler choice you'd accept.
refs:
  - https://en.cppreference.com/w/cpp/algorithm/partial_sort
  - https://en.cppreference.com/w/cpp/algorithm/nth_element
---

`std::partial_sort(first, middle, last)` sorts `[first, middle)` with the
smallest elements (smallest by the comparator, if one is passed).

```cpp
auto desc = [](int a, int b) { return a > b; };
std::nth_element(s.begin(), s.begin() + 2, s.end(), desc);
```

This puts the 3 best scores of `s` in `s[0]` to `s[2]`. A leaderboard
must show them best first.

## Which call fits the leaderboard, `nth_element` or `partial_sort`?

---

**`std::partial_sort(s.begin(), s.begin() + 3, s.end(), desc)`: `nth_element` fixes only `s[2]`.**

The two before it are in an unspecified order; `partial_sort` orders all
3 in one call. `nth_element` then `std::sort(s.begin(), s.begin() + 3,
desc)` works too, but needs two calls.
