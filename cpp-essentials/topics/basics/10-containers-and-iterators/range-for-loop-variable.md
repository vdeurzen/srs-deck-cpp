---
id: range-for-loop-variable
kind: basic
version: 1
level: 1
tags: [range-for, loops, foundations]
requires:
  - iter-range-for-intro
elaborate: Say how you would spot this bug in a code review, a loop that changes its variable but never the container.
refs:
  - https://en.cppreference.com/w/cpp/language/range-for
  - https://eel.is/c++draft/stmt.ranged
---

```cpp
std::vector<int> v{1, 2, 3};
for (int x : v)
    x *= 2;
```

## What does `v` hold after the loop?

---

**Still {1, 2, 3}: `x` is a copy of each element, not the element.**

`int x` declares a new variable on each pass, initialised from the element.
Doubling it changes only that copy, which is gone at the end of the pass.
To change the elements, the loop variable must refer to them.
