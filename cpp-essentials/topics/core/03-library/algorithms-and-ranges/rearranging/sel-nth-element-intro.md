---
id: sel-nth-element-intro
kind: basic
version: 1
level: 1
tags: [algorithms, rearranging]
requires:
  - stdalgo-sort-basics
  - alg-iter-index
elaborate: Say which position you would pass to get the largest of n values, and why.
refs:
  - https://en.cppreference.com/w/cpp/algorithm/nth_element
  - https://eel.is/c++draft/alg.nth.element
---

`std::nth_element(first, nth, last)` rearranges the range so that
position `nth` (here `v.begin() + 2`, the position of `v[2]`) holds the
value a full sort would put there.

```cpp
std::vector<int> v{9, 2, 7, 4, 5};
std::nth_element(v.begin(), v.begin() + 2, v.end());
int m = v[2];
```

## What is `m`?

---

**5: sorted, `v` would be `{2, 4, 5, 7, 9}`, and index 2 holds 5.**

Afterwards nothing before index 2 is greater than 5 and nothing after it
is less, but each side is in an unspecified order. Only that one position is fixed.
