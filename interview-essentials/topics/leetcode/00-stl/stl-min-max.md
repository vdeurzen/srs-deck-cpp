---
id: stl-min-max
kind: basic
version: 1
level: 1
tags: [stl, foundations, algorithms]
requires:
  - cpp-essentials/std-names-and-headers
refs:
  - https://en.cppreference.com/w/cpp/algorithm/min
  - https://en.cppreference.com/w/cpp/algorithm/max
elaborate: Say where you would write `best = std::max(best, x)` instead of an `if`, and what it saves the reader.
---

```cpp
#include <algorithm>
int lo = std::min(7, 3);
int hi = std::max(lo, 5);
```

## What are `lo` and `hi`?

---

**3 and 5: `std::min` and `std::max` return the smaller and larger of two values.**

Running bests are written with them: `best = std::max(best, x)` keeps
the largest value seen so far in one line, with no branch to read.
