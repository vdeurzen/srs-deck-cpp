---
id: stdalgo-sort-basics
kind: basic
version: 1
level: 1
tags: [algorithms, sorting, lambdas, foundations]
elaborate: How would you sort the same vector into descending order, and why does that need no new algorithm?
requires:
  - lambda-syntax-intro
  - iter-end-one-past
refs:
  - https://en.cppreference.com/w/cpp/algorithm/sort
---

```cpp
std::vector<int> v{21, 13, 32};
std::sort(v.begin(), v.end(),
          [](int a, int b) { return a % 10 < b % 10; });
```

## What is `v` after the call?

---

**{21, 32, 13}: `sort` puts a before b whenever the comparator returns true.**

This lambda compares last digits (1, 3, 2), so `v` ends up ordered by
them. `std::sort(first, last)` sorts the range `[first, last)`; given no
comparator it uses `<`, ascending.
