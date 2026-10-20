---
id: sort-std-swap
kind: basic
version: 1
level: 1
tags: [foundations, sorting, swap]
requires:
  - cpp-essentials/std-names-and-headers
elaborate: Say where a sort or a heap you know performs this step, and how often.
refs:
  - https://en.cppreference.com/w/cpp/algorithm/swap
---

```cpp
#include <utility>

int a[] = {7, 1, 9};
std::swap(a[0], a[2]);
```

## What does `a` hold after the call?

---

**`9 1 7`: `std::swap(x, y)` exchanges the values of its two arguments.**

Both parameters are references, so it changes the caller's
objects, not copies. Sorting and heap code call it whenever two
elements trade places; inside it is a save, overwrite, restore with one
temporary.
