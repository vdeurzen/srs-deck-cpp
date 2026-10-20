---
id: iter-range-for-intro
kind: basic
version: 1
level: 1
tags: [iterators, range-for, loops, foundations]
requires:
  - vector-basics
elaborate: Say how this loop compares with Go's `for _, x := range v`, and which of the two gives you the index.
refs:
  - https://en.cppreference.com/w/cpp/language/range-for
  - https://eel.is/c++draft/stmt.ranged
---

```cpp
std::vector<int> v{3, 1, 4};
int n = 0;
for (int x : v)
    n = n * 10 + x;
```

## `for (int x : v)` is C++'s range-`for`. What is `n` after the loop?

---

**314: the body runs once per element of `v`, front to back.**

On each pass `x` holds the next element in turn: 3, then 1, then 4. It is
Go's `for _, x := range v`, without the index.
