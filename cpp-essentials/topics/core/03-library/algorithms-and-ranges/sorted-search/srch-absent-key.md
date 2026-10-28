---
id: srch-absent-key
kind: basic
version: 1
level: 2
tags: [algorithms, searching]
requires:
  - srch-lower-bound-insert
elaborate: Say which keys make `lower_bound` return `end()` on a sorted vector, and what your code must do before reading `*it`.
refs:
  - https://en.cppreference.com/w/cpp/algorithm/lower_bound
  - https://en.cppreference.com/w/cpp/container/vector/end
---

```cpp
std::vector<int> v{2, 5, 9};
auto it = std::lower_bound(v.begin(), v.end(), 10);
int found = *it;
```

## What does the third line read?

---

**Nothing defined: `it == v.end()`, so `*it` is undefined behaviour.**

No element is not less than 10, so the first such position is the end
of the range, where 10 would be inserted. `lower_bound` never reports
"absent": check `it != v.end()` before reading through `it`.
