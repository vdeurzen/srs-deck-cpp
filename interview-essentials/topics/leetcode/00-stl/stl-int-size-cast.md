---
id: stl-int-size-cast
kind: basic
version: 1
level: 2
tags: [stl, integers, casts]
requires:
  - stl-size-t-unsigned
  - cpp-essentials/cast-functional-notation
refs:
  - https://en.cppreference.com/w/cpp/language/explicit_cast
  - https://en.cppreference.com/w/cpp/types/size_t
elaborate: Say aloud where in a loop of your own you would write `int(v.size())`, and what the loop would do on an empty `v` without it.
---

```cpp
std::vector<int> v;                                  // empty
int runs = 0;
for (int i = 0; i < int(v.size()) - 1; ++i) ++runs;
```

## How many times does the loop body run?

---

**Zero: `int(v.size())` converts before the subtraction, so the bound is −1.**

Subtract first, as in `v.size() - 1`, and the arithmetic happens in
`std::size_t`: it wraps to 2⁶⁴ − 1, and the loop runs off the end of the
empty vector. Casting the size, not the result, keeps it signed. Values
from running it under GCC 16.2.
