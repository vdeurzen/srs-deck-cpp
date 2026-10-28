---
id: qry-empty-range
kind: basic
version: 1
level: 3
tags: [algorithms, extremes, misconception]
requires:
  - qry-max-element-intro
elaborate: Say where in your own code a vector could reach a `max_element` call empty, and which check you would add.
refs:
  - https://en.cppreference.com/w/cpp/algorithm/max_element
  - https://eel.is/c++draft/alg.min.max
---

Many expect `std::max_element` on an empty vector to give 0, or the
smallest `int`.

```cpp
std::vector<int> v;
int m = *std::max_element(v.begin(), v.end());
```

## What does the standard say `m` is: 0, the smallest `int`, an exception, or something else?

---

**Nothing: the call returns `v.end()`, and dereferencing it is undefined behaviour.**

```cpp
int m = 0;                        // the empty answer
auto it = std::max_element(v.begin(), v.end());
if (it != v.end()) m = *it;
```

Other languages' `max` helpers often return a default or throw. Here the
iterator result has a "no element" value, `end()`, and checking it is the
caller's job.
