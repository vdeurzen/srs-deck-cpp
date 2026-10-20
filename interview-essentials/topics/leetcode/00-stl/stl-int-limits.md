---
id: stl-int-limits
kind: basic
version: 1
level: 1
tags: [stl, foundations, integers]
requires:
  - cpp-essentials/types-signed-unsigned-range
refs:
  - https://en.cppreference.com/w/cpp/types/climits
  - https://en.cppreference.com/w/cpp/types/numeric_limits
elaborate: Say why the smallest and largest 32-bit `int` are not each other's negation, and where that could bite you.
---

```cpp
#include <climits>
int hi = INT_MAX;
int lo = INT_MIN;
```

## With a 32-bit `int`, what values do `hi` and `lo` hold?

---

**2147483647 (2³¹ − 1) and −2147483648 (−2³¹): the largest and smallest `int`.**
`INT_MAX` and `INT_MIN` are macros from `<climits>`;
`std::numeric_limits<int>::max()` and `min()` from `<limits>` give the
same values. Values from running it under GCC 16.2.
