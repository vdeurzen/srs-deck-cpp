---
id: uniq-trace
kind: trace
version: 1
level: 3
tags: [algorithms, rearranging, tracing, misconception]
elaborate: Say what a caller who drops the iterator `std::unique` returns is left holding.
probes:
  1: { k: "3" }
  2: { n: "5" }
requires:
  - uniq-unsorted-misconception
  - alg-iter-index
refs:
  - https://en.cppreference.com/w/cpp/algorithm/unique
  - https://eel.is/c++draft/alg.unique
---

`std::unique` runs once on `v`. Predict both probes.

```cpp
std::vector<int> v{1, 1, 2, 3, 3};
auto e = std::unique(v.begin(), v.end());
auto k = e - v.begin();             // @1
auto n = v.size();                  // @2
```

---

Run through compare with the last kept · skip an equal · copy a new value
into the next slot · return the new end: the kept values 1, 2, 3 fill
slots 0 to 2, so `e` is 3 elements in. `unique` sees only two iterators,
so **it cannot change the size**: `v` still holds 5 elements, and slots 3
and 4 hold unspecified values until something erases the tail. Verified
with GCC 16.2 (`g++ -std=c++23`).
