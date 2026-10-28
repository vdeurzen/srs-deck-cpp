---
id: srch-upper-vs-lower
kind: basic
version: 1
level: 3
tags: [algorithms, searching]
requires:
  - srch-lower-bound-insert
elaborate: Say how two of these calls count the copies of x in a sorted vector, and what they give for an absent x.
refs:
  - https://en.cppreference.com/w/cpp/algorithm/upper_bound
  - https://eel.is/c++draft/upper.bound
---

```cpp
std::vector<int> v{1, 3, 3, 3, 5};
auto lo = std::lower_bound(v.begin(), v.end(), 3);  // index 1
auto hi = std::upper_bound(v.begin(), v.end(), 3);
```

## What is `hi - v.begin()`?

---

**4: `upper_bound` returns the first element greater than 3.**

`lower_bound` stops at the first element *not less* than 3, `upper_bound`
at the first *greater*. So `[lo, hi)` is exactly the run of 3s, and
`hi - lo` is 3, their count.
