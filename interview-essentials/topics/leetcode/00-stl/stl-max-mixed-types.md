---
id: stl-max-mixed-types
kind: basic
version: 1
level: 2
tags: [stl, algorithms, integers]
requires:
  - stl-min-max
  - cpp-essentials/types-size-t
refs:
  - https://en.cppreference.com/w/cpp/algorithm/max
  - https://en.cppreference.com/w/cpp/language/template_argument_deduction
elaborate: Say aloud which fix you would write here, `std::max<std::size_t>(v.size(), 0)` or `std::max(int(v.size()), 0)`, and when each is right.
---

```cpp
#include <algorithm>
#include <vector>
std::vector<int> v{1, 2};
std::size_t m = std::max(v.size(), 0);
```

## Does the last line compile?

---

**No: both arguments of `std::max` must have one type, here `std::size_t` and `int`.**

Its declaration takes both parameters as one type, `const T&`; the
arguments ask for `T` to be both `std::size_t` and `int`, so the call
matches nothing. Write `std::max(v.size(), std::size_t{0})`, or name
`T` yourself: `std::max<std::size_t>(v.size(), 0)`.
