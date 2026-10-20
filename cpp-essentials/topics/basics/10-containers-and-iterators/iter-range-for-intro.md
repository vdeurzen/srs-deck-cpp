---
id: iter-range-for-intro
kind: basic
version: 1
level: 1
tags: [iterators, range-for, loops, foundations]
requires:
  - vector-basics
elaborate: Say which loop shape you would write if you also needed each element's index, and why.
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

On each pass `x` holds the next element in turn: 3, then 1, then 4. The loop
gives no index; it runs from the first element to the last.
