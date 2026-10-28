---
id: uniq-unsorted-misconception
kind: basic
version: 1
level: 3
tags: [algorithms, rearranging, misconception]
requires:
  - uniq-worked
  - stdalgo-sort-basics
elaborate: Where in your own code could a vector reach this line unsorted, and what would you change?
refs:
  - https://en.cppreference.com/w/cpp/algorithm/unique
  - https://eel.is/c++draft/alg.unique
---

Many expect `std::unique` to remove every duplicate value in the range.

```cpp
std::vector<int> v{3, 1, 3};
v.erase(std::unique(v.begin(), v.end()), v.end());
```

## What does `v` hold now: `{3, 1}`, `{1, 3}` or `{3, 1, 3}`?

---

**`{3, 1, 3}`, unchanged: no two equal values are adjacent.**

```cpp
std::vector<int> v{3, 1, 3};
std::sort(v.begin(), v.end());                      // 1 3 3
v.erase(std::unique(v.begin(), v.end()), v.end());  // 1 3
```

The name says "unique", and on sorted test data the line does remove
every duplicate. Sorting first makes equal values neighbours.
