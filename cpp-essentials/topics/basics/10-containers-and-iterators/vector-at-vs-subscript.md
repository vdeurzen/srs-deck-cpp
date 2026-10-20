---
id: vector-at-vs-subscript
kind: basic
version: 1
level: 1
tags: [containers, vector, foundations]
requires:
  - vector-basics
  - err-throw-catch-intro
  - ub-definition
elaborate: Say where in your own code an index comes from outside the program, such as input or a file, and whether you would read with `[]` or `at` there.
refs:
  - https://en.cppreference.com/w/cpp/container/vector/at
  - https://en.cppreference.com/w/cpp/container/vector/operator_at
---

```cpp
std::vector<int> v{4, 5, 6};
int a = v.at(1);
int b = v.at(3);
```

## `v.at(i)` reads element `i`, as `v[i]` does. What happens on the last line?

---

**It throws `std::out_of_range`: `at` checks that `i < size()` first.**

Valid indices here are 0 to 2. `v[3]` would check nothing: reading past
the end is undefined behaviour, which may return garbage or seem to
work. A Go slice index panics when out of range; C++'s `[]` stays silent.
