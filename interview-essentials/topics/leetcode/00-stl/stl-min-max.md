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
elaborate: Say where you would write `best = std::max(best, x)` instead of an `if`, and what the two argument types must agree on.
---

```cpp
#include <algorithm>
int lo = std::min(7, 3);
int hi = std::max(lo, 5);
```

## What are `lo` and `hi`?

---

**3 and 5: `std::min` and `std::max` return the smaller and larger of two values.**
Both arguments must have the same type: `std::min(1, 2.5)` does not
compile. Given a braced list, `std::min({4, 9, 2})` returns the smallest
of all of them, 2.
