---
id: stdalgo-find-vs-find-if
kind: basic
version: 2
level: 1
tags: [algorithms]
requires:
  - lambda-syntax-intro
  - iter-end-one-past
elaborate: Name two other standard algorithms that come in a value form and an `_if` form.
refs:
  - https://en.cppreference.com/w/cpp/algorithm/find
---

```cpp
auto it = std::find(v.begin(), v.end(), 10);
```

## This yields an iterator to the first element of `std::vector<int> v` equal to 10. What must change to get the first element greater than 10?

---

**Call `std::find_if`, passing a predicate in place of `10`.**
`std::find(first, last, value)` can only compare each element with one
value, using `==`. `find_if` calls a predicate, a callable returning
`bool`, on each element:

```cpp
auto it = std::find_if(v.begin(), v.end(), [](int x) { return x > 10; });
```
