---
id: srch-unsorted-input
kind: basic
version: 1
level: 3
tags: [algorithms, searching, misconception]
requires:
  - srch-lower-bound-insert
elaborate: Where in your code does a vector reach a sorted search, and what guarantees it is still sorted there?
refs:
  - https://eel.is/c++draft/lower.bound
  - https://eel.is/c++draft/res.on.required
  - https://en.cppreference.com/w/cpp/algorithm/lower_bound
---

Many expect a sorted search on unsorted input to give a wrong but
harmless position.

```cpp
std::vector<int> v{5, 1, 4};
auto it = std::lower_bound(v.begin(), v.end(), 4);
```

## What does the standard say `it` is: index 2 (the 4), `v.end()`, index 0, or something else?

---

**Nothing: `v` isn't partitioned by `e < 4`, so the call is undefined behaviour.**

A broken precondition is not "not found": the standard requires nothing
of the whole run. libstdc++ happens to return index 2 here, which proves
nothing. A range sorted by another order, such as descending, breaks it
too.
